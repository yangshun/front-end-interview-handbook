import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiQuestionFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeLineBackgroundColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type CardProps = Readonly<{
  description: string;
  durationMins: number;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  questionCount: number;
  title: string;
}>;

type Props = Readonly<{
  description: string;
  focusAreas: ReadonlyArray<CardProps>;
  title: string;
}>;

export default function QuestionFocusAreasSection({
  title: sectionTitle,
  description: sectionDescription,
  focusAreas,
}: Props) {
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="@container grid gap-6">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <Heading level="heading5">{sectionTitle}</Heading>
          <Tooltip label={sectionDescription}>
            <RiQuestionFill className="h-5 w-5 text-neutral-300 dark:text-neutral-700" />
          </Tooltip>
        </div>
        <Button
          className="-mr-5"
          icon={showAll ? RiArrowUpSLine : RiArrowDownSLine}
          label={
            showAll
              ? intl.formatMessage({
                  defaultMessage: 'Show less',
                  description:
                    'Show less button label of focus areas section in preparation dashboard',
                  id: 'ipPZZl',
                })
              : intl.formatMessage({
                  defaultMessage: 'Show all',
                  description:
                    'Show all button label of focus areas section in preparation dashboard',
                  id: 'ahcJju',
                })
          }
          size="md"
          variant="tertiary"
          onClick={() => {
            setShowAll(!showAll);
          }}
        />
      </div>
      <div className="@xl:grid-cols-3 @md:grid-cols-2 grid grid-cols-1 grid-rows-1 gap-6">
        {focusAreas.map(({ title, icon: Icon, description }, index) => (
          <Card
            key={title}
            className={clsx(
              'group flex flex-col items-start gap-3',
              !showAll && index >= 2 && '@md:hidden @xl:flex',
              !showAll && index >= 3 && '@xl:hidden',
            )}>
            <div className="flex justify-between self-stretch">
              <span
                className={clsx(
                  'inline-flex h-10 w-10 items-center justify-center rounded-md',
                  themeLineBackgroundColor,
                  'text-neutral-400',
                  'border border-transparent transition',
                  'group-hover:border-brand-dark group-hover:text-brand-dark',
                  'dark:group-hover:border-brand dark:group-hover:text-brand',
                )}>
                <Icon aria-hidden={true} className="h-6 w-6" />
              </span>
              <Tooltip label={description}>
                <RiQuestionFill className="h-5 w-5 text-neutral-300 dark:text-neutral-700" />
              </Tooltip>
            </div>
            <Text color="label" weight="medium">
              {title}
            </Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
