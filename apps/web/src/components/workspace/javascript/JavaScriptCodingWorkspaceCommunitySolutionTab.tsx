import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/Timestamp';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';
import QuestionLanguages from '~/components/questions/metadata/QuestionLanguages';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Prose from '~/components/ui/Prose';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

import JavaScriptCodingWorkspacePushCodeToEditorButton from './JavaScriptCodingWorkspacePushCodeToEditorButton';

type Props = Readonly<{
  solutionId: string;
}>;

export default function JavaScriptCodingWorkspaceCommunitySolutionTab({
  solutionId,
}: Props) {
  const { data: solution, isLoading } =
    trpc.questionCommunitySolution.javaScriptGet.useQuery({
      solutionId,
    });

  const Contents = useMemo(() => {
    if (!solution?.writeup) {
      return null;
    }

    return getMDXComponent(solution.writeup, {
      MDXCodeBlock,
    });
  }, [solution?.writeup]);

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Spinner label="Loading submission" size="md" />
        </div>
      )}
      {solution && (
        <div className="flex flex-col gap-y-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex items-center gap-x-4">
              <Heading level="heading5">{solution.title}</Heading>
              <QuestionLanguages
                languages={[staticLowerCase(solution.language)]}
              />
            </div>
          </div>
          <Text
            className="whitespace-nowrap"
            color="secondary"
            size="body2"
            weight="medium">
            Submitted at <Timestamp date={solution.createdAt} />
          </Text>
          <Prose textSize="sm">
            <Heading level="heading5">Solution code</Heading>
            <MDXCodeBlock
              renderExtraButtons={() => (
                <JavaScriptCodingWorkspacePushCodeToEditorButton
                  contents={solution.code}
                />
              )}>
              {solution.code}
            </MDXCodeBlock>
          </Prose>
          <Divider />
          {Contents && (
            <Prose textSize="sm">
              <Heading level="heading5">Write up</Heading>
              <Contents components={MDXComponents} />
            </Prose>
          )}
        </div>
      )}
    </div>
  );
}
