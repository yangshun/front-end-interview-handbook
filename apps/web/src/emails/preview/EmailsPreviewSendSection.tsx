import clsx from 'clsx';
import { useLocalStorage } from 'usehooks-ts';

import Button from '~/components/ui/Button';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  onSubmit: ({
    email,
    name,
  }: Readonly<{ email: string; name: string }>) => void;
}>;

export default function EmailsPreviewSendSection({ onSubmit }: Props) {
  const [email, setEmail] = useLocalStorage('gfe:emails:preview:email', '');
  const [name, setName] = useLocalStorage('gfe:emails:preview:name', '');

  return (
    <form
      className={clsx('flex flex-wrap items-end gap-x-3 gap-y-4')}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ email, name });
      }}>
      <TextInput
        label="Email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <TextInput
        label="Name"
        placeholder="Name (e.g. John Doe)"
        value={name}
        onChange={setName}
      />
      <Button
        label="Send test email"
        size="md"
        type="submit"
        variant="primary"
      />
    </form>
  );
}
