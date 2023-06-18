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
import CardContainer from '~/components/ui/Card/CardContainer';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeLineBackgroundColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
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

const MAX_SHOWN = 4;

export default function QuestionFocusAreasSection({
  title: sectionTitle,
  description: sectionDescription,
  focusAreas,
}: Props) {
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <Heading level="heading5">{sectionTitle}</Heading>
          <Tooltip label={sectionDescription}>
            <RiQuestionFill className="h-5 w-5 text-neutral-300 dark:text-neutral-700" />
          </Tooltip>
        </div>
        {focusAreas.length > MAX_SHOWN && (
          <Button
            className="-mr-5 -mt-2 translate-y-2"
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
        )}
      </div>
      <CardContainer className="@4xl:grid-cols-4 grid grid-cols-2 grid-rows-1 gap-6">
        {focusAreas.map(({ title, icon: Icon, description }, index) => (
          <Card
            key={title}
            className={clsx(
              'group/card flex flex-col items-start gap-3',
              !showAll && index >= MAX_SHOWN && '@md:hidden',
            )}>
            <div className="flex justify-between self-stretch">
              <span
                className={clsx(
                  'inline-flex h-10 w-10 items-center justify-center rounded-md',
                  themeLineBackgroundColor,
                  themeTextSecondaryColor,
                  'border border-transparent transition',
                  'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
                  'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
                )}>
                <Icon aria-hidden={true} className="h-6 w-6" />
              </span>
              <Tooltip label={description}>
                <RiQuestionFill className="h-5 w-5 text-neutral-300 dark:text-neutral-700" />
              </Tooltip>
            </div>
            <Text
              className="w-full truncate"
              color="label"
              display="block"
              weight="medium">
              {title}
            </Text>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
}
