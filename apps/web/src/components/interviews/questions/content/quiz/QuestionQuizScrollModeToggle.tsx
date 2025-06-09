import { useEffect, useState } from 'react';
import { RiPagesLine, RiTerminalWindowLine } from 'react-icons/ri';
import url from 'url';
import { useMediaQuery } from 'usehooks-ts';

import {
  QuestionFrameworkRawToSEOMapping,
  QuestionLanguageRawToSEOMapping,
} from '~/data/QuestionCategories';

import type {
  QuestionFramework,
  QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

type Props = Readonly<{
  isScrollModeValue: boolean;
  slug: string;
}>;

export default function QuestionQuizScrollModeToggle({
  isScrollModeValue,
  slug,
}: Props) {
  const intl = useIntl();
  const [isScrollMode, setIsScrollMode] = useState(isScrollModeValue);
  const [questionHref, setQuestionHref] = useState({
    pageByPage: '#',
    scroll: '#',
  });
  const [renderToggleButton, setRenderToggleButton] = useState(false);
  const isSmallTablet = useMediaQuery(
    '(min-width: 641px) and (max-width: 768px)',
  );
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    function getPageURL() {
      if (typeof window === 'undefined') {
        return '#';
      }

      const urlObject = new URL(window.location.href);

      const language = urlObject.searchParams.get(
        'language',
      ) as QuestionLanguage;
      const framework = urlObject.searchParams.get(
        'framework',
      ) as QuestionFramework;

      // Becasue quiz scroll mode is only supported for languages and frameworks
      // Also don't show when the language is ts
      setRenderToggleButton(
        (language !== null && language !== 'ts') || framework !== null,
      );
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

      if (isScrollModeValue) {
        setQuestionHref({
          pageByPage: newURL,
          scroll: window.location.href,
        });
      } else {
        setQuestionHref({
          pageByPage: window.location.href,
          scroll: newURL,
        });
      }
    }
    getPageURL();
  }, [slug, isScrollModeValue]);

  const options = [
    {
      href: questionHref.scroll,
      icon: RiPagesLine,
      isSelected: isScrollMode,
      label: intl.formatMessage({
        defaultMessage: 'Scrolling view',
        description: 'Label for quiz scroll mode toggle button',
        id: '/mpSVj',
      }),
      value: 'scroll',
    },
    {
      href: questionHref.pageByPage,
      icon: RiTerminalWindowLine,
      isSelected: !isScrollMode,
      label: intl.formatMessage({
        defaultMessage: 'Page-by-page',
        description: 'Label for quiz scroll mode toggle button',
        id: 'rCqW54',
      }),
      value: 'page-by-page',
    },
  ];
  const selectedOption = options.filter((item) => item.isSelected)[0];

  if (!renderToggleButton) {
    return null;
  }

  return (
    <DropdownMenu
      align="end"
      icon={isSmallTablet ? undefined : selectedOption.icon}
      isLabelHidden={isMobile}
      label={selectedOption.label}
      showChevron={true}
      size="xs"
      tooltip={
        isScrollMode
          ? intl.formatMessage({
              defaultMessage: 'All questions appear on a single page',
              description: 'Tooltip for quiz scroll mode toggle button',
              id: 'jjdVOP',
            })
          : intl.formatMessage({
              defaultMessage: 'Questions appear on different pages',
              description: 'Tooltip for quiz scroll mode toggle button',
              id: 'THbGFn',
            })
      }>
      {options.map(({ href, icon, isSelected, label, value }) => (
        <DropdownMenu.Item
          key={value}
          href={href}
          icon={icon}
          isSelected={isSelected}
          label={label}
          onClick={() => setIsScrollMode(value === 'scroll')}
        />
      ))}
    </DropdownMenu>
  );
}
