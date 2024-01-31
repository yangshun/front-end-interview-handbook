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

import type { DeploymentUrlDialogMode } from './ProjectsChallengeSubmissionDeploymentUrlFormDialog';
import ProjectsChallengeSubmissionDeploymentUrlFormDialog from './ProjectsChallengeSubmissionDeploymentUrlFormDialog';
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

  const [dialogMode, setDialogMode] = useState<DeploymentUrlDialogMode | null>(
    null,
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const attrs = getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <div className="flex flex-col gap-y-4">
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
            <Text color="secondary" display="block" size="body3">
              Provide at least 1 URL where you hosted your solution
            </Text>
          </div>
          <div className="-me-3">
            <ProjectsChallengeSubmitPageDeploymentDialog />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {field.value.map((item, index) => (
            <div
              key={item.href}
              className={clsx(
                'flex gap-4 items-center justify-between',
                'py-0.5 px-3 rounded',
                ['border', themeBorderElementColor],
              )}>
              <Text
                className="whitespace-nowrap truncate w-full"
                display="block"
                size="body3">
                {item.label}: <Anchor href={item.href}>{item.href}</Anchor>
              </Text>
              <div className="flex -me-2 shrink-0">
                <Button
                  addonPosition="start"
                  icon={RiPencilLine}
                  isLabelHidden={true}
                  label="Edit"
                  size="md"
                  variant="tertiary"
                  onClick={() => {
                    setDialogMode('edit');
                    setEditingIndex(index);
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
      </div>
      {field.value.length < maximumUrls && (
        <div>
          <Button
            addonPosition="start"
            display="block"
            icon={RiAddLine}
            label="Add another URL"
            size="sm"
            variant="secondary"
            onClick={() => {
              setDialogMode('add');
            }}
          />
        </div>
      )}
      <ProjectsChallengeSubmissionDeploymentUrlFormDialog
        isShown={dialogMode != null}
        mode={dialogMode!}
        value={editingIndex != null ? field.value[editingIndex] : undefined}
        onClose={() => {
          setDialogMode(null);
        }}
        onSubmit={(value) => {
          if (dialogMode === 'add') {
            field.onChange([...field.value, value]);
          }

          if (dialogMode === 'edit' && editingIndex != null) {
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
            setEditingIndex(null);
          }

          setDialogMode(null);
        }}
      />
    </div>
  );
}
