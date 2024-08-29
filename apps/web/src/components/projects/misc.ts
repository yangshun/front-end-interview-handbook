import { z } from 'zod';

export const motivationReasonValue = z.enum([
  'beginner',
  'skill',
  'mentor-others',
  'other',
  'portfolio',
  'side-projects',
]);

export const yoeReplacementSchema = z.enum([
  'bootcamp-grad',
  'bootcamper',
  'career-switcher',
  'fresh-grad',
  'intern',
  'masters-cs',
  'others',
  'self-learning',
  'undergrad-cs',
]);

export function getFormattedNumber(num: number) {
  if (num === 0) {
    return '–';
  }

  const lookup = [
    { symbol: '', value: 1 },
    { symbol: 'k', value: 1e3 },
    { symbol: 'M', value: 1e6 },
    { symbol: 'G', value: 1e9 },
    { symbol: 'T', value: 1e12 },
    { symbol: 'P', value: 1e15 },
    { symbol: 'E', value: 1e18 },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((lookupItem) => {
      return num >= lookupItem.value;
    });

  if (!item) {
    return '–';
  }

  const maxNumberOfDigits = 3;
  const decimalPart = Math.floor(num / item.value);
  const numDecimalDegits = decimalPart.toString().length;
  const digits = maxNumberOfDigits - numDecimalDegits;

  return (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol;
}

export const URL_REGEX = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/;
export const MAX_SKILLS_FOR_REP_GAINS_IN_SUBMISSION = 10;
