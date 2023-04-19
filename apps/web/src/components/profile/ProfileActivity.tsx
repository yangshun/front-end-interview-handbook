'use client';

import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import QuestionLanguages from '~/components/questions/common/QuestionLanguages';
import type { QuestionLanguage } from '~/components/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import { getQuestionMetadata } from '~/db/QuestionsProgressClient';

import ProfileActivityResetProgressButton from './ProfileActivityResetProgressButton';

import { RectangleStackIcon } from '@heroicons/react/24/outline';

function NoCompletedQuestions() {
  const intl = useIntl();

  return (
    <div className="py-12 text-center">
      <RectangleStackIcon className="mx-auto h-12 w-12 text-slate-400" />
      <Heading className="mt-2 text-sm font-medium text-slate-900">
        <FormattedMessage
          defaultMessage="No completed questions"
          description="Text shown when no questions are completed."
          id="H+BRfg"
        />
      </Heading>
      <Section>
        <p className="mt-1 text-sm text-slate-500">
          <FormattedMessage
            defaultMessage="Try out some Front End questions!"
            description="Subtext for call to action when no questions are completed."
            id="e+03Yz"
          />
        </p>
        <div className="mt-6">
          <Button
            href="/prepare/coding"
            label={intl.formatMessage({
              defaultMessage: 'View questions',
              description: 'Label for button to view questions',
              id: 'kx0gZt',
            })}
            variant="primary"
          />
        </div>
      </Section>
    </div>
  );
}

export default function ProfileActivity() {
  const {
    data: questionProgress,
    isLoading: isFetchingQuestionProgress,
    isError: isErrorQuestionProgress,
  } = trpc.questionProgress.getAll.useQuery();
  const {
    data: questionList,
    isLoading: isFetchingQuestionList,
    isError: isErrorQuestionList,
  } = trpc.questions.coding.useQuery();

  if (isFetchingQuestionProgress || isFetchingQuestionList) {
    return (
      <div className="py-10">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  if (isErrorQuestionProgress || isErrorQuestionList) {
    // TODO: Better error handling.
    return (
      <div>
        <FormattedMessage
          defaultMessage="An error occurred"
          description="Error message when there is error fetching question progress or list."
          id="3y3F8i"
        />
      </div>
    );
  }

  if (questionProgress == null || questionProgress.length === 0) {
    return <NoCompletedQuestions />;
  }

  const questionsProgressWithMetadata = questionProgress
    .map((progress) => ({
      createdAt: progress.createdAt,
      metadata: getQuestionMetadata(
        questionList,
        progress.format,
        progress.slug,
      ),
    }))
    .filter(({ metadata }) => !!metadata);

  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="flex flex-row justify-between border-b border-slate-200 pb-4 text-xl font-semibold">
        <FormattedMessage
          defaultMessage="Completed Questions"
          description="Heading for list of completed questions."
          id="CqG3Op"
        />
        <ProfileActivityResetProgressButton />
      </Heading>
      <Section>
        <ul
          className="relative z-0 divide-y divide-slate-200 border-slate-200"
          role="list">
          {questionsProgressWithMetadata.map(({ metadata, createdAt }) => (
            <li key={createdAt} className="relative py-5 sm:py-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex w-3/4 flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-3">
                  <Heading className="text-md w-1/2 font-medium">
                    <Anchor href={metadata?.href} variant="flat">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {metadata!.title}
                    </Anchor>
                  </Heading>
                  {metadata?.languages && (
                    <div className="w-1/2">
                      <QuestionLanguages
                        languages={
                          metadata?.languages as ReadonlyArray<QuestionLanguage>
                        }
                      />
                    </div>
                  )}
                </div>
                <Section>
                  <div>
                    <Text color="secondary" variant="body2">
                      {new Date(createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Section>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
