'use client';

import { useState } from 'react';
import {
  RiBugLine,
  RiCodeSSlashLine,
  RiFlowChart,
  RiFolder4Line,
  RiGlobalLine,
  RiNodeTree,
  RiQuestionnaireLine,
  RiShieldKeyholeLine,
} from 'react-icons/ri';

import QuestionCountLabel from '~/components/questions/common/QuestionCountLabel';
import QuestionDifficultyLabel from '~/components/questions/common/QuestionDifficultyLabel';
import QuestionProgressLabel from '~/components/questions/common/QuestionsProgressLabel';
import QuestionStudyAllocationLabel from '~/components/questions/common/QuestionStudyAllocationLabel';
import PreparationStudyGuideList from '~/components/questions/dashboard/PreparationStudyGuideList';
import QuestionFocusAreasSection from '~/components/questions/dashboard/QuestionFocusAreasSection';
import QuestionListingCategoryFilters from '~/components/questions/listings/filters/QuestionListingCategoryFilters';
import QuestionsContinueLearning from '~/components/questions/listings/QuestionsContinueLearning';
import QuestionListingDifficultySummary from '~/components/questions/listings/stats/QuestionListingDifficultySummary';
import QuestionListingQuestionCount from '~/components/questions/listings/stats/QuestionListingQuestionCount';
import QuestionsProgressPanelSection from '~/components/questions/listings/stats/QuestionProgressPanelSection';
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
                  icon={RiCodeSSlashLine}
                  progressBarClassName={themeGradient1.className}
                  title="Coding"
                  totalQuestions={116}
                  variant="default"
                />
                <QuestionsProgressPanel
                  completedQuestions={80}
                  icon={RiCodeSSlashLine}
                  progressBarClassName={themeGradient3.className}
                  title="Quizzes"
                  totalQuestions={100}
                  variant="default"
                />
                <QuestionsProgressPanel
                  completedQuestions={4}
                  icon={RiCodeSSlashLine}
                  progressBarClassName={themeGradient2.className}
                  title="System design"
                  totalQuestions={39}
                  variant="default"
                />
              </div>
              <QuestionsProgressPanel
                completedQuestions={58}
                icon={RiCodeSSlashLine}
                progressBarClassName={themeGradient1.className}
                title="Coding"
                totalQuestions={116}
                variant="compact"
              />
              <QuestionsProgressPanel
                completedQuestions={80}
                icon={RiCodeSSlashLine}
                progressBarClassName={themeGradient3.className}
                title="Quizzes"
                totalQuestions={100}
                variant="compact"
              />
              <QuestionsProgressPanel
                completedQuestions={4}
                icon={RiCodeSSlashLine}
                progressBarClassName={themeGradient2.className}
                title="System design"
                totalQuestions={39}
                variant="compact"
              />
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <QuestionsProgressPanelSection
                layout="horizontal"
                progressSummary={{
                  coding: {
                    completed: 58,
                    total: 116,
                  },
                  quiz: {
                    completed: 80,
                    total: 100,
                  },
                  'system-design': {
                    completed: 4,
                    total: 39,
                  },
                }}
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
                  easy={1}
                  hard={5678}
                  medium={234}
                />
              </div>
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <div className="grid items-start gap-y-6">
                <QuestionListingCategoryFilters
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
              <div className="grid items-start gap-y-6">
                <QuestionFocusAreasSection
                  description="Recommended focus areas tooltip"
                  focusAreas={[
                    {
                      description: 'Lorem ipsum',
                      durationMins: 92,
                      icon: RiFlowChart,
                      questionCount: 47,
                      title: 'Data structure & algorithms',
                    },
                    {
                      description: 'Lorem ipsum',
                      durationMins: 92,
                      icon: RiFlowChart,
                      questionCount: 47,
                      title: 'Security',
                    },
                    {
                      description: 'Lorem ipsum',
                      durationMins: 92,
                      icon: RiFlowChart,
                      questionCount: 47,
                      title: 'Something else',
                    },
                    {
                      description: 'Lorem ipsum',
                      durationMins: 92,
                      icon: RiFlowChart,
                      questionCount: 47,
                      title: 'Another thing',
                    },
                  ]}
                  title="Recommended focus areas"
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
      </Section>
    </CardContainer>
  );
}
