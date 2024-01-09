'use client';

import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

export default function ProjectsDashboardPage() {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Heading className="md:block hidden" level="heading5">
          <FormattedMessage
            defaultMessage="Dashboard"
            description="Title of Projects dashboard page"
            id="UTPE3y"
          />
        </Heading>
        <Card
          className="flex flex-col gap-2"
          disableSpotlight={true}
          pattern={false}>
          <Text size="body2">Complete your profile</Text>
          <Text size="body3">Completed profiles get 3x more responses</Text>
        </Card>
      </div>
      <Section>
        <CardContainer className="lg:grid-cols-4 lg:grid-rows-1 grid-cols-2 grid grid-rows-2 gap-3 md:gap-4 lg:gap-6">
          Placeholder for stats
        </CardContainer>
      </Section>
      <Section>
        <div className="lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid grid-rows-2 gap-3 md:gap-4 lg:gap-6">
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-6">
            <div className="flex flex-col gap-4">
              <Heading level="heading6">
                <FormattedMessage
                  defaultMessage="Continue projects"
                  description="Title for Continue projects section on Projects dashboard page"
                  id="MgVI6L"
                />
              </Heading>
              <div>Placeholder for projects</div>
            </div>
            <div className="flex flex-col gap-4">
              <Heading level="heading6">
                <FormattedMessage
                  defaultMessage="Continue tracks and skills"
                  description="Title for Continue tracks and skills section on Projects dashboard page"
                  id="JIWdeN"
                />
              </Heading>
              Placeholder for tracks and skills
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Heading level="heading6">
                <FormattedMessage
                  defaultMessage="Top submissions you might learn from"
                  description="Title for Top submissions section on Projects dashboard page"
                  id="GRuYLb"
                />
              </Heading>
              <Button
                addonPosition="end"
                className="dark:!text-brand !text-brand-dark -ms-3"
                href="#"
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'See all',
                  description:
                    'Label for See all button on Projects dashboard page',
                  id: 'PHTFnA',
                })}
                size="sm"
                variant="tertiary"
              />
            </div>
            Placeholder for top submissions
          </div>
        </div>
      </Section>
      <Section>
        Placeholder for project progress and community contributions
      </Section>
    </div>
  );
}
