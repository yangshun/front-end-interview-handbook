import clsx from 'clsx';
import { RiBook3Line, RiTeamLine, RiTerminalBoxLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Section from '~/components/ui/Heading/HeadingContext';

import { QuestionCount } from '../questions/listings/stats/QuestionCount';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Text from '../ui/Text';
import { themeGlassyBorder, themeTextSubtitleColor } from '../ui/theme';

type Feature = Readonly<{
  description: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  title: string;
}>;

function useFeatures() {
  const intl = useIntl();

  const features: ReadonlyArray<Feature> = [
    {
      description: intl.formatMessage(
        {
          defaultMessage:
            '{QuestionCount}+ of the most important questions — from building user interfaces in popular front end frameworks to system design.',
          description:
            "Description of 'Practice everything in popular frameworks' feature in marketing page",
          id: '1hBmJl',
        },
        {
          QuestionCount,
        },
      ),
      icon: RiTerminalBoxLine,
      key: 'practice-everything',
      title: intl.formatMessage({
        defaultMessage: 'Practice everything in popular frameworks',
        description:
          "Title of 'Practice everything in popular frameworks' feature in marketing page",
        id: 'fmAcHR',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Every question is accompanied by an official, well-explained solution from ex-interviewers.',
        description:
          "Description of 'Learn from official solutions and guides' feature in marketing page",
        id: 'Z4VfkU',
      }),
      icon: RiBook3Line,
      key: 'learn-from-official-solutions',
      title: intl.formatMessage({
        defaultMessage: 'Learn from official solutions and guides',
        description:
          "Title of 'Learn from official solutions and guides' feature in marketing page",
        id: 'p/R4cx',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Including core maintainers at popular open source projects and creators of Blind 75 and Front End Interview Handbook.',
        description:
          "Description of 'Guided by well-known senior engineers' feature in marketing page",
        id: 'ujRHIv',
      }),
      icon: RiTeamLine,
      key: 'guided-by-well-known-senior-engineers',
      title: intl.formatMessage({
        defaultMessage: 'Guided by well-known senior engineers',
        description:
          "Title of 'Guided by well-known senior engineers' feature in marketing page",
        id: 'W+ConA',
      }),
    },
  ];

  return features;
}

export default function MarketingFeaturesRow() {
  const intl = useIntl();
  const features = useFeatures();

  return (
    <Container className="py-16">
      <Heading className="sr-only" level="custom">
        {intl.formatMessage({
          defaultMessage: 'Key features',
          description: 'Key features of the product',
          id: '97HVxk',
        })}
      </Heading>
      <Section>
        <div className="mx-auto grid max-w-sm grid-cols-1 gap-x-8 gap-y-12 md:max-w-xl lg:max-w-full lg:grid-cols-3">
          {features.map(({ description, key, icon: Icon, title }) => (
            <div
              key={key}
              className="flex flex-row items-start gap-6 lg:flex-col">
              <div
                aria-hidden="true"
                className={clsx(
                  'dark:bg-neutral-800/70 rounded-full p-3',
                  themeGlassyBorder,
                )}>
                <Icon
                  className={clsx(
                    'text-primary h-6 w-6',
                    themeTextSubtitleColor,
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Heading
                  className={themeTextSubtitleColor}
                  color="custom"
                  level="heading6">
                  {title}
                </Heading>
                <Text color="secondary" size="body2">
                  {description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
