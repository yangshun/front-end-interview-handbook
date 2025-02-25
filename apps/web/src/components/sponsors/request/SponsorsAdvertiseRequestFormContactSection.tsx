import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  onSubmit: () => void;
}>;

export default function SponsorsAdvertiseRequestFormContactSection({
  onSubmit,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Heading level="heading6">Contact details</Heading>
      <Section>
        <Text className="block" color="secondary">
          Provide the company email addresses we will use to contact you
        </Text>
        <div className={clsx('mt-8 flex flex-col gap-2')}>
          <TextInput
            autoFocus={true}
            isLabelHidden={true}
            label="Email"
            placeholder="john.doe@example.com"
            required={true}
            type="email"
          />
          <TextInput
            isLabelHidden={true}
            label="Email"
            placeholder="Additional email addresses should you require"
            type="email"
          />
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            icon={RiArrowRightLine}
            label="Next"
            size="md"
            variant="primary"
            onClick={() => {
              onSubmit();
            }}
          />
        </div>
      </Section>
    </div>
  );
}
