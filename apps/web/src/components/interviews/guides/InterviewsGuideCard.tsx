import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiBookOpenLine,
} from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderBrandColor,
  themeGlassyBorder,
  themeTextInvertColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import InterviewGuideList from './InterviewsGuideList';
import InterviewsGuideProgress from './InterviewsGuideProgress';

function CardStackCard({
  className,
  children,
  shadow,
}: {
  children?: React.ReactNode;
  className?: string;
  shadow?: boolean;
}) {
  return (
    <div className={clsx('size-full absolute top-0', className)}>
      <div
        className={clsx(
          'size-full relative overflow-clip rounded-lg border',
          'group-hover:bg-white dark:group-hover:bg-neutral-950',
          'transition-[background-color]',
          themeGlassyBorder,
          themeBackgroundColor,
        )}
        style={
          shadow
            ? {
                boxShadow: '0px 9px 8px -7px rgba(0, 0, 0, 0.3)',
              }
            : undefined
        }>
        {children}
      </div>
    </div>
  );
}

function CardStack({
  children,
  showStackCard,
}: {
  children: React.ReactNode;
  showStackCard: boolean;
}) {
  return (
    <div className={clsx('relative', showStackCard && 'group mb-8')}>
      {showStackCard && (
        <>
          <CardStackCard className={clsx('translate-y-8', 'px-4')} />
          <CardStackCard className={clsx('translate-y-4', 'px-2')} />
        </>
      )}
      {/* Front card */}
      <div
        style={
          showStackCard
            ? {
                boxShadow: '0px 9px 8px -7px rgba(0, 0, 0, 0.3)',
              }
            : undefined
        }>
        {children}
      </div>
    </div>
  );
}

function GuidesRibbon() {
  return (
    <span
      className="size-14 absolute -right-0.5 -top-0.5 overflow-hidden"
      style={{
        clipPath: 'polygon(50% 0, 100% 50%, 100% 100%, 0 100%, 0 0)',
      }}>
      <span
        className={clsx('absolute block', [
          themeBorderBrandColor,
          'border-[9999px] !border-b-transparent !border-l-transparent',
        ])}
      />
      <span
        className={clsx(
          'absolute left-1/2 top-1/2 -translate-x-[calc(50%-6px)] -translate-y-full rotate-45',
          'text-2xs font-medium uppercase',
          themeTextInvertColor,
        )}>
        Guides
      </span>
    </span>
  );
}

// TODO(interviews): Remove hard coded data
const data = {
  completedCount: 0,
  description:
    'The highest quality JavaScript interview questions and solutions you can find, curated by ex-FAANG interviewers.',
  tags: ['lodash', 'data structure'],
  title: 'JavaScript Interview Questions Guide',
  totalCount: 4,
};

export default function InterviewsGuideCard() {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const DropdownIcon = isOpen ? RiArrowUpSLine : RiArrowDownSLine;

  const { title, description, totalCount, completedCount, tags } = data;
  const isGuideCompleted = totalCount === completedCount;

  return (
    <CardStack showStackCard={!isOpen}>
      <Card
        className={clsx(
          !isOpen && [
            'hover:bg-white dark:hover:bg-neutral-950',
            'group-hover:bg-white dark:group-hover:bg-neutral-950',
            'transition-[background-color]',
          ],
        )}
        disableSpotlight={true}
        padding={false}>
        {/* Radial glow */}
        <div className="theme-bg-radial-glow absolute inset-0 -top-72 before:opacity-30" />

        <div className={clsx('flex flex-col gap-6', 'px-6 py-5')}>
          <div className={clsx('flex items-center gap-x-6')}>
            <InterviewsGuideProgress completed={isGuideCompleted} />

            <div className="flex flex-1 flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Text size="body1" weight="bold">
                  {title}
                </Text>
                <Text color="secondary" size="body2">
                  {description}
                </Text>
              </div>

              {/* Guides metadata */}
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <RiBookOpenLine
                    className={clsx('size-5 shrink-0', themeTextSubtleColor)}
                  />
                  <Text color="secondary" size="body3">
                    <FormattedMessage
                      defaultMessage="<bold>{completedCount}</bold>/{totalCount} guides"
                      description="Label for completed guides"
                      id="wRHDTn"
                      values={{
                        bold: (chunks) => (
                          <Text size="body2" weight="bold">
                            {chunks}
                          </Text>
                        ),
                        completedCount,
                        totalCount,
                      }}
                    />
                  </Text>
                </div>

                {tags.length > 0 && (
                  <div className="flex gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        label={`#${tag}`}
                        size="sm"
                        variant="neutral"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              className={themeTextSubtleColor}
              icon={DropdownIcon}
              isLabelHidden={true}
              label={
                isOpen
                  ? intl.formatMessage({
                      defaultMessage: 'View less',
                      description: 'Label of expanded guide button',
                      id: 'P0i492',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'View more',
                      description: 'Label of collapsed guide button',
                      id: 'fhfS0P',
                    })
              }
              size="sm"
              variant="tertiary"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>

          {isOpen && <InterviewGuideList className="pl-14" />}
        </div>

        <GuidesRibbon />
      </Card>
    </CardStack>
  );
}
