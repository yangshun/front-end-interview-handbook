import clsx from 'clsx';
import { useId, useState } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { RiAddLine, RiCloseLine, RiPencilLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';
import ProjectsChallengeSubmitPageDeploymentDialog from '../ProjectsChallengeSubmitPageDeploymentDialog';
import ProjectsChallengeSubmissionDeploymentUrlItemFormDialog from './ProjectsChallengeSubmissionDeploymentUrlItemFormDialog';
import { getProjectsChallengeSubmissionDeploymentUrlsAttributes } from './ProjectsChallengeSubmissionDeploymentUrlsSchema';

type Props = Readonly<{
  challengeDefaultSpecPageLabels: Record<string, string>;
  challengeDefaultSpecPages: ReadonlyArray<string>;
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'deploymentUrls';

const MAXIMUM_URLS = 4;

export default function ProjectsChallengeSubmissionDeploymentUrlsField({
  challengeDefaultSpecPageLabels,
  challengeDefaultSpecPages,
  control,
}: Props) {
  const intl = useIntl();
  const messageId = useId();

  const [dialogMode, setDialogMode] = useState<
    Readonly<{ index: number; type: 'edit' } | null> | Readonly<{ type: 'add' }>
  >(null);

  const attrs = getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);
  // TODO(projects): show error state for empty form and check validation.
  const {
    field,
    formState: { dirtyFields, errors, submitCount },
  } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <div ref={field.ref} className="flex flex-col gap-y-4" tabIndex={-1}>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-y-2">
            <Label
              description={attrs.description}
              descriptionId={messageId}
              descriptionStyle="tooltip"
              label={attrs.label}
              required={true}
            />
            <Text className="block" color="secondary" size="body3">
              {intl.formatMessage({
                defaultMessage:
                  'Provide at least 1 URL where you hosted your solution',
                description: 'Helper text for the deployment URLs field',
                id: '/2+ppr',
              })}
            </Text>
          </div>
          <div className="-me-3">
            <ProjectsChallengeSubmitPageDeploymentDialog />
          </div>
        </div>
        {field.value.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {field.value.map((item, index) => (
              <div
                key={item.label}
                className={clsx('flex items-end justify-between')}>
                <div className="grow">
                  <TextInput
                    errorMessage={
                      dirtyFields.deploymentUrls?.[index]?.href ||
                      submitCount > 0
                        ? errors.deploymentUrls?.[index]?.href?.message
                        : undefined
                    }
                    label={
                      challengeDefaultSpecPageLabels[item.label] || item.label
                    }
                    placeholder={attrs.urlPlaceholder}
                    value={item.href}
                    onChange={(value) => {
                      field.onChange([
                        ...field.value.slice(0, index),
                        {
                          href: value,
                          label: item.label,
                        },
                        ...field.value.slice(index + 1),
                      ]);
                    }}
                  />
                </div>
                {!challengeDefaultSpecPages.includes(item.label) && (
                  <Button
                    addonPosition="start"
                    className="ms-2"
                    icon={RiPencilLine}
                    isLabelHidden={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Edit',
                      description: 'Edit button label',
                      id: '2rcoOT',
                    })}
                    size="md"
                    variant="tertiary"
                    onClick={() => {
                      setDialogMode({
                        index,
                        type: 'edit',
                      });
                    }}
                  />
                )}
                {field.value.length > 1 &&
                  !challengeDefaultSpecPages.includes(item.label) && (
                    <Button
                      addonPosition="start"
                      className="ms-2"
                      icon={RiCloseLine}
                      isLabelHidden={true}
                      label={intl.formatMessage({
                        defaultMessage: 'Delete',
                        description: 'Delete button label',
                        id: 'WodcPq',
                      })}
                      size="md"
                      variant="tertiary"
                      onClick={() => {
                        if (field.value.length === 1) {
                          return;
                        }

                        field.onChange([
                          ...field.value.slice(0, index),
                          ...field.value.slice(index + 1),
                        ]);
                      }}
                    />
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
      {field.value.length < MAXIMUM_URLS && (
        <div>
          <Button
            addonPosition="start"
            icon={RiAddLine}
            label={intl.formatMessage({
              defaultMessage: 'Add custom page',
              description:
                'Button label to add another URL to a project submission',
              id: 'E3cH5c',
            })}
            size="xs"
            tooltip={intl.formatMessage({
              defaultMessage:
                'Feel free to include any custom pages you have added for this challenge. They will be featured on the submission page.',
              description:
                'Button tooltip for adding another URL to a project submission',
              id: '0Z5awQ',
            })}
            variant="secondary"
            onClick={() => {
              setDialogMode({ type: 'add' });
            }}
          />
        </div>
      )}
      {errors.deploymentUrls?.message && (
        <Text className="block" color="error" id={messageId} size="body3">
          {errors.deploymentUrls?.message}
        </Text>
      )}
      <ProjectsChallengeSubmissionDeploymentUrlItemFormDialog
        isShown={dialogMode != null}
        mode={dialogMode?.type}
        values={
          dialogMode?.type === 'edit'
            ? field.value[dialogMode!.index]
            : { href: '', label: '' }
        }
        onClose={() => {
          setDialogMode(null);
        }}
        onSubmit={(value) => {
          if (dialogMode?.type === 'add') {
            field.onChange([...field.value, value]);
          }

          if (dialogMode?.type === 'edit') {
            const editingIndex = dialogMode.index;

            field.onChange([
              ...field.value.slice(0, editingIndex),
              // If the URL is the same, means only the label is updated,
              // so preserve any existing screenshots.
              value.href === field.value[editingIndex].href
                ? {
                    ...field.value[editingIndex],
                    ...value,
                  }
                : value,
              ...field.value.slice(editingIndex + 1),
            ]);
          }

          setDialogMode(null);
        }}
      />
    </div>
  );
}
