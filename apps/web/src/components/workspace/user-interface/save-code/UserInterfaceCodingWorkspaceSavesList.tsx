'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';
import UserInterfaceCodingWorkspaceSaveMetadata from '~/components/workspace/user-interface/save-code/UserInterfaceCodingWorkspaceSaveMetadata';
import UserInterfaceCodingWorkspaceSavesListItemActions from '~/components/workspace/user-interface/save-code/UserInterfaceCodingWorkspaceSavesListItemActions';
import { useUserInterfaceCodingWorkspaceSelector } from '~/components/workspace/user-interface/store/hooks';

type Props = Readonly<{
  metadata: QuestionMetadata;
  openSavedCode: (id: string, name: string) => void;
}>;

export default function UserInterfaceCodingWorkspaceSavesList({
  metadata,
  openSavedCode,
}: Props) {
  const user = useUser();

  if (user == null) {
    return <SavedCodeSignInState />;
  }

  return (
    <UserInterfaceCodingWorkspaceSavesListImpl
      metadata={metadata}
      openSavedCode={openSavedCode}
    />
  );
}

function UserInterfaceCodingWorkspaceSavesListImpl({
  metadata,
  openSavedCode,
}: Props) {
  const intl = useIntl();
  const { data: saves } = trpc.questionSave.userInterfaceGetAll.useQuery({
    slug: metadata.slug,
  });
  const currentOpenedSolution = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );

  return (
    <div className="w-full">
      {saves == null || saves?.length === 0 ? (
        <div
          className={clsx(
            'mx-auto max-w-sm',
            'flex h-full flex-col p-4',
            'flex grow items-center justify-center',
          )}>
          <EmptyState
            subtitle={intl.formatMessage(
              {
                defaultMessage:
                  'Solve the question and click <b>"Save to cloud"</b> to store your code. Your saved code for this question will appear here.',
                description: 'No saved code yet in coding workspace',
                id: 'ZdJ2fl',
              },
              {
                b: (chunks: React.ReactNode) => (
                  <Text size="inherit" weight="bold">
                    {chunks}
                  </Text>
                ),
              },
            )}
            title={intl.formatMessage({
              defaultMessage: 'No saved code yet',
              description: 'No saved code yet in coding workspace',
              id: 'YlKe4g',
            })}
            variant="empty"
          />
        </div>
      ) : (
        <ScrollArea>
          <div
            className={clsx(
              'flex flex-col rounded-md',
              ['divide-y', themeDivideColor],
              ['border-b', themeBorderColor],
              'overflow-hidden',
            )}>
            {saves?.map((savedItem) => {
              return (
                <div
                  key={savedItem.id}
                  className={clsx(
                    'relative isolate',
                    'flex items-center justify-between',
                    'px-4 py-3',
                    themeBackgroundElementEmphasizedStateColor_Hover,
                  )}>
                  <button
                    className="absolute inset-0"
                    type="button"
                    onClick={() => openSavedCode(savedItem.id, savedItem.name)}
                  />
                  <UserInterfaceCodingWorkspaceSaveMetadata
                    createdAt={savedItem.updatedAt}
                    framework={savedItem.framework}
                    isActive={currentOpenedSolution?.attemptId === savedItem.id}
                    name={savedItem.name}
                  />
                  <div className="relative">
                    <UserInterfaceCodingWorkspaceSavesListItemActions
                      saveId={savedItem.id}
                      saveName={savedItem.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

function SavedCodeSignInState() {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <div
      className={clsx(
        'mx-auto size-full max-w-xs p-4',
        'flex grow items-center justify-center',
      )}>
      <EmptyState
        action={
          <div className="flex justify-center gap-x-3">
            <Button
              href={signInUpHref()}
              label={intl.formatMessage({
                defaultMessage: 'Sign in',
                description: 'Sign in button label',
                id: 'xrhUzU',
              })}
              size="xs"
              variant="secondary"
            />
            <Button
              href={signInUpHref()}
              label={intl.formatMessage({
                defaultMessage: 'Create an account',
                description: 'Create account button label',
                id: 'Rhdhem',
              })}
              size="xs"
              variant="primary"
            />
          </div>
        }
        title={intl.formatMessage({
          defaultMessage: 'You must be signed in to view your saved versions',
          description: 'Sign in to view saved versions in coding workspace',
          id: 'lXY6ap',
        })}
        variant="empty"
      />
    </div>
  );
}
