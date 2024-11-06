'use client';

import clsx from 'clsx';

import { useQuestionFormatsData } from '~/data/QuestionFormats';

import Anchor from '~/components/ui/Anchor';
import { textVariants } from '~/components/ui/Text';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  params: Readonly<{
    format: string;
    locale: string;
  }>;
}>;

export default function QuestionsFormatSubnav({ params }: Props) {
  const { format } = params;
  const formats = useQuestionFormatsData();
  const { pathname } = useI18nPathname();

  if (!format) {
    return null;
  }

  return (
    <div
      className={clsx(
        'relative flex h-[52px] items-center gap-6 px-6 lg:justify-end',
        'w-full',
        'overflow-x-auto',
      )}>
      <div
        className={clsx(
          'max-lg:hidden',
          'absolute -right-0 top-0 h-px w-1/2',
          'bg-gradient-to-r from-transparent to-neutral-800',
        )}
      />
      {[
        formats.javascript,
        formats['user-interface'],
        formats.algo,
        formats.quiz,
        formats['system-design'],
      ].map(({ href, label, value, icon: Icon }) => {
        const isActive = href === pathname;

        return (
          <Anchor
            key={value}
            className={clsx(
              'inline-flex gap-2 whitespace-nowrap',
              textVariants({
                color: isActive ? 'default' : 'secondary',
                size: 'body2',
                weight: isActive ? 'medium' : 'normal',
              }),
            )}
            href={href}
            variant="unstyled">
            <Icon aria-hidden={true} className="size-5 shrink-0" />
            {label}
          </Anchor>
        );
      })}
    </div>
  );
}
