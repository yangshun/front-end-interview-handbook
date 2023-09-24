import { RiArrowRightLine } from 'react-icons/ri';
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
import {
  questionUserInterfaceDescriptionPath,
  questionUserInterfaceSolutionPath,
} from '~/components/questions/content/user-interface/QuestionUserInterfaceRoutes';
import QuestionMetadataSection from '~/components/questions/metadata/QuestionMetadataSection';
import Alert from '~/components/ui/Alert';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';
import { useI18nRouter } from '~/next-i18nostic/src';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  contentType: 'description' | 'solution';
  framework: QuestionFramework;
  metadata: QuestionMetadata;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  writeup: string | null;
}>;

export default function UserInterfaceCodingWorkspaceWriteup({
  canViewPremiumContent,
  contentType,
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
    <div className="w-full">
      <div className="mx-auto flex max-w-3xl flex-col gap-y-6 p-4">
        {contentType === 'description' && mode === 'solution' && (
          <Alert variant="info">
            <div className="flex flex-col items-start gap-2">
              <Text display="block" size="body2">
                You are viewing the description from the solution page. To
                practice this question, go back to the question's main page.
              </Text>
              <Button
                href={questionUserInterfaceDescriptionPath(metadata, framework)}
                icon={RiArrowRightLine}
                label="Practice this question"
                size="sm"
                variant="secondary"
              />
            </div>
          </Alert>
        )}
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Heading level="heading5">
              <span>
                {metadata.title} {contentType === 'solution' && ' Solution'}
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
                contentType === 'description'
                  ? questionUserInterfaceDescriptionPath(
                      metadata,
                      frameworkValue,
                    )
                  : questionUserInterfaceSolutionPath(metadata, frameworkValue),
              );
            }}
          />
        </div>
        <QuestionMetadataSection metadata={metadata} />
        <div className="flex flex-col gap-y-8">
          <QuestionContentProse contents={writeup} />
          <QuestionCompanies
            canViewPremiumContent={canViewPremiumContent}
            companies={metadata.companies}
          />
          <QuestionNextQuestions questions={nextQuestions} />
          <QuestionSimilarQuestions questions={similarQuestions} />
        </div>
      </div>
    </div>
  );
}
