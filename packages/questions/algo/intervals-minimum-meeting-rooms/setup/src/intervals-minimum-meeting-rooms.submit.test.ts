import minMeetingRooms from './intervals-minimum-meeting-rooms';
import submitTestCases from './submit.tests.json';

describe('minMeetingRoomsNeeded', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`intervals = ${JSON.stringify(example.input[0][1], null, 2)}`, () => {
      expect(minMeetingRooms(example.input[0][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
