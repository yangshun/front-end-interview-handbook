import fn from './intervals-meeting-calendar';
import runTestCases from './run.tests.json';

describe('isMeetingCalendarValid', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`${example.input[0][0]} = ${JSON.stringify(
      example.input[0][1],
      null,
      2,
    )}`, () => {
      expect(fn(example.input[0][1])).toStrictEqual(example.output);
    });
  });
});
