import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import TextInput from '~/components/ui/TextInput';

import type { ProjectsChallengeSubmissionDeploymentUrlItem } from '../../types';

export type DeploymentUrlDialogMode = 'add' | 'edit';

type Props = Readonly<{
  isShown: boolean;
  mode: DeploymentUrlDialogMode;
  onClose: () => void;
  onSubmit: (value: ProjectsChallengeSubmissionDeploymentUrlItem) => void;
  value?: ProjectsChallengeSubmissionDeploymentUrlItem;
}>;

export default function ProjectsChallengeSubmissionDeploymentUrlFormDialog({
  isShown,
  mode,
  onClose,
  value,
  onSubmit,
}: Props) {
  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          label={mode === 'add' ? 'Add' : 'Update'}
          type="submit"
          variant="primary"
        />
      }
      secondaryButton={
        <Button label="Cancel" variant="secondary" onClick={onClose} />
      }
      title={mode === 'add' ? 'Add URL' : 'Update URL'}
      wrapContents={(contents) => (
        <form
          onSubmit={(event) => {
            // TODO(projects): use React Hook Form
            event.preventDefault();
            event.stopPropagation();

            const formData = new FormData(event.target as HTMLFormElement);

            onSubmit({
              href: String(formData.get('href')),
              label: String(formData.get('label')),
            });
          }}>
          {contents}
        </form>
      )}
      onClose={onClose}>
      <div className="flex flex-col gap-6">
        <TextInput
          defaultValue={value?.label}
          label="Page name"
          minLength={5}
          name="label"
          required={true}
        />
        <TextInput
          defaultValue={value?.href}
          label="URL"
          name="href"
          required={true}
          type="url"
        />
      </div>
    </Dialog>
  );
}
