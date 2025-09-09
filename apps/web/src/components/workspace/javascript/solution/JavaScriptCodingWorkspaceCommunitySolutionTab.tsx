'use client';

import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/datetime/Timestamp';
import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import { useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import MDXComponents from '~/components/mdx/MDXComponents';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Prose from '~/components/ui/Prose';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import JavaScriptCodingWorkspacePushCodeToEditorButton from '~/components/workspace/javascript/JavaScriptCodingWorkspacePushCodeToEditorButton';

import { staticLowerCase } from '~/utils/typescript/stringTransform';

type Props = Readonly<{
  solutionId: string;
}>;

export default function JavaScriptCodingWorkspaceCommunitySolutionTab({
  solutionId,
}: Props) {
  const intl = useIntl();
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
          <Spinner
            label={intl.formatMessage({
              defaultMessage: 'Loading submission',
              description: 'Workspace community submission loading',
              id: 'wS3TuG',
            })}
            size="md"
          />
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
            {intl.formatMessage({
              defaultMessage: 'Submitted at',
              description: 'Workspace community submission submitted at label',
              id: 'DlxhUm',
            })}
            <Timestamp date={solution.createdAt} />
          </Text>
          <Prose textSize="sm">
            <Heading level="heading5">
              {intl.formatMessage({
                defaultMessage: 'Solution code',
                description: 'Workspace community solution code label',
                id: 'qpyquW',
              })}
            </Heading>
            <MDXCodeBlock
              renderExtraButtons={() => (
                <JavaScriptCodingWorkspacePushCodeToEditorButton
                  contents={solution.code}
                  metadata={{
                    id: solution.id,
                    name: 'Attempt',
                  }}
                  type="attempt"
                />
              )}>
              {solution.code}
            </MDXCodeBlock>
          </Prose>
          <Divider />
          {Contents && (
            <Prose textSize="sm">
              <Heading level="heading5">
                {intl.formatMessage({
                  defaultMessage: 'Write up',
                  description: 'Workspace community solution write up label',
                  id: '9bKvzQ',
                })}
              </Heading>
              <Contents components={MDXComponents} />
            </Prose>
          )}
        </div>
      )}
    </div>
  );
}
