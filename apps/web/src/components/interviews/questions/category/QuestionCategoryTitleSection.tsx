import type { ReactNode } from 'react';
import {
  RiAngularjsFill,
  RiCss3Fill,
  RiHtml5Fill,
  RiJavascriptFill,
  RiReactjsLine,
  RiVuejsLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import TextPairing from '~/components/common/TextPairing';
import SvelteLogo from '~/components/icons/SvelteLogo';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Tabs from '~/components/ui/Tabs';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

import type { QuestionFramework } from '../common/QuestionsTypes';
import type { QuestionListCategory } from '../listings/types';

type CategoryValue = QuestionFramework | QuestionListCategory;

type Props = Readonly<{
  category: CategoryValue;
  count: number;
  description: string;
  logo?: ReactNode;
  title: string;
  titleAddOnText?: string;
}>;

const items: ReadonlyArray<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  value: CategoryValue;
}> = [
  {
    href: '/questions/js',
    icon: RiJavascriptFill,
    label: 'JavaScript',
    value: 'js',
  },
  {
    href: '/questions/html',
    icon: RiHtml5Fill,
    label: 'HTML',
    value: 'html',
  },
  {
    href: '/questions/css',
    icon: RiCss3Fill,
    label: 'CSS',
    value: 'css',
  },
  {
    href: '/questions/react',
    icon: RiReactjsLine,
    label: 'React',
    value: 'react',
  },
  {
    href: '/questions/angular',
    icon: RiAngularjsFill,
    label: 'Angular',
    value: 'angular',
  },
  {
    href: '/questions/vue',
    icon: RiVuejsLine,
    label: 'Vue',
    value: 'vue',
  },
  {
    href: '/questions/svelte',
    icon: SvelteLogo,
    label: 'Svelte',
    value: 'svelte',
  },
];

export default function QuestionCategoryTitleSection({
  count,
  category,
  description,
  logo,
  title,
  titleAddOnText,
}: Props) {
  const intl = useIntl();

  // TODO(interviews): this is not the updated category title implement
  // it was just to remove the tabs and heading for working with category tabs
  if (INTERVIEWS_REVAMP_2024) {
    return (
      <Section>
        <div className="flex gap-6">
          {logo}
          <TextPairing
            description={description}
            title={title}
            titleAddOnText={titleAddOnText}
          />
        </div>
      </Section>
    );
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Practice by Framework"
              description="Questions list page title"
              id="7npEXn"
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
          size="sm"
          tabs={items}
          value={category}
        />
      </div>
      <Section>
        <div className="flex gap-6">
          {logo}
          <TextPairing
            description={description}
            title={title}
            titleAddOnText={titleAddOnText}
          />
        </div>
      </Section>
    </div>
  );
}
