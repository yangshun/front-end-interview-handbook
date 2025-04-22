import { describe, expect, it } from 'vitest';

import {
  isHugeAmountCurrency,
  isSupportedCurrency,
  isZeroDecimalCurrency,
  normalizeCurrencyValue,
  shouldUseCountryCurrency,
  withinStripeAmountLimit,
} from './stripeUtils';

describe('isZeroDecimalCurrency', () => {
  it('zero decimal currency', () => {
    expect(isZeroDecimalCurrency('bif')).toBe(true);
  });

  it('non-zero decimal currency', () => {
    expect(isZeroDecimalCurrency('usd')).toBe(false);
  });
});

describe('normalizeCurrencyValue', () => {
  it('value multiplied by 100 for non-zero decimal currency', () => {
    expect(normalizeCurrencyValue(5, 'usd')).toBe(500);
  });

  it('same value for zero decimal currency', () => {
    expect(normalizeCurrencyValue(5, 'bif')).toBe(5);
  });
});

describe('isHugeAmountCurrency', () => {
  it('huge amount currency', () => {
    expect(isHugeAmountCurrency('bif')).toBe(true);
    expect(isHugeAmountCurrency('ugx')).toBe(true);
    expect(isHugeAmountCurrency('uzs')).toBe(true);
  });

  it('non-huge amount currency', () => {
    expect(isHugeAmountCurrency('usd')).toBe(false);
    expect(isHugeAmountCurrency('sgd')).toBe(false);
    expect(isHugeAmountCurrency('gbp')).toBe(false);
  });
});

describe('withinStripeAmountLimit', () => {
  it('non-zero decimal huge amount currency', () => {
    expect(withinStripeAmountLimit('uzs')).toBe(false);
    expect(withinStripeAmountLimit('ugx')).toBe(false);
  });

  it('zero decimal huge amount currency', () => {
    expect(withinStripeAmountLimit('bif')).toBe(true);
    expect(withinStripeAmountLimit('krw')).toBe(true);
    expect(withinStripeAmountLimit('vnd')).toBe(true);
  });

  it('non-huge amount currency', () => {
    expect(withinStripeAmountLimit('cad')).toBe(true);
    expect(withinStripeAmountLimit('usd')).toBe(true);
    expect(withinStripeAmountLimit('sgd')).toBe(true);
    expect(withinStripeAmountLimit('jpy')).toBe(true);
    expect(withinStripeAmountLimit('gbp')).toBe(true);
  });
});

describe('shouldUseCountryCurrency', () => {
  describe('supported currency', () => {
    it('within Stripe amount limit', () => {
      expect(shouldUseCountryCurrency('cad')).toBe(true);
      expect(shouldUseCountryCurrency('usd')).toBe(true);
      expect(shouldUseCountryCurrency('sgd')).toBe(true);
      expect(shouldUseCountryCurrency('jpy')).toBe(true);
      expect(shouldUseCountryCurrency('gbp')).toBe(true);
      expect(shouldUseCountryCurrency('inr')).toBe(true);
    });

    describe('huge amount currency', () => {
      it('zero decimal', () => {
        expect(shouldUseCountryCurrency('bif')).toBe(true);
        expect(shouldUseCountryCurrency('krw')).toBe(true);
        expect(shouldUseCountryCurrency('mga')).toBe(true);
        expect(shouldUseCountryCurrency('vnd')).toBe(true);
      });

      it('not-zero decimal', () => {
        expect(shouldUseCountryCurrency('lak')).toBe(false);
        expect(shouldUseCountryCurrency('std')).toBe(false);
        expect(shouldUseCountryCurrency('uzs')).toBe(false);
      });
    });
  });

  describe('unsupported currency', () => {
    it('should return false', () => {
      expect(shouldUseCountryCurrency('tnd')).toBe(false);
      expect(shouldUseCountryCurrency('xyz')).toBe(false);
    });
  });
});

describe('isSupportedCurrency', () => {
  it('supported currency', () => {
    expect(isSupportedCurrency('usd')).toBe(true);
  });

  it('unsupported currency', () => {
    expect(isSupportedCurrency('xyz')).toBe(false);
  });
});
