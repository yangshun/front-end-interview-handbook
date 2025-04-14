import meetingCalendar from './intervals-meeting-calendar';
import submitTestCases from './submit.tests.json';

describe('isMeetingCalendarValid', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`intervals = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(meetingCalendar(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
