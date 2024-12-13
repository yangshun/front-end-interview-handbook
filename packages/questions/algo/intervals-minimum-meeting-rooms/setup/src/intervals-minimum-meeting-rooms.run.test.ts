import fn from './intervals-minimum-meeting-rooms';
import runTestCases from './run.tests.json';

describe('minMeetingRoomsNeeded', () => {
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
