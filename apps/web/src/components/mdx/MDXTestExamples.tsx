import ScrollArea from '~/components/ui/ScrollArea';

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
      {testCases.map(({ explanation, input, output }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <pre key={index}>
          <ScrollArea
            className="-mb-2"
            scrollbars="horizontal"
            viewportClass="pb-2">
            <div>
              Input:{' '}
              {input
                .map(
                  ([variable, value]) =>
                    `${variable} = ${JSON.stringify(value)}`,
                )
                .join(', ')}
            </div>
            <div>Output: {JSON.stringify(output)}</div>
            <div>Explanation: {explanation}</div>
          </ScrollArea>
        </pre>
      ))}
    </div>
  );
}
