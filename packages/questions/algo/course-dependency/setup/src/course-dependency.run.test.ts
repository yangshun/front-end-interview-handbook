import fn from './course-dependency';
import runTestCases from './run.tests.json';

describe('courseDependency', () => {
  (runTestCases as any[]).forEach((example: any) => {
    test(`courses = ${example.input[0][1]} prerequisites = ${JSON.stringify(
      example.input[1][1],
      null,
      2,
    )}`, () => {
      expect(fn(example.input[0][1], example.input[1][1])).toStrictEqual(
        example.output,
      );
    });
  });
});
