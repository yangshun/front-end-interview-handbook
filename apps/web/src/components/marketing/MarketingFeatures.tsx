import clsx from 'clsx';
import {
  RiBookOpenLine,
  RiBuildingLine,
  RiCodeSSlashLine,
  RiFlowChart,
  RiGitRepositoryLine,
  RiLineChartLine,
  RiReactjsLine,
  RiShieldCheckLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { QuestionCount } from '~/components/questions/listings/stats/QuestionCount';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import Text from '../ui/Text';
import { themeTextInvertColor } from '../ui/theme';

function useFeatures() {
  const intl = useIntl();
  const features = [
    {
      description: (
        <FormattedMessage
          defaultMessage="{questionCount}+ interview questions across <clink>coding</clink> and <qlink>quiz</qlink> formats and new questions constantly being added."
          description="Subtitle for huge question bank feature"
          id="+99sZT"
          values={{
            clink: (chunks) => <Anchor href="/prepare/coding">{chunks}</Anchor>,
            qlink: (chunks) => <Anchor href="/prepare/quiz">{chunks}</Anchor>,
            questionCount: QuestionCount,
          }}
        />
      ),
      icon: RiBookOpenLine,
      name: intl.formatMessage({
        defaultMessage: 'Huge question bank',
        description: 'Title for huge question bank feature',
        id: 'qwP4CA',
      }),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="All questions come with solutions written by ex-FAANG Senior Front End Engineers."
          description="Subtitle for high quality solutions feature"
          id="8ulBJI"
        />
      ),
      icon: RiShieldCheckLine,
      name: intl.formatMessage({
        defaultMessage: 'High quality solutions',
        description: 'Title for high quality solutions feature',
        id: 'HlRbK4',
      }),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Preparation plans for all kinds of preparation timelines — <owlink>1 week</owlink>, <omlink>1 month</omlink>, <tmlink>3 months</tmlink>."
          description="Subtitle for proven preparation plans feature"
          id="YdQTiq"
          values={{
            omlink: (chunks) => (
              <Anchor href="/prepare/one-month">{chunks}</Anchor>
            ),
            owlink: (chunks) => (
              <Anchor href="/prepare/one-week">{chunks}</Anchor>
            ),
            tmlink: (chunks) => (
              <Anchor href="/prepare/three-months">{chunks}</Anchor>
            ),
          }}
        />
      ),
      icon: RiGitRepositoryLine,
      name: intl.formatMessage({
        defaultMessage: 'Proven preparation plans',
        description: 'Title for proven preparation plans feature',
        id: 'YWz2ko',
      }),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Find out what questions companies are asking their candidates."
          description="Subtitle for company-tagged questions feature"
          id="y16Lzt"
        />
      ),
      icon: RiBuildingLine,
      name: intl.formatMessage({
        defaultMessage: 'Company-tagged questions',
        description: 'Title for company-tagged questions feature',
        id: '/06NwY',
      }),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Simulate real interview conditions, no need for any setup!"
          description="Subtitle for in-browser coding workspace feature"
          id="Nt+P5A"
        />
      ),
      icon: RiCodeSSlashLine,
      name: intl.formatMessage({
        defaultMessage: 'In-browser coding workspace',
        description: 'Title for in-browser coding workspace feature',
        id: 'koTXam',
      }),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="Coding questions supported in Vanilla JavaScript and React, with support for more libraries coming soon!"
          description="Subtitle for bringing your own framework feature"
          id="G9r7uh"
        />
      ),
      icon: RiReactjsLine,
      name: intl.formatMessage({
        defaultMessage: 'Bring your own framework',
        description: 'Title for bring your own framework feature',
        id: 'cxo3yi',
      }),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="The only platform with front end system design questions with official solutions written by senior engineers."
          description="Subtitle for front end system design feature"
          id="9KrOcn"
        />
      ),
      icon: RiFlowChart,
      name: intl.formatMessage({
        defaultMessage: 'Front end system design',
        description: 'Title for front end system design feature',
        id: 'QjhN+w',
      }),
    },
    {
      description: (
        <FormattedMessage
          defaultMessage="We add more questions and guides from time to time, available for free to premium subscribers."
          description="Subtitle for free continuous updates feature"
          id="X1UVMv"
        />
      ),
      icon: RiLineChartLine,
      name: intl.formatMessage({
        defaultMessage: 'Free continuous updates',
        description: 'Title for free continuous updates feature',
        id: 'Ptmnjq',
      }),
    },
    // {
    //   name: 'Exclusive techniques and best practices guides',
    //   description:
    //     'TODO',
    // },
  ];

  return features;
}

export default function MarketingFeatures() {
  const features = useFeatures();

  return (
    <Container variant="narrow">
      <Heading className="sr-only" level="custom">
        {/* TODO: i18n */}
        Features
      </Heading>
      <Section>
        <dl className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:space-y-0 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div
                  className={clsx(
                    'bg-brand absolute flex h-12 w-12 items-center justify-center rounded-md',
                    themeTextInvertColor,
                  )}>
                  <feature.icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <Heading
                  className="ml-16 text-lg font-medium leading-6"
                  level="custom">
                  {feature.name}
                </Heading>
              </dt>
              <Section>
                <dd className="mt-2 ml-16">
                  <Text color="secondary" display="block">
                    {feature.description}
                  </Text>
                </dd>
              </Section>
            </div>
          ))}
        </dl>
      </Section>
    </Container>
  );
}
