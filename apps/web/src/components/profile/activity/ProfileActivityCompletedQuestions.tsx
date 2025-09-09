'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiInboxLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import Timestamp from '~/components/common/datetime/Timestamp';
import type { QuestionHash } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionFormatFilter from '~/components/interviews/questions/listings/filters/hooks/useQuestionFormatFilter';
import QuestionFormatLabel from '~/components/interviews/questions/metadata/QuestionFormatLabel';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import EmptyState from '~/components/ui/EmptyState';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
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
import { themeBackgroundCardColor } from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import ProfileActivityDeleteAllProgressButton from './ProfileActivityDeleteAllProgressButton';
import ProfileActivitySelectivelyDeleteProgressButton from './ProfileActivitySelectivelyDeleteProgressButton';

function NoCompletedQuestions() {
  const intl = useIntl();

  return (
    <div className="py-12 text-center">
      <RiInboxLine className="mx-auto size-12 text-neutral-400" />
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

export default function ProfileActivityCompletedQuestions() {
  const intl = useIntl();

  const {
    data: questionProgressWithMetadata,
    isError: isErrorQuestionProgress,
    isLoading: isFetchingQuestionProgress,
  } = trpc.questionProgress.getAllIncludingMetadata.useQuery();

  const [formatFilters, formatFilterOptions] = useQuestionFormatFilter({
    initialValue: [],
  });

  const [selectedQuestions, setSelectedQuestions] = useState<Set<QuestionHash>>(
    new Set(),
  );

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

  const filteredQuestionProgressWithMetadata =
    questionProgressWithMetadata.filter((qn) =>
      formatFilters.size === 0
        ? true
        : qn.metadata
          ? formatFilters.has(qn.metadata.format)
          : false,
    );

  function handleIndividualCheckboxChange(id: string, isChecked: boolean) {
    setSelectedQuestions((prev) => {
      const newSet = new Set(prev);

      isChecked ? newSet.add(id) : newSet.delete(id);

      return newSet;
    });
  }

  function clearSelectedQuestions() {
    setSelectedQuestions(new Set());
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className={clsx('flex flex-row flex-wrap gap-2', themeBorderColor)}>
        {formatFilterOptions.options.map(
          ({ icon: Icon, label, tooltip, value }) => (
            <FilterButton
              key={value}
              icon={Icon}
              label={label}
              selected={formatFilters.has(value)}
              size="xs"
              tooltip={tooltip}
              onClick={() => {
                formatFilterOptions.onChange(value);
                clearSelectedQuestions();
              }}>
              {label}
            </FilterButton>
          ),
        )}
      </div>
      <div
        className={clsx(
          'flex items-end justify-between gap-4',
          'relative pt-1',
        )}>
        <div className="pl-4">
          <CheckboxInput
            label={intl.formatMessage({
              defaultMessage: 'Select all',
              description:
                'Label for checkbox to select all visible questions on profile activity page',
              id: 'gG1M3s',
            })}
            value={
              selectedQuestions.size > 0 &&
              selectedQuestions.size ===
                filteredQuestionProgressWithMetadata.length
            }
            onChange={(isChecked) => {
              if (isChecked) {
                setSelectedQuestions(
                  new Set(
                    filteredQuestionProgressWithMetadata.map(({ metadata }) =>
                      metadata ? hashQuestion(metadata) : '',
                    ),
                  ),
                );
              } else {
                setSelectedQuestions(new Set());
              }
            }}
          />
        </div>
        <div className="flex items-center gap-x-2">
          {selectedQuestions.size > 0 && (
            <ProfileActivitySelectivelyDeleteProgressButton
              clearSelectedQuestions={clearSelectedQuestions}
              qnHashes={Array.from(selectedQuestions)}
            />
          )}
          <ProfileActivityDeleteAllProgressButton />
        </div>
      </div>
      <Section>
        {filteredQuestionProgressWithMetadata.length > 0 ? (
          <ul
            className={clsx(
              'rounded-md',
              ['border', themeBorderColor],
              ['divide-y', themeDivideColor],
            )}
            role="list">
            {filteredQuestionProgressWithMetadata.map(
              ({ createdAt, id, metadata }) => {
                const qnHash = metadata ? hashQuestion(metadata) : '';

                return (
                  <li
                    key={id}
                    className={clsx(
                      'relative px-4 py-3',
                      themeBackgroundCardWhiteOnLightColor,
                      themeBackgroundEmphasized_Hover,
                      'overflow-hidden',
                    )}>
                    <div className="flex items-center gap-x-3">
                      <CheckboxInput
                        aria-label={intl.formatMessage(
                          {
                            defaultMessage: `Select {question} for deletion`,
                            description:
                              'Aria label for checkbox to select question for deletion',
                            id: 'FjrpK8',
                          },
                          { question: metadata?.title },
                        )}
                        isLabelHidden={true}
                        value={selectedQuestions.has(qnHash)}
                        onChange={(isChecked) =>
                          handleIndividualCheckboxChange(qnHash, isChecked)
                        }
                      />
                      <div className="flex grow flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-3">
                        <Text
                          className="line-clamp-2 w-3/4"
                          size="body2"
                          weight="medium">
                          <Anchor href={metadata?.href} variant="flat">
                            {metadata.title}
                          </Anchor>
                        </Text>
                        {metadata?.format && (
                          <div className="flex w-1/4">
                            <QuestionFormatLabel
                              showIcon={true}
                              value={metadata.format}
                            />
                          </div>
                        )}
                      </div>
                      <Text
                        className="block whitespace-nowrap"
                        color="secondary"
                        size="body3">
                        <Timestamp date={createdAt} />
                      </Text>
                    </div>
                  </li>
                );
              },
            )}
          </ul>
        ) : (
          <div
            className={clsx(
              'w-full p-10',
              'rounded-lg',
              themeBackgroundCardColor,
              ['border', themeBorderColor],
            )}>
            <EmptyState
              subtitle={intl.formatMessage({
                defaultMessage: 'Try changing your search filters',
                description:
                  'Subtitle for empty state when no questions are returned from application of filters on profile activity page',
                id: 'LGiJGy',
              })}
              title={intl.formatMessage({
                defaultMessage: 'No questions match the current filters',
                description:
                  'Title for empty state when application of filters return no results on profile activity page',
                id: 'r051EE',
              })}
              variant="empty"
            />
          </div>
        )}
      </Section>
    </div>
  );
}
