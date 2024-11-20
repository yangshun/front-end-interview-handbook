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

import InterviewsGuideCard from '~/components/interviews/guides/InterviewsGuideCard';
import InterviewsQuestionsCategoryContentSlider from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryContentSlider';
import QuestionListingTopicFilters from '~/components/interviews/questions/listings/filters/QuestionListingTopicFilters';
import QuestionsProgressPanel from '~/components/interviews/questions/listings/stats/QuestionsProgressPanel';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionDifficultyLabel from '~/components/interviews/questions/metadata/QuestionDifficultyLabel';
import QuestionProgressLabel from '~/components/interviews/questions/metadata/QuestionProgressLabel';
import QuestionStudyAllocationLabel from '~/components/interviews/questions/metadata/QuestionStudyAllocationLabel';
import ExclusiveTicket from '~/components/promotions/tickets/ExclusiveTicket';
import Ticket from '~/components/promotions/tickets/Ticket';
import Badge from '~/components/ui/Badge';
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
              <InterviewsQuestionsCategoryContentSlider framework="js" />
            </UIExamplesGroup>
            <UIExamplesGroup darkMode="horizontal">
              <InterviewsGuideCard
                data={{
                  description:
                    'Explore our starter guides to get a solid grasp of JavaScript interview prep before jumping into practice.',
                  items: [
                    {
                      book: 'FRONT_END_INTERVIEW_PLAYBOOK',
                      description:
                        'Answering fundamental of JavaScript and related.',
                      href: '#',
                      isCompleted: false,
                      readingTime: 3,
                      slug: 'intro',
                      title: 'Foundation of JS',
                    },
                    {
                      book: 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK',
                      description:
                        'Answering fundamental of JavaScript and related.',
                      href: '#',
                      isCompleted: false,
                      readingTime: 4,
                      slug: 'foundation',
                      title: 'Object Oriented Programming',
                    },
                  ],
                  title: 'JavaScript Interview guides',
                }}
              />
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
    </CardContainer>
  );
}
