import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpSLine,
  RiBookOpenLine,
} from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import GuidesListItemProgressChip from '~/components/guides/cover/GuidesListItemProgressChip';
import useGuidesActions from '~/components/guides/hooks/useGuidesActions';
import type {
  GuideCardMetadata,
  GuideCardMetadataWithCompletedStatus,
} from '~/components/guides/types';
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

import { useUser } from '@supabase/auth-helpers-react';

type GuidesListProps = Readonly<{
  className: string;
  data: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
  onMarkAsCompleted: (guide: GuideCardMetadata) => void;
  onMarkAsNotCompleted: (guide: GuideCardMetadata) => void;
}>;

function InterviewGuideList({
  className,
  data,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
}: GuidesListProps) {
  return (
    <ul className={clsx('isolate flex flex-col gap-2', className)}>
      {data.map((guide) => {
        const { title, description, isCompleted, href } = guide;

        return (
          <li
            key={title}
            className={clsx(
              'group relative isolate',
              'flex items-center gap-4',
              'p-4',
              'rounded-lg',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              ['border', themeBorderEmphasizeColor],
              themeBackgroundEmphasized_Hover,
            )}>
            <GuidesListItemProgressChip
              className="z-[1]"
              guide={guide}
              hasCompleted={isCompleted}
              size="sm"
              onMarkAsCompleted={onMarkAsCompleted}
              onMarkAsNotCompleted={onMarkAsNotCompleted}
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
                {description}
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
        );
      })}
    </ul>
  );
}

type Props = Readonly<{
  data: {
    description: string;
    items: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
    title: string;
  };
}>;

export default function InterviewsGuideCard({ data }: Props) {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const user = useUser();
  const { signInUpHref } = useAuthSignInUp();
  const { addQueryParamToPath, markGuideAsCompleted, markGuideAsNotCompleted } =
    useGuidesActions();

  const DropdownIcon = isOpen ? RiArrowUpSLine : RiArrowDownSLine;

  const { title, description, items } = data;
  const completionCount = items.filter((guide) => guide.isCompleted).length;
  const totalCount = items.length;
  const isGuideCompleted = totalCount === completionCount;

  const hasMultipleGuides = items.length > 1;

  const cardTitle = hasMultipleGuides ? title : items[0].title;
  const cardDescription = hasMultipleGuides
    ? description
    : items[0].description;

  if (items.length === 0) {
    return null;
  }

  function onMarkGuideAsCompleted(guide: GuideCardMetadata) {
    if (user === null) {
      router.push(
        signInUpHref({
          next: addQueryParamToPath(pathname || '', {
            book: guide.book,
            slug: guide.slug,
            title: guide.title,
          }),
        }),
      );
    } else {
      markGuideAsCompleted(guide);
    }
  }

  return (
    <div className="relative">
      <div
        className={clsx(
          'relative isolate overflow-hidden rounded-lg',
          hasMultipleGuides && !isOpen && 'cursor-pointer',
          !hasMultipleGuides && [
            'group',
            'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
          ],
          themeBackgroundColor,
          themeGlassyBorder,
          !isOpen && [
            'hover:bg-white dark:hover:bg-neutral-950',
            'transition-[background-color]',
          ],
        )}
        onClick={() => {
          if (!hasMultipleGuides || isOpen) {
            return;
          }
          setIsOpen(!isOpen);
        }}>
        {/* Radial glow */}
        <div className="theme-bg-radial-glow absolute inset-0 before:h-[136px] before:opacity-20 dark:-top-10" />
        <div className={clsx('flex flex-col gap-6', 'px-6 py-4')}>
          <div className={clsx('flex items-center gap-x-6')}>
            {hasMultipleGuides ? (
              <GuidesListItemProgressChip
                className="z-[1]"
                guide={data.items[0]}
                hasCompleted={isGuideCompleted}
              />
            ) : (
              <GuidesListItemProgressChip
                className="z-[1]"
                guide={data.items[0]}
                hasCompleted={data.items[0].isCompleted}
                onMarkAsCompleted={onMarkGuideAsCompleted}
                onMarkAsNotCompleted={markGuideAsNotCompleted}
              />
            )}
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Text size="body2" weight="bold">
                  {cardTitle}
                </Text>
                <Text color="secondary" size="body2">
                  {cardDescription}
                </Text>
              </div>
              {/* Guides metadata */}
              {hasMultipleGuides && (
                <div className="flex items-center gap-1.5">
                  <RiBookOpenLine
                    className={clsx('size-5 shrink-0', themeTextSubtleColor)}
                  />
                  <Text color="secondary" size="body3">
                    <FormattedMessage
                      defaultMessage="<bold>{completionCount}</bold>/{totalCount} guides"
                      description="Label for completed guides"
                      id="TeK1xE"
                      values={{
                        bold: (chunks) => (
                          <Text size="body2" weight="bold">
                            {chunks}
                          </Text>
                        ),
                        completionCount,
                        totalCount,
                      }}
                    />
                  </Text>
                </div>
              )}
            </div>
            {hasMultipleGuides ? (
              <Button
                className={themeTextSubtleColor}
                icon={DropdownIcon}
                iconClassName="!size-6"
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
                tooltip={
                  isOpen
                    ? undefined
                    : intl.formatMessage({
                        defaultMessage: 'Expand to view all guides',
                        description: 'Tooltip for expanded guide button',
                        id: 'EDnI5H',
                      })
                }
                variant="tertiary"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            ) : (
              <RiArrowRightLine
                className={clsx(
                  'size-6 transition-colors',
                  themeTextSubtleColor,
                  themeTextBrandColor_GroupHover,
                )}
              />
            )}
          </div>
          {isOpen && (
            <InterviewGuideList
              className="pl-14"
              data={data.items}
              onMarkAsCompleted={onMarkGuideAsCompleted}
              onMarkAsNotCompleted={markGuideAsNotCompleted}
            />
          )}
          {!hasMultipleGuides && (
            <Anchor className="absolute inset-0" href={items[0].href} />
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
