'use client';

import clsx from 'clsx';
import { uniqBy } from 'lodash-es';
import { RiInboxLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type { QuestionLanguage } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionLanguages from '~/components/interviews/questions/metadata/QuestionLanguages';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import { getQuestionMetadata } from '~/db/QuestionsProgressClient';
import { hashQuestion } from '~/db/QuestionsUtils';

import ProfileActivityResetProgressButton from './ProfileActivityResetProgressButton';
import Timestamp from '../common/datetime/Timestamp';

function NoCompletedQuestions() {
  const intl = useIntl();

  return (
    <div className="py-12 text-center">
      <RiInboxLine className="size-12 mx-auto text-neutral-400" />
      <Heading className="mt-2 text-sm font-medium" level="custom">
        <FormattedMessage
          defaultMessage="No completed questions"
          description="Text shown when no questions are completed."
          id="H+BRfg"
        />
      </Heading>
      <Section>
        <Text className="mt-1 block" color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Try out some Front End questions!"
            description="Subtext for call to action when no questions are completed."
            id="e+03Yz"
          />
        </Text>
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
        <Spinner display="block" />
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

  const questionsProgressWithMetadata = uniqBy(questionProgress, (progress) =>
    hashQuestion(progress.format, progress.slug),
  )
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
      <Heading
        className={clsx('flex flex-row justify-between', themeBorderColor)}
        level="heading6">
        <FormattedMessage
          defaultMessage="Completed Questions"
          description="Heading for list of completed questions."
          id="CqG3Op"
        />
        <ProfileActivityResetProgressButton />
      </Heading>
      <Section>
        <ul
          className={clsx(
            'relative rounded-md',
            ['border', themeBorderColor],
            ['divide-y', themeDivideColor],
          )}
          role="list">
          {questionsProgressWithMetadata.map(({ metadata, createdAt }) => (
            <li
              key={createdAt.toDateString()}
              className={clsx(
                'relative px-4 py-3',
                themeBackgroundCardWhiteOnLightColor,
                themeBackgroundEmphasized_Hover,
                'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
                'overflow-hidden',
              )}>
              <div className="flex items-center justify-between gap-x-4">
                <div className="flex w-3/4 flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-3">
                  <Text className="text-md w-1/2" size="body2" weight="medium">
                    <Anchor href={metadata?.href} variant="blend">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {metadata!.title}
                    </Anchor>
                  </Text>
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
                  <Text className="block" color="secondary" size="body3">
                    <Timestamp date={createdAt} />
                  </Text>
                </Section>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
