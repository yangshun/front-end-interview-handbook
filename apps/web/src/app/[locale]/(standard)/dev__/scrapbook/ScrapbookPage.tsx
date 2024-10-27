'use client';

import { useState } from 'react';
import {
  RiBugLine,
  RiFolder4Line,
  RiGlobalLine,
  RiNodeTree,
  RiQuestionnaireLine,
  RiShieldKeyholeLine,
} from 'react-icons/ri';
import { TbBinaryTree } from 'react-icons/tb';

import InterviewsGitHubSlider from '~/components/interviews/common/github/InterviewsGitHubSlider';
import InterviewsDashboardContinueLearning from '~/components/interviews/dashboard/InterviewsDashboardContinueLearning';
import InterviewsDashboardStudyGuideList from '~/components/interviews/dashboard/InterviewsDashboardStudyGuideList';
import InterviewsGuideCard from '~/components/interviews/guides/InterviewsGuideCard';
import InterviewsMarketingCompaniesMarquee from '~/components/interviews/marketing/InterviewsMarketingCompaniesMarquee';
import InterviewsMarketingHomepageFeaturesRow from '~/components/interviews/marketing/InterviewsMarketingHomepageFeaturesRow';
import InterviewsMarketingQuestionCardMarquee from '~/components/interviews/marketing/InterviewsMarketingQuestionCardMarquee';
import InterviewsPaymentFailureDialog from '~/components/interviews/purchase/InterviewsPaymentFailureDialog';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionListingTopicFilters from '~/components/interviews/questions/listings/filters/QuestionListingTopicFilters';
import QuestionsStudyListTitleSection_DEPRECATED from '~/components/interviews/questions/listings/learning/QuestionsStudyListTitleSection_DEPRECATED';
import QuestionListingDifficultySummary from '~/components/interviews/questions/listings/stats/QuestionListingDifficultySummary';
import QuestionsProgressPanel from '~/components/interviews/questions/listings/stats/QuestionsProgressPanel';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionDifficultyLabel from '~/components/interviews/questions/metadata/QuestionDifficultyLabel';
import QuestionProgressLabel from '~/components/interviews/questions/metadata/QuestionProgressLabel';
import QuestionStudyAllocationLabel from '~/components/interviews/questions/metadata/QuestionStudyAllocationLabel';
import ExclusiveTicket from '~/components/promotions/tickets/ExclusiveTicket';
import Ticket from '~/components/promotions/tickets/Ticket';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import UIExamplesGroup from '~/components/ui/misc/UIExamplesGroup';
import Text from '~/components/ui/Text';
import {
  themeGradientGreenYellow,
  themeGradientPinkPurple,
  themeGradientPurpleGreen,
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
  subtitle: null,
  title: 'Stack',
  topics: [],
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
                barClassName={themeGradientPurpleGreen.className}
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
                  progressBarClassName={themeGradientPurpleGreen.className}
                  title="Coding"
                  totalQuestions={116}
                  variant="default"
                />
                <QuestionsProgressPanel
                  completedQuestions={80}
                  progressBarClassName={themeGradientPinkPurple.className}
                  title="Quizzes"
                  totalQuestions={100}
                  variant="default"
                />
                <QuestionsProgressPanel
                  completedQuestions={4}
                  progressBarClassName={themeGradientGreenYellow.className}
                  title="System design"
                  totalQuestions={39}
                  variant="default"
                />
              </div>
              <QuestionsProgressPanel
                completedQuestions={58}
                progressBarClassName={themeGradientPurpleGreen.className}
                title="Coding"
                totalQuestions={116}
                variant="compact"
              />
              <QuestionsProgressPanel
                completedQuestions={80}
                progressBarClassName={themeGradientPinkPurple.className}
                title="Quizzes"
                totalQuestions={100}
                variant="compact"
              />
              <QuestionsProgressPanel
                completedQuestions={4}
                progressBarClassName={themeGradientGreenYellow.className}
                title="System design"
                totalQuestions={39}
                variant="compact"
              />
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <InterviewsGitHubSlider />
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <InterviewsGuideCard
                data={{
                  description:
                    'Explore our starter guides to get a solid grasp of JavaScript interview prep before jumping into practice.',
                  items: [
                    {
                      category: 'front-end-interview-guide',
                      description:
                        'Answering fundamental of JavaScript and related.',
                      href: '#',
                      isCompleted: false,
                      readingTime: 3,
                      slug: 'intro',
                      title: 'Foundation of JS',
                    },
                    {
                      category: 'front-end-interview-guide',
                      description:
                        'Answering fundamental of JavaScript and related.',
                      href: '#',
                      isCompleted: false,
                      readingTime: 4,
                      slug: 'foundation',
                      title: 'Object Oriented Programming',
                    },
                  ],
                  title: 'Javascript Interview guides',
                }}
              />
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
                    id: 'foo',
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
                    onClear: () => {
                      setSelectedFilters(new Set());
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
                    setValues: setSelectedFilters,
                  }}
                  values={selectedFilters}
                />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-flex flex-col items-start gap-y-6">
                <InterviewsDashboardStudyGuideList
                  href="#"
                  items={[
                    {
                      href: '/dev__/scrapbook',
                      label: 'Intro to Coding Round',
                      slug: 'intro',
                    },
                    {
                      href: '/dev__/scrapbook',
                      label: 'Algorithm Questions',
                      slug: 'algo',
                    },
                    {
                      href: '/dev__/scrapbook',
                      label: 'JavaScript Questions',
                      slug: 'js',
                    },
                    {
                      href: '/dev__/scrapbook',
                      label: 'User Interface Questions',
                      slug: 'ui',
                    },
                  ]}
                />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="inline-grid grid-cols-1">
                <InterviewsDashboardContinueLearning
                  items={[
                    {
                      completedCount: 30,
                      durationMins: 92,
                      gradient: themeGradientPurpleGreen,
                      href: '/dev__/scrapbook?plan=algo',
                      questionsCount: 47,
                      reverseGradient: true,
                      title: 'Data structure and algorithms',
                    },
                    {
                      completedCount: 25,
                      durationMins: 92,
                      gradient: themeGradientGreenYellow,
                      href: '/dev__/scrapbook?plan=forms',
                      questionsCount: 47,
                      reverseGradient: true,
                      title: 'Forms',
                    },
                    {
                      completedCount: 15,
                      durationMins: 92,
                      gradient: themeGradientPinkPurple,
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
              <QuestionsStudyListTitleSection_DEPRECATED
                difficultySummary={{
                  easy: 30,
                  hard: 10,
                  medium: 20,
                }}
                icon={TbBinaryTree}
                overallProgress={[]}
                questionCount={47}
                questionListKey="one-month"
                questions={[]}
                themeBackgroundClass={themeGradientPurpleGreen.className}
                title="Data structure and algorithms"
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
                <InterviewsMarketingHomepageFeaturesRow />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="vertical">
              <div>
                <InterviewsMarketingCompaniesMarquee />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="flex flex-col gap-8">
                <Heading level="heading4">Question marquees</Heading>
                <InterviewsMarketingQuestionCardMarquee
                  periodSeconds={120}
                  questions={mockQuestions}
                  rows={1}
                />
                <Divider />
                <InterviewsMarketingQuestionCardMarquee
                  periodSeconds={60}
                  questions={mockQuestions}
                  rows={2}
                />
              </div>
            </UIExamplesGroup>
          </div>
        </Section>
      </Section>
      <Container>
        <Heading level="heading3">Tickets</Heading>
      </Container>
      <Section>
        <UIExamplesGroup darkMode="horizontal">
          <ExclusiveTicket
            addOnElement={<Badge label="Coming soon" variant="warning" />}
            ratio="wide"
            subtitle="2 months free"
            title="Exclusive beta access to our new mystery product"
          />
          <ExclusiveTicket
            padding="md"
            subtitle="2 months free"
            title={
              <Text size="body2">
                Exclusive beta access to our new mystery product
              </Text>
            }
            width={300}
          />
          <ExclusiveTicket
            height={150}
            padding="md"
            subtitle={
              <Text className="text-2xs block" color="inherit" size="inherit">
                2 months free
              </Text>
            }
            title={
              <Text className="text-2xs block" size="inherit">
                Exclusive beta access to our new mystery product
              </Text>
            }
          />
          <ExclusiveTicket
            padding="md"
            subtitle={
              <Text className="text-2xs block" color="inherit" size="inherit">
                2 months free
              </Text>
            }
            title={
              <Text className="text-2xs block" size="inherit">
                Exclusive beta access to our new mystery product
              </Text>
            }
            width={200}
          />
          <Ticket padding="md" width={200}>
            <div className="flex h-full flex-col items-center justify-center">
              <Text className="text-2xl" size="inherit" weight="bold">
                20% off
              </Text>
              <Text color="secondary" size="body3">
                All plans, including lifetime
              </Text>
            </div>
          </Ticket>
        </UIExamplesGroup>
      </Section>
      <Container>
        <Heading level="heading3">Payment failure</Heading>
      </Container>
      <Section>
        <UIExamplesGroup darkMode="horizontal">
          <InterviewsPaymentFailureDialog
            trigger={
              <Button label="Trigger payment failure" variant="primary" />
            }
          />
        </UIExamplesGroup>
      </Section>
    </CardContainer>
  );
}
