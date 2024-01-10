import clsx from 'clsx';
import {
  RiEyeFill,
  RiRocketFill,
  RiTerminalBoxFill,
  RiThumbUpFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeChipBackgroundColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

function getFormattedNumber(num: number) {
  if (num === 0) {
    return '–';
  }

  const lookup = [
    { symbol: '', value: 1 },
    { symbol: 'k', value: 1e3 },
    { symbol: 'M', value: 1e6 },
    { symbol: 'G', value: 1e9 },
    { symbol: 'T', value: 1e12 },
    { symbol: 'P', value: 1e15 },
    { symbol: 'E', value: 1e18 },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((lookupItem) => {
      return num >= lookupItem.value;
    });

  if (!item) {
    return '–';
  }

  const maxNumberOfDigits = 3;
  const decimalPart = Math.floor(num / item.value);
  const numDecimalDegits = decimalPart.toString().length;
  const digits = maxNumberOfDigits - numDecimalDegits;

  return (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol;
}

type Props = Readonly<{
  codeReviews: number | undefined;
  completedProjects: number | undefined;
  submissionViews: number | undefined;
  upvotes: number | undefined;
}>;

export default function ProjectsProfileStats({
  codeReviews,
  completedProjects,
  submissionViews,
  upvotes,
}: Props) {
  const intl = useIntl();

  const stats = [
    {
      count: completedProjects,
      icon: RiRocketFill,
      title: intl.formatMessage({
        defaultMessage: 'Challenges completed',
        description: 'Number of project challenges completed',
        id: 'lWQA1A',
      }),
    },
    {
      count: upvotes,
      icon: RiThumbUpFill,
      title: intl.formatMessage({
        defaultMessage: 'Number of upvotes',
        description: 'Number of upvotes received',
        id: 'YKc6h5',
      }),
    },
    {
      count: codeReviews,
      icon: RiTerminalBoxFill,
      title: intl.formatMessage({
        defaultMessage: 'Code reviews done',
        description: 'Number of code reviews given',
        id: 'axma2q',
      }),
    },
    {
      count: submissionViews,
      icon: RiEyeFill,
      title: intl.formatMessage({
        defaultMessage: 'Views on your submissions',
        description: 'Number of views on the project submissions',
        id: 'KeMz9W',
      }),
    },
  ];

  return (
    <Section>
      <CardContainer className="xl:grid-cols-4 grid-cols-2 grid gap-4 lg:gap-6">
        {stats.map(({ title, count, icon: Icon }) => {
          return (
            <Card
              key={title}
              className="group/card relative isolate flex flex-col items-start justify-between gap-3 px-4 py-4 md:px-6"
              padding={false}>
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'md:inline-flex h-9 w-9 items-center justify-center rounded-md hidden',
                    themeChipBackgroundColor,
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
                {count ? getFormattedNumber(count) : '-'}
              </Text>
            </Card>
          );
        })}
      </CardContainer>
    </Section>
  );
}
