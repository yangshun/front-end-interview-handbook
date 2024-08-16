import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized_Hover,
  themeBorderEmphasizeColor,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import InterviewsGuideProgress from './InterviewsGuideProgress';

type Props = Readonly<{
  className?: string;
}>;

// TODO(interviews): remove mock data
const data = [
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
];

export default function InterviewGuideList({ className }: Props) {
  return (
    <ol className={clsx('flex flex-col gap-2', className)}>
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
    </ol>
  );
}
