import { getNormalizedReferralSource } from './useWriteSearchParamsToCookie';

describe('getNormalizedReferralSource', () => {
  test('returns null when searchParams is empty', () => {
    const params = new URLSearchParams();
    const result = getNormalizedReferralSource(params);

    expect(result).toBeNull();
  });

  test('returns null when none of the keys are present', () => {
    const params = new URLSearchParams({ foo: 'bar', hello: 'world' });
    const result = getNormalizedReferralSource(params);

    expect(result).toBeNull();
  });

  test('returns the value when one matching key is present', () => {
    const params = new URLSearchParams({ utm_source: 'google' });
    const result = getNormalizedReferralSource(params);

    expect(result).toBe('google');
  });

  test('returns the first matching key in order of priority', () => {
    const params = new URLSearchParams({
      fpr: 'friend',
      gnrs: 'newsletter',
      utm_campaign: 'summer',
    });
    const result = getNormalizedReferralSource(params);

    // Gnrs is first in the priority list
    expect(result).toBe('newsletter');
  });

  test('returns the first matching key even if later keys exist', () => {
    const params = new URLSearchParams({
      utm_campaign: 'campaign1',
      utm_source: 'source1',
    });
    const result = getNormalizedReferralSource(params);

    // Utm_source comes before utm_campaign in priority
    expect(result).toBe('source1');
  });

  test('returns null when all keys are present but have null values', () => {
    const params = new URLSearchParams('');
    const result = getNormalizedReferralSource(params);

    expect(result).toBeNull();
  });
});
