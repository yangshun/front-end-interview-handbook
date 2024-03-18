import clsx from 'clsx';
import { useId, useState } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { RiAddLine, RiCloseLine, RiPencilLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionDeploymentUrlItemFormDialog from './ProjectsChallengeSubmissionDeploymentUrlItemFormDialog';
import { getProjectsChallengeSubmissionDeploymentUrlsAttributes } from './ProjectsChallengeSubmissionDeploymentUrlsSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';
import ProjectsChallengeSubmitPageDeploymentDialog from '../ProjectsChallengeSubmitPageDeploymentDialog';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'deploymentUrls';

const maximumUrls = 4;

export default function ProjectsChallengeSubmissionDeploymentUrlsField({
  control,
}: Props) {
  const intl = useIntl();
  const messageId = useId();

  const [dialogMode, setDialogMode] = useState<
    Readonly<{ index: number; type: 'edit' } | null> | Readonly<{ type: 'add' }>
  >(null);

  const attrs = getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);
  // TODO(projects): show error state for empty form and check validation.
  const { field, formState } = useController({
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
              Provide at least 1 URL where you hosted your solution
            </Text>
          </div>
          <div className="-me-3">
            <ProjectsChallengeSubmitPageDeploymentDialog />
          </div>
        </div>
        {field.value.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {field.value.map((item, index) => (
              <div
                key={item.href}
                className={clsx(
                  'flex items-center justify-between gap-4',
                  'rounded px-3 py-0.5',
                  ['border', themeBorderElementColor],
                )}>
                <Text
                  className={clsx(
                    'flex items-center gap-2',
                    'w-full truncate whitespace-nowrap',
                  )}
                  size="body2">
                  <span>{item.label}</span>{' '}
                  <Anchor href={item.href}>{item.href}</Anchor>
                </Text>
                <div className="-me-2 flex shrink-0">
                  <Button
                    addonPosition="start"
                    icon={RiPencilLine}
                    isLabelHidden={true}
                    label="Edit"
                    size="md"
                    variant="tertiary"
                    onClick={() => {
                      setDialogMode({
                        index,
                        type: 'edit',
                      });
                    }}
                  />
                  {field.value.length > 1 && (
                    <Button
                      addonPosition="start"
                      icon={RiCloseLine}
                      isLabelHidden={true}
                      label="Delete"
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
              </div>
            ))}
          </div>
        )}
      </div>
      {field.value.length < maximumUrls && (
        <div>
          <Button
            addonPosition="start"
            icon={RiAddLine}
            label={
              field.value.length > 0
                ? intl.formatMessage({
                    defaultMessage: 'Add another URL',
                    description:
                      'Button label to add another URL to a project submission',
                    id: '64hnWF',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Add a URL',
                    description:
                      'Button label to add a URL to a project submission',
                    id: 'SGaDHr',
                  })
            }
            size="md"
            variant="secondary"
            onClick={() => {
              setDialogMode({ type: 'add' });
            }}
          />
        </div>
      )}
      {formState.errors.deploymentUrls?.message && (
        <Text className="block" color="error" id={messageId} size="body3">
          {formState.errors.deploymentUrls?.message}
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
