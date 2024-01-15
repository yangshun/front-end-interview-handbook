import { useId } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionDeploymentUrlsAttributes } from './ProjectsChallengeSubmissionDeploymentUrlsSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';
import ProjectsChallengeSubmitPageDeploymentDialog from '../ProjectsChallengeSubmitPageDeploymentDialog';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'deploymentUrls';

export default function ProjectsChallengeSubmissionDeploymentUrlsField({
  control,
}: Props) {
  const intl = useIntl();
  const messageId = useId();
  const attrs = getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-y-2">
            <Label
              description={attrs.description}
              descriptionId={messageId}
              descriptionStyle="tooltip"
              label={attrs.label}
            />
            <Text color="secondary" display="block" size="body3">
              Provide at least 1 URL where you hosted your solution
            </Text>
          </div>
          <div className="-me-3">
            <ProjectsChallengeSubmitPageDeploymentDialog />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {field.value.map((item, index) => (
            <div key={item.href} className="flex gap-2 items-center">
              <TextInput
                classNameOuter="grow"
                errorMessage={
                  formState.errors[fieldName]?.[index]?.href?.message
                }
                label={item.label}
                placeholder={attrs.placeholder}
                type={attrs.type}
                value={item.href}
                onChange={(value) => {
                  field.onChange([
                    ...field.value.slice(0, index),
                    {
                      ...item,
                      href: value,
                    },
                    ...field.value.slice(index + 1),
                  ]);
                }}
              />
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
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          icon={RiAddLine}
          label="Add another URL"
          size="sm"
          variant="tertiary"
          onClick={() => {
            field.onChange([...field.value, { href: '', label: 'Hello' }]);
          }}
        />
      </div>
    </div>
  );
}
