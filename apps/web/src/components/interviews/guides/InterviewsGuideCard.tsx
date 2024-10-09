import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpSLine,
  RiBookOpenLine,
} from 'react-icons/ri';

import InterviewsRibbonBadge from '~/components/interviews/common/InterviewsRibbonBadge';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundEmphasized_Hover,
  themeBorderEmphasizeColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import InterviewsGuideProgress from './InterviewsGuideProgress';

type GuidesListProps = Readonly<{
  className: string;
  data: ReadonlyArray<{
    completed: boolean;
    excerpt: string;
    href: string;
    title: string;
  }>;
}>;

function InterviewGuideList({ className, data }: GuidesListProps) {
  return (
    <ul className={clsx('flex flex-col gap-2', className)}>
      {data.map(({ title, excerpt, completed, href }) => (
        <li
          key={title}
          className={clsx(
            'group relative isolate',
            'flex items-center gap-4',
            'p-4',
            'rounded-lg',
            ['border', themeBorderEmphasizeColor],
            themeBackgroundEmphasized_Hover,
          )}>
          <InterviewsGuideProgress
            className="z-[1]"
            completed={completed}
            size="sm"
          />

          <div className="flex flex-1 flex-col gap-1.5">
            <Anchor
              className="focus:outline-none"
              href={href}
              variant="unstyled">
              {/* Extend touch target to entire panel */}
              <span aria-hidden="true" className="absolute inset-0" />
              <Text size="body2" weight="medium">
                {title}
              </Text>
            </Anchor>
            <Text color="secondary" size="body3">
              {excerpt}
            </Text>
          </div>

          <RiArrowRightLine
            aria-hidden="true"
            className={clsx(
              'size-5 shrink-0',
              themeTextSubtleColor,
              themeTextBrandColor_GroupHover,
            )}
          />
        </li>
      ))}
    </ul>
  );
}

// TODO(interviews): Remove hard coded data
const data = {
  completedCount: 0,
  description:
    'The highest quality JavaScript interview questions and solutions you can find, curated by ex-FAANG interviewers.',
  guides: [
    {
      completed: false,
      excerpt: 'Answering fundamental of JavaScript and related.',
      href: '/',
      title: 'Foundation of JS',
    },
    {
      completed: false,
      excerpt: 'Answering fundamental of JavaScript and related.',
      href: '/',
      title: 'Object Oriented Programming',
    },
    {
      completed: false,
      excerpt: 'Answering fundamental of JavaScript and related.',
      href: '/',
      title: 'Array and Loop',
    },
    {
      completed: false,
      excerpt: 'Answering fundamental of JavaScript and related.',
      href: '/',
      title: 'Data Structure',
    },
  ],
  title: 'JavaScript Interview Questions Guide',
  totalCount: 4,
};

export default function InterviewsGuideCard() {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const DropdownIcon = isOpen ? RiArrowUpSLine : RiArrowDownSLine;

  const { title, description, totalCount, completedCount } = data;
  const isGuideCompleted = totalCount === completedCount;

  return (
    <div className="relative">
      <div
        className={clsx(
          'relative isolate overflow-hidden rounded-lg',
          themeBackgroundColor,
          themeGlassyBorder,
          !isOpen && [
            'hover:bg-white dark:hover:bg-neutral-950',
            'group-hover:bg-white dark:group-hover:bg-neutral-950',
            'transition-[background-color]',
          ],
        )}>
        {/* Radial glow */}
        <div className="theme-bg-radial-glow absolute inset-0 before:h-[136px] before:opacity-20 dark:-top-10" />

        <div className={clsx('flex flex-col gap-6', 'px-6 py-4')}>
          <div className={clsx('flex items-center gap-x-6')}>
            <InterviewsGuideProgress completed={isGuideCompleted} />

            <div className="flex flex-1 flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Text size="body2" weight="bold">
                  {title}
                </Text>
                <Text color="secondary" size="body2">
                  {description}
                </Text>
              </div>

              {/* Guides metadata */}
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

          {isOpen && (
            <InterviewGuideList className="pl-14" data={data.guides} />
          )}
        </div>
      </div>
      <InterviewsRibbonBadge
        label={intl.formatMessage({
          defaultMessage: 'GUIDES',
          description: 'Label for guides card ribbon',
          id: 'hH5/cP',
        })}
        variant="primary"
      />
    </div>
  );
}
