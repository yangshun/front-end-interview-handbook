import clsx from 'clsx';
import type { ReactNode } from 'react';

import TextPairing from '~/components/common/TextPairing';
import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import ReactLogo from '~/components/icons/ReactLogo';
import Anchor from '~/components/ui/Anchor';

import AuthorsCardSection from './AuthorsCardsSection';
import type { QuestionListCategory } from './types';

type CategoryValue = QuestionListCategory | 'react';

type Props = Readonly<{
  category: CategoryValue;
  description: string;
  logo?: ReactNode;
  title: string;
}>;

const items: ReadonlyArray<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  value: CategoryValue;
}> = [
  {
    icon: JavaScriptLogo,
    label: 'JavaScript',
    value: 'js',
  },
  {
    icon: HTML5Logo,
    label: 'HTML',
    value: 'html',
  },
  {
    icon: CSS3Logo,
    label: 'CSS',
    value: 'css',
  },
  {
    icon: ReactLogo,
    label: 'React',
    value: 'react',
  },
];

export default function QuestionCategoryTitleSection({
  category,
  description,
  logo,
  title,
}: Props) {
  return (
    <div className="grid gap-6 xl:grid-cols-8">
      <div className="flex flex-col gap-y-8 xl:col-span-4">
        <div className="relative flex flex-wrap gap-3">
          {items.map(({ icon: Icon, label, value }) => (
            <Anchor
              key={value}
              className={clsx(
                'group flex items-center gap-x-2 rounded-full border border-slate-200 px-8 py-2 text-xs font-medium sm:text-sm',
                value === category ? 'bg-brand-100' : 'hover:bg-slate-50',
              )}
              href={`/questions/${value}`}
              variant="unstyled">
              <Icon
                className={clsx(
                  'h-4 w-4',
                  value !== category &&
                    'opacity-50 grayscale transition-colors group-hover:opacity-100 group-hover:grayscale-0',
                )}
              />{' '}
              {label}
            </Anchor>
          ))}
        </div>
        <div className="flex gap-6">
          {logo}
          <TextPairing description={description} size="lg" title={title} />
        </div>
      </div>
      <div className="flex items-end xl:col-span-3 xl:col-start-6">
        <AuthorsCardSection />
      </div>
    </div>
  );
}
