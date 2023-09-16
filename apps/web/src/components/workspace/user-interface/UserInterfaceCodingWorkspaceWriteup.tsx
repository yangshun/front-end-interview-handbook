import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { useQuestionTechnologyLists } from '~/data/QuestionFormats';

import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import QuestionCompanies from '~/components/questions/content/QuestionCompanies';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionNextQuestions from '~/components/questions/content/QuestionNextQuestions';
import QuestionSimilarQuestions from '~/components/questions/content/QuestionSimilarQuestions';
import QuestionMetadataSection from '~/components/questions/metadata/QuestionMetadataSection';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Select from '~/components/ui/Select';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';
import { useI18nRouter } from '~/next-i18nostic/src';

function restParamForDescription(
  frameworkDefault: QuestionFramework | null,
  framework: QuestionFramework,
) {
  return framework === (frameworkDefault ?? 'vanilla') ? '' : framework;
}

function restParamForSolution(
  frameworkDefault: QuestionFramework | null,
  framework: QuestionFramework,
) {
  return (
    framework === (frameworkDefault ?? 'vanilla')
      ? ['solution']
      : [framework, 'solution']
  ).join('/');
}

type Props = Readonly<{
  canViewPremiumContent: boolean;
  framework: QuestionFramework;
  metadata: QuestionMetadata;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  writeup: string | null;
}>;

export default function UserInterfaceCodingWorkspaceWriteup({
  canViewPremiumContent,
  framework,
  metadata,
  nextQuestions,
  similarQuestions,
  mode,
  writeup,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(metadata);
  const intl = useIntl();
  const router = useI18nRouter();
  const questionTechnologyLists = useQuestionTechnologyLists();

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-x-4 p-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Heading level="heading5">
              <span>
                {metadata.title} {mode === 'solution' && ' Solution'}
              </span>
            </Heading>
            <div>
              {questionProgress?.status === 'complete' && (
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Completed',
                    description:
                      'Label indicating that the question has been completed',
                    id: 'iIQL6V',
                  })}
                  size="sm"
                  variant="success"
                />
              )}
            </div>
          </div>
          <Select
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Framework',
              description:
                'Label for the selection dropdown used to select the framework to use for the question',
              id: 'eeWLAW',
            })}
            options={metadata.frameworks.map((frameworkItem) => ({
              label: questionTechnologyLists[frameworkItem.framework].name,
              value: frameworkItem.framework,
            }))}
            size="sm"
            value={framework}
            onChange={(value) => {
              const frameworkValue = value as QuestionFramework;
              const frameworkItem = metadata.frameworks.find(
                ({ framework: frameworkItemValue }) =>
                  frameworkItemValue === frameworkValue,
              );

              if (frameworkItem == null) {
                return;
              }
              router.push(
                `/questions/user-interface/${metadata.slug}/${
                  mode === 'practice'
                    ? restParamForDescription(
                        metadata.frameworkDefault,
                        frameworkValue,
                      )
                    : restParamForSolution(
                        metadata.frameworkDefault,
                        frameworkValue,
                      )
                }`,
              );
            }}
          />
        </div>
        <div
          className={clsx(
            'flex items-center gap-x-4 p-4',
            themeBackgroundEmphasized,
          )}>
          <QuestionMetadataSection metadata={metadata} />
        </div>
      </div>
      <div className="flex flex-col gap-y-8 p-4">
        <QuestionContentProse contents={writeup} />
        <QuestionCompanies
          canViewPremiumContent={canViewPremiumContent}
          companies={metadata.companies}
        />
        <QuestionNextQuestions questions={nextQuestions} />
        <QuestionSimilarQuestions questions={similarQuestions} />
      </div>
    </div>
  );
}
