import type { ComponentType } from 'react';
import { useState } from 'react';
import {
  RiArrowGoBackLine,
  RiMore2Fill,
  RiSettings4Line,
} from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';

import QuestionBookmarkAction from '~/components/interviews/questions/common/QuestionBookmarkAction';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { useCodingWorkspaceUnsavedSolutionContext } from './CodingWorkspaceUnsavedSolutionContext';
import {
  useCodingWorkspaceDispatch,
  useCodingWorkspaceSelector,
} from './store/hooks';
import { updateCurrentOpenedSolution } from './store/solution-slice';

type SettingsDropdownMenuProps = Readonly<{
  device?: 'desktop' | 'mobile' | 'tablet';
  layoutDialogComponent: ComponentType<{
    isOpen: boolean;
    onClose: () => void;
  }>;
  metadata: Pick<QuestionMetadata, 'format' | 'slug'>;
  resetToDefaultCode: () => void;
}>;

export function CodingWorkspaceBottomBarSettingsDropdownMenu({
  device,
  layoutDialogComponent: LayoutDialogComponent,
  metadata,
  resetToDefaultCode,
}: SettingsDropdownMenuProps) {
  const intl = useIntl();
  const { setUnsavedChangesDialog } =
    useCodingWorkspaceUnsavedSolutionContext();
  const workspaceDispatch = useCodingWorkspaceDispatch();
  const hasUnsavedSolutionChanges = useCodingWorkspaceSelector(
    (state) => state.solution.hasUnsavedSolutionChanges,
  );
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);
  const isDesktop = device === 'desktop';

  function resetCodeAndClearSolution() {
    resetToDefaultCode();
    workspaceDispatch(updateCurrentOpenedSolution(null));
  }

  function handleResetDefaultCode() {
    if (!hasUnsavedSolutionChanges) {
      resetCodeAndClearSolution();

      return;
    }

    setUnsavedChangesDialog({
      onAction: () => {
        resetCodeAndClearSolution();
        setUnsavedChangesDialog({
          show: false,
        });
      },
      show: true,
    });
  }

  const options = [
    ...(device === 'desktop'
      ? [
          {
            icon: VscLayout,
            label: intl.formatMessage({
              defaultMessage: 'Layout',
              description: 'Coding workspace layout',
              id: 'yMnCy6',
            }),
            onClick: () => setIsLayoutDialogOpen(true),
            value: 'layout',
          },
        ]
      : []),
    {
      icon: RiArrowGoBackLine,
      label: intl.formatMessage({
        defaultMessage: 'Reset question code to default',
        description: 'Coding workspace reset question',
        id: 'gU1jUE',
      }),
      onClick: () => {
        if (
          confirm(
            intl.formatMessage({
              defaultMessage: 'Reset all changes made to this question?',
              description: 'Coding workspace reset question confirmation',
              id: '2eBsGO',
            }),
          )
        ) {
          handleResetDefaultCode();
        }
      },
      value: 'reset',
    },
  ];

  return (
    <>
      <DropdownMenu
        icon={isDesktop ? RiSettings4Line : RiMore2Fill}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Settings',
          description: 'Coding workspace settings dropdown label',
          id: '/p5g3I',
        })}
        showChevron={false}
        side="top"
        size="xs"
        tooltip={intl.formatMessage({
          defaultMessage: 'Settings',
          description: 'Coding workspace settings dropdown label',
          id: '/p5g3I',
        })}
        variant={isDesktop ? 'secondary' : 'tertiary'}>
        <>
          <QuestionBookmarkAction metadata={metadata} variant="dropdown-item" />
          {options.map(({ icon, label, onClick, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
              label={label}
              onClick={onClick}
            />
          ))}
        </>
      </DropdownMenu>

      <LayoutDialogComponent
        isOpen={isLayoutDialogOpen}
        onClose={() => setIsLayoutDialogOpen(false)}
      />
    </>
  );
}
