import clsx from 'clsx';
import { useRef } from 'react';
import {
  RiAngularjsFill,
  RiArrowRightLine,
  RiCss3Fill,
  RiHtml5Fill,
  RiJavascriptFill,
  RiReactjsLine,
  RiVuejsLine,
} from 'react-icons/ri';

import useIsSticky from '~/hooks/useIsSticky';

import SvelteLogo from '~/components/icons/SvelteLogo';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import QuestionsCategoryTabs from './QuestionsCategoryTabs';
import type { QuestionFramework } from '../common/QuestionsTypes';
import type { QuestionListCategory } from '../listings/types';

type CategoryValue = QuestionFramework | QuestionListCategory;

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

type Props = Readonly<{
  category: CategoryValue;
}>;

export default function QuestionsCategoryNavbar({ category }: Props) {
  const intl = useIntl();
  const categoryNavbarRef = useRef(null);
  const { isSticky } = useIsSticky(categoryNavbarRef);

  return (
    <div
      ref={categoryNavbarRef}
      className={clsx(
        'z-sticky sticky backdrop-blur',
        ['border-b', themeBorderColor],
        !isSticky && 'bg-white dark:bg-neutral-900/60',
        'transition-[background-color]',
      )}
      style={{
        top: 'calc(var(--global-sticky-height))',
      }}>
      <Container
        className={clsx(
          'flex flex-col gap-x-4 gap-y-6 lg:flex-row lg:justify-between',
          'gap-y-8 md:gap-y-10 2xl:gap-y-12',
          'py-5 lg:py-6',
        )}
        variant="normal">
        <QuestionsCategoryTabs
          label={intl.formatMessage({
            defaultMessage: 'Select question category',
            description: 'Tab label to select another question category',
            id: 'MOxuKN',
          })}
          tabs={items}
          value={category}
        />

        <Anchor
          className="flex items-center gap-1"
          href="/front-end-interview-guidebook">
          <Text color="inherit" size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="Follow our front end interview roadmap"
              description="Label for follow frontend interview roadmap"
              id="i8776d"
            />
          </Text>
          <RiArrowRightLine aria-hidden={true} className="size-4 shrink-0" />
        </Anchor>
      </Container>
    </div>
  );
}
