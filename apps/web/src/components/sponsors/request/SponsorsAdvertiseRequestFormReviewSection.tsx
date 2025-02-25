import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  onPrevious: () => void;
  onSubmit: () => void;
}>;

export default function SponsorsAdvertiseRequestFormReviewSection({
  onSubmit,
  onPrevious,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Heading level="heading6">Review and sign</Heading>

      <Section>
        <Text className="block" color="secondary">
          Review everything and make sure they are in order
        </Text>
        <div className="mt-8 flex justify-between">
          <Button
            addonPosition="start"
            icon={RiArrowLeftLine}
            label="Previous"
            size="md"
            variant="secondary"
            onClick={() => {
              onPrevious();
            }}
          />
          <Button
            icon={RiArrowRightLine}
            label="Submit"
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
