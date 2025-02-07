'use client';

import clsx from 'clsx';
import { RiInboxLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

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

import ProfileActivityResetProgressButton from './ProfileActivityResetProgressButton';
import Timestamp from '../common/datetime/Timestamp';
import QuestionFormatLabel from '../interviews/questions/metadata/QuestionFormatLabel';

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
            href="/interviews/dashboard"
            label={intl.formatMessage({
              defaultMessage: 'Go to dashboard',
              description: 'Go to interviews platform dashboard',
              id: 'UAUsez',
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
    data: questionProgressWithMetadata,
    isLoading: isFetchingQuestionProgress,
    isError: isErrorQuestionProgress,
  } = trpc.questionProgress.getAllIncludingMetadata.useQuery();

  if (isFetchingQuestionProgress) {
    return (
      <div className="py-10">
        <Spinner display="block" />
      </div>
    );
  }

  if (isErrorQuestionProgress) {
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

  if (
    questionProgressWithMetadata == null ||
    questionProgressWithMetadata.length === 0
  ) {
    return <NoCompletedQuestions />;
  }

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
          {questionProgressWithMetadata.map(({ createdAt, id, metadata }) => {
            return (
              <li
                key={id}
                className={clsx(
                  'relative px-4 py-3',
                  themeBackgroundCardWhiteOnLightColor,
                  themeBackgroundEmphasized_Hover,
                  'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
                  'overflow-hidden',
                )}>
                <div className="flex items-center justify-between gap-x-4">
                  <div className="flex w-3/4 flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-3">
                    <Text className="w-1/2" size="body2" weight="medium">
                      <Anchor href={metadata?.href} variant="unstyled">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {metadata!.title}
                      </Anchor>
                    </Text>
                    {metadata?.format && (
                      <div className="w-1/2">
                        <QuestionFormatLabel
                          showIcon={true}
                          value={metadata.format}
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
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
