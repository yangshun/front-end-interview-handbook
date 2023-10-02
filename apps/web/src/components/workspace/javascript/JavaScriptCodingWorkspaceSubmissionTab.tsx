import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionLanguages from '~/components/questions/metadata/QuestionLanguages';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  metadata: QuestionMetadata;
  submissionId: string;
}>;

type Submission = Readonly<{
  code: string;
  createdAt: number;
  id: string;
  language: 'js' | 'ts';
  result: 'correct' | 'wrong';
}>;

const submission: Submission = {
  code: `type ArrayValue = any | Array<ArrayValue>;

export default function flatten(value: Array<ArrayValue>): Array<any> {
  // return []
  const res = [];
  const copy = value.slice();

  while (copy.length) {
    const item = copy.shift();
    if (Array.isArray(item)) {
      copy.unshift(...item);
    } else {
      res.push(item);
    }
  }

  return res;
}`,
  createdAt: Date.now(),
  id: '1',
  language: 'ts',
  result: 'correct',
};

const dateFormatter = new Intl.DateTimeFormat('en-SG', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function JavaScriptCodingWorkspaceSubmissionTab({
  metadata,
  submissionId,
}: Props) {
  const { createdAt, result, language, code } = submission;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-x-4">
            <Heading level="heading5">{metadata.title}</Heading>
            <QuestionLanguages languages={[language]} />
          </div>
          {result === 'correct' && <Badge label="Correct" variant="success" />}
          {result === 'wrong' && <Badge label="Wrong" variant="danger" />}
        </div>
        <div className="flex items-center gap-x-4">
          <Text
            className="whitespace-nowrap"
            color="secondary"
            size="body2"
            weight="medium">
            Submitted at {dateFormatter.format(new Date(createdAt))}
          </Text>
          <div></div>
        </div>
        <Prose>
          <MDXCodeBlock>{code}</MDXCodeBlock>
        </Prose>
      </div>
    </div>
  );
}
