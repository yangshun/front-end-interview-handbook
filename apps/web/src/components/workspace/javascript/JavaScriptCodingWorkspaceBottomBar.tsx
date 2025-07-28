'use client';

import { useState } from 'react';
import { RiArrowGoBackLine, RiPlayLine, RiSettings2Line } from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';

import { useAuthActiveEngagementPoints } from '~/components/auth/auth-points';
import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import logEvent from '~/logging/logEvent';

import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import { useCodingWorkspaceContext } from '../common/CodingWorkspaceContext';
import CodingWorkspaceTimer from '../common/CodingWorkspaceTimer';
import JavaScriptCodingWorkspaceLayoutDialog from './JavaScriptCodingWorkspaceLayoutDialog';

type Props = Readonly<{
  layout: 'full' | 'minimal';
  metadata: QuestionMetadata;
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE: string;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspaceBottomBar({
  layout,
  metadata,
  slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const { resetToDefaultCode, runTests, status, submit } =
    useCodingWorkspaceContext();

  useAuthActiveEngagementPoints({
    entityId: metadata.slug,
    entityType: 'coding',
  });

  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);

  const rightPostElements = (
    <>
      <span className="hidden lg:inline">
        <Button
          addonPosition="start"
          icon={RiPlayLine}
          isDisabled={status !== 'idle'}
          label={intl.formatMessage({
            defaultMessage: 'Run',
            description: 'Run code button label',
            id: 'Yaff9b',
          })}
          size="xs"
          tooltip={intl.formatMessage({
            defaultMessage: 'Run test cases (customizable)',
            description: 'Coding workspace run test cases tooltip',
            id: 'AQTvh2',
          })}
          variant="secondary"
          onClick={() => {
            logEvent('question.run', {
              format: metadata.format,
              namespace: 'interviews',
              slug: metadata.slug,
            });
            runTests();
          }}
        />
      </span>
      <span className="hidden lg:inline">
        <Button
          addonPosition="start"
          isDisabled={status !== 'idle'}
          label={intl.formatMessage({
            defaultMessage: 'Submit',
            description: 'Coding workspace submit code button label',
            id: '6TjXww',
          })}
          size="xs"
          tooltip={intl.formatMessage({
            defaultMessage: 'Runs submission test cases and marks complete',
            description: 'Coding workspace run test cases tooltip',
            id: 'VYJBxW',
          })}
          variant="primary"
          onClick={() => {
            logEvent('question.submit', {
              format: metadata.format,
              namespace: 'interviews',
              slug: metadata.slug,
            });
            submit();
          }}
        />
      </span>
    </>
  );

  if (layout === 'minimal') {
    return (
      <div className="flex flex-wrap items-center justify-end gap-2 px-3 py-3">
        {rightPostElements}
      </div>
    );
  }

  const rightElements = (
    <>
      <span className="inline sm:hidden">
        <QuestionReportIssueButton
          entity="question"
          format={metadata.format}
          slug={metadata.slug}
        />
      </span>
      <div className="hidden lg:inline">
        <CodingWorkspaceTimer qnMetadata={metadata} />
      </div>
      <QuestionProgressAction metadata={metadata} studyListKey={studyListKey} />
      {rightPostElements}
    </>
  );

  return (
    <CodingWorkspaceBottomBar
      leftElements={
        layout === 'full' && (
          <div className="hidden items-center gap-x-2 sm:inline-flex">
            <QuestionReportIssueButton
              entity="question"
              format={metadata.format}
              slug={metadata.slug}
            />
            <DropdownMenu
              icon={RiSettings2Line}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Settings',
                description: 'Coding workspace settings dropdown label',
                id: '/p5g3I',
              })}
              showChevron={false}
              side="top"
              size="xs">
              {[
                {
                  icon: VscLayout,
                  label: intl.formatMessage({
                    defaultMessage: 'Layout',
                    description: 'Coding workspace layout',
                    id: 'yMnCy6',
                  }),
                  onClick: () => {
                    setIsLayoutDialogOpen(true);
                  },
                  value: 'layout',
                },
                {
                  icon: RiArrowGoBackLine,
                  label: intl.formatMessage({
                    defaultMessage: 'Reset question',
                    description: 'Coding workspace reset question',
                    id: 'ZeoQdS',
                  }),
                  onClick: () => {
                    if (
                      confirm(
                        intl.formatMessage({
                          defaultMessage:
                            'Reset all changes made to this question?',
                          description:
                            'Coding workspace reset question confirmation',
                          id: '2eBsGO',
                        }),
                      )
                    ) {
                      resetToDefaultCode();
                    }
                  },
                  value: 'reset',
                },
              ].map(({ icon, label, onClick, value }) => (
                <DropdownMenu.Item
                  key={value}
                  icon={icon}
                  label={label}
                  onClick={onClick}
                />
              ))}
            </DropdownMenu>
            <JavaScriptCodingWorkspaceLayoutDialog
              isOpen={isLayoutDialogOpen}
              onClose={() => {
                setIsLayoutDialogOpen(false);
              }}
            />
          </div>
        )
      }
      metadata={metadata}
      rightElements={rightElements}
      showQuestionsListButton={layout === 'full'}
      slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE={
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE
      }
      studyListKey={studyListKey}
    />
  );
}
