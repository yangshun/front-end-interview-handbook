import courseDependency from './course-dependency';
import submitTestCases from './submit.tests.json';

describe('canCompleteCourse', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`courses = ${example.input[0][1]} prerequisites = ${JSON.stringify(
      example.input[1][1],
      null,
      2,
    )}`, () => {
      expect(
        courseDependency(example.input[0][1], example.input[1][1]),
      ).toStrictEqual(example.output);
    });
  });
});
