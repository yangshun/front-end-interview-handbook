import toast from 'react-hot-toast';

import { trpc } from '~/hooks/trpc';

import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

type Props = Readonly<{
  onClose: () => void;
  opened: boolean;
}>;

export default function CreateAccountModal({ opened, onClose }: Props) {
  const utils = trpc.useUtils();
  const addAccountForm = useForm({
    initialValues: {
      clientId: '',
      clientSecret: '',
      password: '',
      username: '',
    },
  });

  const addAccountMutation = trpc.socialAccounts.addAccount.useMutation({
    onError() {
      toast.error('Something went wrong. Try again later.');
    },
    onSuccess: () => {
      utils.socialAccounts.getAccounts.invalidate();
      toast.success('Account added successfully!');
      addAccountForm.reset();
      onClose();
    },
  });

  return (
    <Modal
      centered={true}
      opened={opened}
      title="Add account"
      onClose={onClose}>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={addAccountForm.onSubmit(() =>
          addAccountMutation.mutate({ account: addAccountForm.values }),
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
        <TextInput
          label="Client ID"
          placeholder="Client ID"
          required={true}
          {...addAccountForm.getInputProps('clientId')}
        />
        <TextInput
          label="Client Secret"
          placeholder="Client Secret"
          required={true}
          {...addAccountForm.getInputProps('clientSecret')}
        />
        <div className="flex w-full justify-end">
          <Button loading={addAccountMutation.isLoading} type="submit">
            Add Account
          </Button>
        </div>
      </form>
    </Modal>
  );
}
