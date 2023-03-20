export type JestTestResult = Readonly<{
  duration: number | undefined;
  errors: ReadonlyArray<string>;
  status: 'fail' | 'pass' | 'skip';
  testPath: ReadonlyArray<string>;
}>;

export type JestTestReport = Readonly<{
  results: ReadonlyArray<JestTestResult>;
  summary: Readonly<{
    failed: number;
    passed: number;
    skipped: number;
    total: number;
  }>;
}>;

export type CodingQuestionSubmissionResultStatus =
  | 'ACCEPTED'
  | 'ERROR'
  | 'WRONG_ANSWER';

export type CodingQuestionEvaluationResultAccepted = {
  report: JestTestReport;
  status: 'ACCEPTED';
};
export type CodingQuestionEvaluationResultWrongAnswer = {
  report: JestTestReport;
  status: 'WRONG_ANSWER';
};

type CodingQuestionEvaluationResultError = {
  message: string;
  status: 'ERROR';
};

export type CodingQuestionSubmissionResult =
  | CodingQuestionEvaluationResultAccepted
  | CodingQuestionEvaluationResultError
  | CodingQuestionEvaluationResultWrongAnswer;

export function evaluateReport(
  report: JestTestReport,
): CodingQuestionSubmissionResult {
  return {
    report,
    status:
      report.summary.total === report.summary.passed
        ? 'ACCEPTED'
        : 'WRONG_ANSWER',
  };
}
