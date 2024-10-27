import clsx from 'clsx';
import { RiArrowRightLine, RiQuestionFill } from 'react-icons/ri';

import type { FocusArea_DEPRECATED } from '~/data/focus-areas/FocusAreas';
import { getFocusAreaTheme_DEPRECATED } from '~/data/focus-areas/FocusAreas';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeIconColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

import QuestionCountLabel from '../questions/metadata/QuestionCountLabel';

type Props = Readonly<{
  description: string;
  focusAreas: ReadonlyArray<FocusArea_DEPRECATED>;
  title: string;
}>;

const MAX_SHOWN = 4;

export default function InterviewsDashboardFocusAreasSection({
  description: sectionDescription,
  title: sectionTitle,
  focusAreas: allFocusAreas,
}: Props) {
  const intl = useIntl();
  const focusAreas = allFocusAreas.slice(0, MAX_SHOWN);

  return (
    <div className="@container flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <Heading level="heading6">{sectionTitle}</Heading>
          <Tooltip label={sectionDescription}>
            <RiQuestionFill className={clsx('size-6', themeIconColor)} />
          </Tooltip>
        </div>
        {allFocusAreas.length > MAX_SHOWN && (
          <Button
            className="-mr-5 -mt-2 translate-y-2"
            href="/focus-areas"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'See all',
              description: 'Link to all focus areas page',
              id: 'MJyQhr',
            })}
            size="md"
            variant="tertiary"
          />
        )}
      </div>
      <CardContainer className="@4xl:grid-cols-4 @md:grid-cols-2 grid grid-cols-1 grid-rows-1 gap-3 md:gap-4 lg:gap-6">
        {focusAreas.map(({ href, name, type, shortDescription, questions }) => {
          const Icon = getFocusAreaTheme_DEPRECATED(type).iconSolid;

          return (
            <Anchor key={type} href={href} variant="unstyled">
              <Card
                className="group/card relative isolate flex flex-col items-start gap-3 p-4"
                padding={false}>
                <div className="flex justify-between self-stretch">
                  <span
                    className={clsx(
                      'size-10 inline-flex items-center justify-center rounded-md',
                      themeBackgroundChipColor,
                      themeTextSecondaryColor,
                      'border border-transparent transition',
                      'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
                      'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
                    )}>
                    <Icon aria-hidden={true} className="size-6" />
                  </span>
                  <Tooltip
                    invert={true}
                    label={
                      <div className="flex flex-col gap-y-1.5 font-medium">
                        {shortDescription}
                        <Divider />
                        <QuestionCountLabel
                          count={countNumberOfQuestionsInList(questions)}
                          showIcon={true}
                        />
                      </div>
                    }>
                    <RiQuestionFill
                      className={clsx('size-6', themeIconColor)}
                    />
                  </Tooltip>
                </div>
                <Text
                  className="display w-full truncate"
                  color="label"
                  size="body1"
                  weight="medium">
                  {name}
                </Text>
              </Card>
            </Anchor>
          );
        })}
      </CardContainer>
    </div>
  );
}
