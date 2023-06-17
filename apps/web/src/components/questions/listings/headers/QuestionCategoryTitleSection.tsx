import type { ReactNode } from 'react';
import { RiCss3Line, RiHtml5Line, RiReactjsLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import TextPairing from '~/components/common/TextPairing';
import RiJavaScriptLine from '~/components/icons/remix/RiJavaScriptLine';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Tabs from '~/components/ui/Tabs';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

import type { QuestionListCategory } from '../types';

type CategoryValue = QuestionListCategory | 'react';

type Props = Readonly<{
  category: CategoryValue;
  count: number;
  description: string;
  logo?: ReactNode;
  title: string;
}>;

const items: ReadonlyArray<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  value: CategoryValue;
}> = [
  {
    href: '/questions/js',
    icon: RiJavaScriptLine,
    label: 'JavaScript',
    value: 'js',
  },
  {
    href: '/questions/html',
    icon: RiHtml5Line,
    label: 'HTML',
    value: 'html',
  },
  {
    href: '/questions/css',
    icon: RiCss3Line,
    label: 'CSS',
    value: 'css',
  },
  {
    href: '/questions/react',
    icon: RiReactjsLine,
    label: 'React',
    value: 'react',
  },
];

export default function QuestionCategoryTitleSection({
  count,
  category,
  description,
  logo,
  title,
}: Props) {
  const intl = useIntl();

  return (
    <div className="grid gap-y-12">
      <div className="grid gap-y-6">
        <div className="flex items-center gap-x-4">
          <Heading level="heading4">
            <FormattedMessage
              defaultMessage="Practice Questions"
              description="Questions list page title"
              id="BYD90z"
            />
          </Heading>
          <Badge
            label={intl.formatMessage(
              {
                defaultMessage: '{questionCount}+ questions',
                description: 'Number of questions in the list',
                id: 'LzKi2d',
              },
              {
                questionCount: roundQuestionCountToNearestTen(count),
              },
            )}
            size="sm"
            variant="primary"
          />
        </div>
        <Tabs
          label={intl.formatMessage({
            defaultMessage: 'Select question category',
            description: 'Tab label to select another question category',
            id: 'MOxuKN',
          })}
          tabs={items}
          value={category}
        />
      </div>
      <Section>
        <div className="flex gap-6">
          {logo}
          <TextPairing description={description} title={title} />
        </div>
      </Section>
    </div>
  );
}
