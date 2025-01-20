import clsx from 'clsx';
import { title } from 'process';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import {
  themeBackgroundElementColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderColor,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import useQuestionsQuizSidebarExpanded from './useQuestionsQuizSidebarExpanded';

export default function QuestionsQuizSidebarCollapser() {
  const intl = useIntl();
  const [questionsQuizSidebarExpanded, setQuestionsQuizSidebarExpanded] =
    useQuestionsQuizSidebarExpanded();

  const label = questionsQuizSidebarExpanded
    ? intl.formatMessage({
        defaultMessage: 'Collapse questions list',
        description: 'Collapse sidebar containing questions list',
        id: '2u88E/',
      })
    : intl.formatMessage({
        defaultMessage: 'Show questions list',
        description: 'Show sidebar containing questions list',
        id: 'TbN6Yv',
      });

  return (
    <Tooltip asChild={true} label={label} side="top">
      <button
        className={clsx(
          'hidden items-center justify-center p-1 xl:flex',
          'absolute top-[80px] -ml-px h-10 translate-x-full',
          questionsQuizSidebarExpanded ? 'right-px' : 'right-0',
          themeTextSecondaryColor,
          themeBackgroundElementColor,
          themeBackgroundElementEmphasizedStateColor_Hover,
          themeBackgroundElementPressedStateColor_Active,
          'rounded-r-lg',
          ['border-y border-r', themeBorderColor],
          themeOutlineElementBrandColor_FocusVisible,
        )}
        title={title}
        type="button"
        onClick={() =>
          setQuestionsQuizSidebarExpanded(!questionsQuizSidebarExpanded)
        }>
        {questionsQuizSidebarExpanded ? (
          <RiArrowLeftSLine className="size-4" />
        ) : (
          <RiArrowRightSLine className="size-4" />
        )}
      </button>
    </Tooltip>
  );
}
