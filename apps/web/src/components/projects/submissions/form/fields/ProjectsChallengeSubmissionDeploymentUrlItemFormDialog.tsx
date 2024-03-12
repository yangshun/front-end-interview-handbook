import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import TextInput from '~/components/ui/TextInput';

import {
  getProjectsChallengeSubmissionDeploymentUrlsAttributes,
  useProjectsChallengeSubmissionDeploymentUrlItemSchema,
} from './ProjectsChallengeSubmissionDeploymentUrlsSchema';

import { zodResolver } from '@hookform/resolvers/zod';

export type DeploymentUrlDialogMode = 'add' | 'edit';

type DeploymentUrlItemData = Readonly<{
  href: string;
  label: string;
}>;

type Props = Readonly<{
  isShown: boolean;
  mode?: DeploymentUrlDialogMode;
  onClose: () => void;
  onSubmit: (value: DeploymentUrlItemData) => void;
  values: DeploymentUrlItemData;
}>;

export default function ProjectsChallengeSubmissionDeploymentUrlItemFormDialog({
  isShown,
  mode,
  onClose,
  values,
  onSubmit,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);
  const projectsChallengeSubmissionDeploymentUrlItemSchema =
    useProjectsChallengeSubmissionDeploymentUrlItemSchema();
  const formMethods = useForm<DeploymentUrlItemData>({
    mode: 'onTouched',
    resolver: zodResolver(projectsChallengeSubmissionDeploymentUrlItemSchema),
    values,
  });

  const { control, handleSubmit, formState, reset } = formMethods;

  useEffect(() => {
    reset();
  }, [mode, reset]);

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          label={
            mode === 'add'
              ? intl.formatMessage({
                  defaultMessage: 'Add',
                  description: 'Add a URL to a form',
                  id: 'mukCc2',
                })
              : intl.formatMessage({
                  defaultMessage: 'Update',
                  description: 'Update existing URL in a form',
                  id: 'Xlj7W5',
                })
          }
          size="md"
          type="submit"
          variant="primary"
        />
      }
      secondaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Cancel',
            description: 'Cancel button label',
            id: '0GT0SI',
          })}
          size="md"
          variant="secondary"
          onClick={onClose}
        />
      }
      title={intl.formatMessage({
        defaultMessage: 'Live site URL',
        description: 'Project submission URL',
        id: 'mRxkm4',
      })}
      wrapChildren={(children) => (
        <form
          onSubmit={(event) => {
            event.stopPropagation();
            handleSubmit(onSubmit)(event);
          }}>
          {children}
        </form>
      )}
      onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Controller
          control={control}
          name="label"
          render={({ field }) => (
            <TextInput
              autoFocus={true}
              errorMessage={formState.errors.label?.message}
              label="Page name"
              placeholder={attrs.namePlaceholder}
              required={true}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="href"
          render={({ field }) => (
            <TextInput
              errorMessage={formState.errors.href?.message}
              label="URL"
              placeholder={attrs.urlPlaceholder}
              type="url"
              {...field}
            />
          )}
        />
      </div>
    </Dialog>
  );
}
