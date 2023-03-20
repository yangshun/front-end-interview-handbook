'use client';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import { useQueryQuestionListCoding } from '~/db/QuestionsListQuery';
import {
  getQuestionMetadata,
  useQueryQuestionProgressAll,
} from '~/db/QuestionsProgressClient';

import QuestionLanguages from '../questions/common/QuestionLanguages';
import type { QuestionLanguage } from '../questions/common/QuestionsTypes';

import { RectangleStackIcon } from '@heroicons/react/24/outline';

function NoCompletedQuestions() {
  return (
    <div className="py-12 text-center">
      <RectangleStackIcon className="mx-auto h-12 w-12 text-slate-400" />
      <Heading className="mt-2 text-sm font-medium text-slate-900">
        No completed questions
      </Heading>
      <Section>
        <p className="mt-1 text-sm text-slate-500">
          Try out some Front End questions!
        </p>
        <div className="mt-6">
          <Button
            href="/prepare/coding"
            label="View questions"
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
  } = useQueryQuestionProgressAll();
  const {
    data: questionList,
    isLoading: isFetchingQuestionList,
    isError: isErrorQuestionList,
  } = useQueryQuestionListCoding();

  if (isFetchingQuestionProgress || isFetchingQuestionList) {
    return (
      <div className="py-10">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  if (isErrorQuestionProgress || isErrorQuestionList) {
    // TODO: Better error handling.
    return <div>An error occurred</div>;
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
      <Heading className="flex-1 border-b border-slate-200 pb-4 text-xl font-semibold">
        Completed Questions
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
