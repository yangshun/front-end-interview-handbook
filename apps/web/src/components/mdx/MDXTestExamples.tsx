type Props = Readonly<{
  testCases: ReadonlyArray<{
    explanation: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: [string, any];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    output: any;
  }>;
}>;

export default function MDXTestExamples({ testCases }: Props) {
  return (
    <div>
      <h2>Examples</h2>
      {testCases.map(({ input, output, explanation }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <pre key={index}>
          <div>
            Input:{' '}
            {input
              .map(
                ([variable, value]) => `${variable} = ${JSON.stringify(value)}`,
              )
              .join(', ')}
          </div>
          <div>Output: {JSON.stringify(output)}</div>
          <div>Explanation: {explanation}</div>
        </pre>
      ))}
    </div>
  );
}
