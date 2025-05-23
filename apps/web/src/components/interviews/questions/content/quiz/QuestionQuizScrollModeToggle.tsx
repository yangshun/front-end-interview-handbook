import * as Switch from '@radix-ui/react-switch';
import clsx from 'clsx';
import { useState } from 'react';
import url from 'url';

import {
  QuestionFrameworkRawToSEOMapping,
  QuestionLanguageRawToSEOMapping,
} from '~/data/QuestionCategories';

import type {
  QuestionFramework,
  QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import { useI18nRouter } from '~/next-i18nostic/src';

type Props = Readonly<{
  isScrollModeValue: boolean;
  slug: string;
}>;

export default function QuestionQuizScrollModeToggle({
  isScrollModeValue,
  slug,
}: Props) {
  const [isScrollMode, setIsScrollMode] = useState(isScrollModeValue);
  const router = useI18nRouter();

  function handleToggle() {
    const urlObject = new URL(window.location.href);

    const language = urlObject.searchParams.get('language') as QuestionLanguage;
    const framework = urlObject.searchParams.get(
      'framework',
    ) as QuestionFramework;

    if (isScrollModeValue) {
      urlObject.pathname = `/questions/quiz/${slug}`;
      urlObject.hash = '';
    } else {
      urlObject.hash = slug;
      if (framework) {
        urlObject.pathname = `/questions/quiz/${QuestionFrameworkRawToSEOMapping[framework as QuestionFramework]}`;
      } else {
        urlObject.pathname = `/questions/quiz/${QuestionLanguageRawToSEOMapping[language as QuestionLanguage]}`;
      }
    }

    const newURL = url.format({
      hash: urlObject.hash,
      pathname: urlObject.pathname,
      search: urlObject.search,
    });

    router.push(newURL);

    setIsScrollMode(!isScrollMode);
  }

  return (
    <div className="flex items-center gap-2">
      <Text size="body2">
        <FormattedMessage
          defaultMessage="Switch to page-by-page"
          description="Label for page-by-page toggle button"
          id="O0TX7L"
        />
      </Text>
      <Switch.Root
        checked={!isScrollMode}
        className={clsx(
          'h-4 w-8 shrink-0',
          'rounded-full',
          'transition-colors',
          [
            'border',
            !isScrollMode
              ? 'border-transparent'
              : 'border-neutral-700 dark:border-neutral-100',
          ],
          !isScrollMode && 'dark:bg-brand bg-neutral-900',
          themeOutlineElementBrandColor_FocusVisible,
        )}
        onCheckedChange={handleToggle}>
        <Switch.Thumb
          className={clsx(
            'block',
            'size-2 rounded-full',
            !isScrollMode
              ? themeBackgroundColor
              : 'bg-neutral-700 dark:bg-neutral-100',
            'translate-x-1 data-[state=checked]:translate-x-[18px]',
            'transition-transform duration-100 will-change-transform',
          )}
        />
      </Switch.Root>
    </div>
  );
}
