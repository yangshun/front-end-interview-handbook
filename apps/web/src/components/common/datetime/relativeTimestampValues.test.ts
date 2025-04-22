import { describe, expect, test } from 'vitest';

import { getTimeUnitAndValue } from './relativeTimestampValues';

describe('getTimeUnitAndValue', () => {
  describe('seconds', () => {
    test('less than 10 seconds', () => {
      const now = new Date();

      now.setSeconds(now.getSeconds() - 5);
      expect(getTimeUnitAndValue(now)).toEqual({
        unit: 'just now',
        value: null,
      });
    });

    test('within the first minute', () => {
      const now = new Date();

      now.setSeconds(now.getSeconds() - 15);
      expect(getTimeUnitAndValue(now)).toEqual({ unit: 'second', value: 15 });
    });
  });

  describe('minutes', () => {
    test('within the first hour', () => {
      const now = new Date();

      now.setMinutes(now.getMinutes() - 15);
      expect(getTimeUnitAndValue(now)).toEqual({ unit: 'minute', value: 15 });
    });
  });

  describe('hours', () => {
    test('within the first day', () => {
      const now = new Date();

      now.setHours(now.getHours() - 15);
      expect(getTimeUnitAndValue(now)).toEqual({ unit: 'hour', value: 15 });
    });
  });

  describe('days', () => {
    test('one day', () => {
      const now = new Date();

      now.setDate(now.getDate() - 1);
      expect(getTimeUnitAndValue(now)).toEqual({
        unit: 'days',
        value: 1,
      });
    });

    test('within the first week', () => {
      const now = new Date();

      now.setDate(now.getDate() - 5);
      expect(getTimeUnitAndValue(now)).toEqual({ unit: 'days', value: 5 });
    });
  });

  describe('more than a week', () => {
    test('8 days ago', () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      now.setDate(now.getDate() - 8);
      if (now.getFullYear() !== currentYear) {
        expect(getTimeUnitAndValue(now)).toEqual({ unit: 'year', value: null });
      } else {
        expect(getTimeUnitAndValue(now)).toEqual({
          unit: 'month',
          value: null,
        });
      }
    });

    test('1 full year ago', () => {
      const now = new Date();

      now.setDate(now.getDate() - 365);
      expect(getTimeUnitAndValue(now)).toEqual({ unit: 'year', value: null });
    });
  });
});
