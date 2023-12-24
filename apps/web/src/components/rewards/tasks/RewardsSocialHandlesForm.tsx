import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeDivideColor } from '~/components/ui/theme';

export type RewardsHandlesData = Readonly<{
  gitHubUsername: string;
  linkedInUrl: string;
  twitterUsername: string;
}>;

type Props = Readonly<{
  handlesData: RewardsHandlesData;
  onHandlesDataChange: (newData: RewardsHandlesData) => void;
  onNextStage: (handlesData: RewardsHandlesData) => void;
}>;

export default function RewardsSocialHandlesForm({
  handlesData,
  onHandlesDataChange,
  onNextStage,
}: Props) {
  const { mutate: verifySocialHandles, isLoading } =
    trpc.rewards.verifySocialHandles.useMutation();

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = {
          gitHubUsername: (formData.get('github') ?? '').toString(),
          linkedInUrl: (formData.get('linkedin') ?? '').toString(),
          twitterUsername: (formData.get('twitter') ?? '').toString(),
        };

        verifySocialHandles(data, {
          onSuccess: () => {
            onNextStage(data);
          },
        });
      }}>
      <Text color="secondary" display="block" size="body2">
        <FormattedMessage
          defaultMessage="Please enter your social media handles for us to verify."
          description="Rewards campaign help text"
          id="ZYXIkT"
        />
      </Text>
      <div className={clsx('w-full divide-y', themeDivideColor)}>
        <div className="flex justify-between items-center gap-4 py-4">
          <Text size="body2">GitHub</Text>{' '}
          <div className="max-w-sm w-full">
            <TextInput
              autoFocus={true}
              isDisabled={isLoading}
              isLabelHidden={true}
              label="GitHub"
              name="github"
              placeholder="johndoe"
              value={handlesData.gitHubUsername}
              onChange={(value) => {
                onHandlesDataChange({
                  ...handlesData,
                  gitHubUsername: value,
                });
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 py-4">
          <Text size="body2">LinkedIn</Text>
          <div className="max-w-sm w-full">
            <TextInput
              isDisabled={isLoading}
              isLabelHidden={true}
              label="LinkedIn"
              name="linkedin"
              placeholder="https://linkedin.com/in/john-doe"
              value={handlesData.linkedInUrl}
              onChange={(value) => {
                onHandlesDataChange({
                  ...handlesData,
                  linkedInUrl: value,
                });
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 py-4">
          <Text size="body2">Twitter</Text>
          <div className="max-w-sm w-full">
            <TextInput
              className="w-full"
              isDisabled={isLoading}
              isLabelHidden={true}
              label="Twitter"
              name="twitter"
              placeholder="johndoe"
              value={handlesData.twitterUsername}
              onChange={(value) => {
                onHandlesDataChange({
                  ...handlesData,
                  twitterUsername: value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          label="Next"
          size="sm"
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
