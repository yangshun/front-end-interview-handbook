'use client';

import QuestionCountLabel from '~/components/questions/common/QuestionCountLabel';
import QuestionDifficultyLabel from '~/components/questions/common/QuestionDifficultyLabel';
import QuestionStudyAllocationLabel from '~/components/questions/common/QuestionStudyAllocationLabel';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import UIExamplesGroup from '~/components/ui/misc/UIExamplesGroup';

export default function ScrapbookPage() {
  return (
    <div className="grid gap-y-16">
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
          </div>
        </Section>
      </Section>
    </div>
  );
}
