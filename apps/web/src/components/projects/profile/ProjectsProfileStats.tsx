import clsx from 'clsx';
import {
  RiEyeFill,
  RiRocketFill,
  RiTerminalBoxFill,
  RiThumbUpFill,
} from 'react-icons/ri';

import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeLineBackgroundColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export default function ProjectsProfileStats() {
  // TODO(projects): remove hard coded stats data
  const stats = [
    {
      count: 232,
      icon: RiRocketFill,
      title: 'Projects Completed',
    },
    {
      count: 5653,
      icon: RiThumbUpFill,
      title: 'Number of upvotes',
    },
    {
      count: 4,
      icon: RiTerminalBoxFill,
      title: 'Code reviews done',
    },
    {
      count: 824,
      icon: RiEyeFill,
      title: 'Project views',
    },
  ];

  return (
    <Section>
      <CardContainer className="lg:grid-cols-4 grid-cols-2 grid grid-rows-2 gap-3 md:gap-4 lg:gap-6">
        {stats.map(({ title, count, icon: Icon }) => {
          return (
            <Card
              key={title}
              className="group/card relative isolate flex flex-col items-start justify-between gap-3 px-6 py-4"
              padding={false}>
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'md:inline-flex h-9 w-9 items-center justify-center rounded-md hidden',
                    themeLineBackgroundColor,
                    themeTextSecondaryColor,
                    'border border-transparent transition',
                    'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
                    'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
                  )}>
                  <Icon aria-hidden={true} className="h-5 w-5" />
                </span>
                <Text color="secondary" size="body2" weight="medium">
                  {title}
                </Text>
              </div>
              <Text
                className="md:text-5xl text-4xl font-bold"
                size="custom"
                weight="custom">
                {count}
              </Text>
            </Card>
          );
        })}
      </CardContainer>
    </Section>
  );
}
