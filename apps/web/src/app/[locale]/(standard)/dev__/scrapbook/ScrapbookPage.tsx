'use client';

import { useState } from 'react';
import {
  RiBugLine,
  RiCodeSSlashLine,
  RiFolder4Line,
  RiGlobalLine,
  RiNodeTree,
  RiQuestionnaireLine,
  RiShieldKeyholeLine,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';

import MarketingCompaniesMarquee from '~/components/marketing/MarketingCompaniesMarquee';
import MarketingFeaturesRow from '~/components/marketing/MarketingFeaturesRow';
import MarketingQuestionCardMarquee from '~/components/marketing/MarketingQuestionCardMarquee';
import QuestionCountLabel from '~/components/questions/common/QuestionCountLabel';
import QuestionDifficultyLabel from '~/components/questions/common/QuestionDifficultyLabel';
import QuestionProgressLabel from '~/components/questions/common/QuestionsProgressLabel';
import QuestionStudyAllocationLabel from '~/components/questions/common/QuestionStudyAllocationLabel';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import PreparationStudyGuideList from '~/components/questions/dashboard/PreparationStudyGuideList';
import QuestionsContinueLearning from '~/components/questions/dashboard/QuestionsContinueLearning';
import QuestionListingTopicFilters from '~/components/questions/listings/filters/QuestionListingTopicFilters';
import QuestionListTitleSection from '~/components/questions/listings/headers/QuestionListTitleSection';
import QuestionListingDifficultySummary from '~/components/questions/listings/stats/QuestionListingDifficultySummary';
import QuestionListingQuestionCount from '~/components/questions/listings/stats/QuestionListingQuestionCount';
import QuestionsProgressPanel from '~/components/questions/listings/stats/QuestionsProgressPanel';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import UIExamplesGroup from '~/components/ui/misc/UIExamplesGroup';
import {
  themeGradient1,
  themeGradient2,
  themeGradient3,
} from '~/components/ui/theme';

const mockQuestion: QuestionMetadata = {
  author: null,
  companies: [],
  created: 0,
  difficulty: 'medium',
  duration: 0,
  excerpt:
    'Implement a stack data structure containing the common stack methods',
  featured: false,
  format: 'quiz',
  frameworkDefault: null,
  frameworks: [],
  href: '/dev__/scrapbook',
  importance: 'high',
  languages: ['js', 'ts'],
  nextQuestions: [],
  premium: false,
  published: false,
  ranking: 0,
  similarQuestions: [],
  slug: 'stack',
  title: 'Stack',
};

const mockQuestions = Array.from({ length: 10 }, (_, i) => ({
  ...mockQuestion,
  slug: `${mockQuestion.title}${i}`,
  title: `${mockQuestion.title} ${i}`,
}));

export default function ScrapbookPage() {
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set(),
  );

  return (
    <CardContainer className="grid gap-y-16">
      <Container className="grid gap-y-6">
        <Heading level="heading2">Scrapbook</Heading>
        <Divider />
      </Container>
      <Section>
        <Container>
          <Heading level="heading3">Questions</Heading>
        </Container>
        <Section>
          <div>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex gap-x-6">
                <QuestionDifficultyLabel showIcon={true} value="easy" />
                <QuestionDifficultyLabel showIcon={true} value="medium" />
                <QuestionDifficultyLabel showIcon={true} value="hard" />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex gap-x-6">
                <QuestionStudyAllocationLabel
                  frequency="daily"
                  hours={2}
                  showIcon={true}
                />
                <QuestionStudyAllocationLabel
                  frequency="weekly"
                  hours={12}
                  showIcon={true}
                />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex gap-x-6">
                <QuestionCountLabel count={47} showIcon={true} />
                <QuestionCountLabel count={123} showIcon={true} />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <QuestionProgressLabel
                barClassName={themeGradient1.className}
                completed={50}
                total={120}
              />
              <QuestionProgressLabel completed={60} total={100} />
            </UIExamplesGroup>
          </div>
        </Section>
        <Container>
          <Heading level="heading3">Dashboard</Heading>
        </Container>
        <Section>
          <div>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-grid grid-cols-3 gap-x-6">
                <QuestionsProgressPanel
                  completedQuestions={58}
                  progressBarClassName={themeGradient1.className}
                  title="Coding"
                  totalQuestions={116}
                  variant="default"
                />
                <QuestionsProgressPanel
                  completedQuestions={80}
                  progressBarClassName={themeGradient3.className}
                  title="Quizzes"
                  totalQuestions={100}
                  variant="default"
                />
                <QuestionsProgressPanel
                  completedQuestions={4}
                  progressBarClassName={themeGradient2.className}
                  title="System design"
                  totalQuestions={39}
                  variant="default"
                />
              </div>
              <QuestionsProgressPanel
                completedQuestions={58}
                progressBarClassName={themeGradient1.className}
                title="Coding"
                totalQuestions={116}
                variant="compact"
              />
              <QuestionsProgressPanel
                completedQuestions={80}
                progressBarClassName={themeGradient3.className}
                title="Quizzes"
                totalQuestions={100}
                variant="compact"
              />
              <QuestionsProgressPanel
                completedQuestions={4}
                progressBarClassName={themeGradient2.className}
                title="System design"
                totalQuestions={39}
                variant="compact"
              />
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-grid grid-cols-2 gap-x-2">
                <QuestionListingQuestionCount count={78} variant="free" />
                <QuestionListingQuestionCount count={181} variant="premium" />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex flex-col items-start gap-y-6">
                <QuestionListingDifficultySummary
                  easy={67}
                  hard={78}
                  medium={36}
                />
                <QuestionListingDifficultySummary
                  easy={10}
                  hard={1234}
                  medium={234}
                />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="grid items-start gap-y-6">
                <QuestionListingTopicFilters
                  section={{
                    id: '',
                    matches: () => true,
                    name: '',
                    onChange: (value) => {
                      setSelectedFilters((oldFilters) => {
                        const newFilters = new Set(oldFilters);

                        if (oldFilters.has(value)) {
                          newFilters.delete(value);
                        } else {
                          newFilters.add(value);
                        }

                        return newFilters;
                      });
                    },
                    options: [
                      {
                        icon: RiFolder4Line,
                        label: 'All topics',
                        value: 'all-topics',
                      },
                      {
                        icon: RiGlobalLine,
                        label: 'Internationalization',
                        value: 'internationalization',
                      },
                      {
                        icon: RiShieldKeyholeLine,
                        label: 'Security',
                        value: 'security',
                      },
                      {
                        icon: RiBugLine,
                        label: 'Testing',
                        value: 'Testing',
                      },
                      {
                        icon: RiFolder4Line,
                        label: 'All questions',
                        value: 'all-questions',
                      },
                      {
                        icon: RiGlobalLine,
                        label: 'Coding',
                        value: 'coding',
                      },
                      {
                        icon: RiQuestionnaireLine,
                        label: 'Quiz',
                        value: 'quiz',
                      },
                      {
                        icon: RiNodeTree,
                        label: 'System design',
                        value: 'system-design',
                      },
                    ],
                  }}
                  values={selectedFilters}
                />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex flex-col items-start gap-y-6">
                <PreparationStudyGuideList
                  href="#"
                  items={[
                    {
                      href: '/dev__/scrapbook',
                      slug: 'intro',
                      title: 'Intro to Coding Round',
                    },
                    {
                      href: '/dev__/scrapbook',
                      slug: 'algo',
                      title: 'Algorithm Questions',
                    },
                    {
                      href: '/dev__/scrapbook',
                      slug: 'js',
                      title: 'JavaScript Questions',
                    },
                    {
                      href: '/dev__/scrapbook',
                      slug: 'ui',
                      title: 'User Interface Questions',
                    },
                  ]}
                />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-grid grid-cols-1">
                <QuestionsContinueLearning
                  items={[
                    {
                      completedCount: 30,
                      durationMins: 92,
                      gradient: themeGradient1,
                      href: '/dev__/scrapbook?plan=algo',
                      questionsCount: 47,
                      reverseGradient: true,
                      title: 'Data structure and algorithms',
                    },
                    {
                      completedCount: 25,
                      durationMins: 92,
                      gradient: themeGradient2,
                      href: '/dev__/scrapbook?plan=forms',
                      questionsCount: 47,
                      reverseGradient: true,
                      title: 'Forms',
                    },
                    {
                      completedCount: 15,
                      durationMins: 92,
                      gradient: themeGradient3,
                      href: '/dev__/scrapbook?plan=accessibility',
                      questionsCount: 47,
                      title: 'Accessibility',
                    },
                  ]}
                />
              </div>
            </UIExamplesGroup>
          </div>
        </Section>
        <Container>
          <Heading level="heading3">Study Plans / Focus Areas</Heading>
        </Container>
        <Section>
          <div>
            <UIExamplesGroup>
              <QuestionListTitleSection
                difficultySummary={{
                  easy: 30,
                  hard: 10,
                  medium: 20,
                }}
                icon={TbBinaryTree}
                questionCount={47}
                questionListKey="one-month"
                themeBackgroundClass={themeGradient1.className}
                title="Data structure and algorithms"
                totalDurationMins={560}
              />
            </UIExamplesGroup>
          </div>
        </Section>
        <Container>
          <Heading level="heading3">Marketing</Heading>
        </Container>
        <Section>
          <div>
            <UIExamplesGroup darkMode="vertical">
              <div>
                <MarketingFeaturesRow />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="vertical">
              <div>
                <MarketingCompaniesMarquee />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="flex flex-col gap-8">
                <Heading level="heading4">Question marquees</Heading>
                <MarketingQuestionCardMarquee
                  periodSeconds={120}
                  questions={mockQuestions}
                  rows={1}
                />
                <Divider />
                <MarketingQuestionCardMarquee
                  periodSeconds={60}
                  questions={mockQuestions}
                  rows={2}
                />
              </div>
            </UIExamplesGroup>
          </div>
        </Section>
      </Section>
    </CardContainer>
  );
}
