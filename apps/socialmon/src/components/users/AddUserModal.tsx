import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import toast from 'react-hot-toast';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

type Props = Readonly<{
  onClose: () => void;
  opened: boolean;
}>;

export default function AddUserModal({ onClose, opened }: Props) {
  const utils = trpc.useUtils();
  const projectSlug = useCurrentProjectSlug();
  const addAccountForm = useForm({
    initialValues: {
      password: '',
      username: '',
    },
  });

  const addUserMutation = trpc.socialUsers.addPlatformUser.useMutation({
    onError() {
      toast.error('Something went wrong. Try again later.');
    },
    onSuccess: () => {
      utils.socialUsers.getPlatformUsers.invalidate();
      toast.success('User added successfully!');
      addAccountForm.reset();
      onClose();
    },
  });

  return (
    <Modal centered={true} opened={opened} title="Add user" onClose={onClose}>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={addAccountForm.onSubmit(() =>
          addUserMutation.mutate({ projectSlug, user: addAccountForm.values }),
        )}>
        <TextInput
          label="Username"
          placeholder="Username"
          required={true}
          {...addAccountForm.getInputProps('username')}
        />
        <TextInput
          label="Password"
          placeholder="Password"
          required={true}
          {...addAccountForm.getInputProps('password')}
        />
        <div className="flex w-full justify-end">
          <Button loading={addUserMutation.isLoading} type="submit">
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
}
