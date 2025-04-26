import clsx from 'clsx';
import { useState } from 'react';
import {
  RiGithubFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXFill,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import {
  themeDivideColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import {
  cleanGitHubUserInput,
  cleanInstagramUserInput,
  cleanLinkedInUserInput,
  cleanTwitterUserInput,
} from './RewardsSocialHandlesUtils';

export type RewardsHandlesData = Readonly<{
  gitHubUsername: string;
  instagramUsername: string;
  linkedInUsername: string;
  twitterUsername: string;
}>;

type RewardsHandlesValidation = Readonly<{
  gitHub: PromiseSettledResult<void>;
  instagram: PromiseSettledResult<void>;
  linkedIn: PromiseSettledResult<void>;
  twitter: PromiseSettledResult<void>;
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
  const intl = useIntl();
  const { isLoading, mutate: verifySocialHandles } =
    trpc.promotions.verifySocialHandles.useMutation();
  const [validationErrors, setValidationErrors] =
    useState<RewardsHandlesValidation | null>(null);
  const [hasError, setHasError] = useState(false);
  const [openTooltip, setOpenTooltip] = useState<
    'github' | 'instagram' | 'linkedin' | 'twitter' | null
  >(null);

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = {
          gitHubUsername: cleanGitHubUserInput(
            (formData.get('github') ?? '').toString(),
          ),
          instagramUsername: cleanInstagramUserInput(
            (formData.get('instagram') ?? '').toString(),
          ),
          linkedInUsername: cleanLinkedInUserInput(
            (formData.get('linkedin') ?? '').toString(),
          ),
          twitterUsername: cleanTwitterUserInput(
            (formData.get('twitter') ?? '').toString(),
          ),
        };

        setHasError(false);
        setValidationErrors(null);
        verifySocialHandles(data, {
          onError: () => {
            setHasError(true);
          },
          onSuccess: (res) => {
            if (res.allValid) {
              onNextStage(data);

              return;
            }

            setValidationErrors(res.fields);
          },
        });
      }}>
      <Text className="block" color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="We will only use them to verify task completion"
          description="Rewards campaign help text"
          id="b2XnyK"
        />
      </Text>
      <div className={clsx('w-full divide-y', themeDivideColor)}>
        <div className="flex items-center justify-between gap-4 py-4">
          <Text size="body2">GitHub</Text>{' '}
          <div className="flex w-full max-w-sm items-center gap-2">
            <RiGithubFill
              className={clsx('size-5 shrink-0', themeTextSubtitleColor)}
            />
            <Tooltip
              asChild={true}
              label={
                <FormattedMessage
                  defaultMessage="For a profile URL like <bold>https://github.com/john-doe</bold>, your handle would be <bold>john-doe</bold>."
                  description="Rewards campaign help text"
                  id="4OAQyn"
                  values={{
                    bold: (chunks) => (
                      <Text color="inherit" size="inherit" weight="bold">
                        {chunks}
                      </Text>
                    ),
                  }}
                />
              }
              open={openTooltip === 'github'}>
              <div className="w-full">
                <TextInput
                  autoFocus={true}
                  errorMessage={
                    validationErrors?.gitHub.status === 'rejected'
                      ? validationErrors?.gitHub.reason
                      : undefined
                  }
                  isDisabled={isLoading}
                  isLabelHidden={true}
                  label="GitHub"
                  name="github"
                  placeholder="john-doe"
                  value={handlesData.gitHubUsername}
                  onBlur={() => setOpenTooltip(null)}
                  onChange={(value) => {
                    onHandlesDataChange({
                      ...handlesData,
                      gitHubUsername: value,
                    });
                    setOpenTooltip(null);
                  }}
                  onFocus={() => setOpenTooltip('github')}
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <Text size="body2">LinkedIn</Text>
          <div className="flex w-full max-w-sm items-center gap-2">
            <RiLinkedinFill
              className={clsx('size-5 shrink-0', themeTextSubtitleColor)}
            />
            <Tooltip
              asChild={true}
              label={
                <FormattedMessage
                  defaultMessage="For a profile URL like <bold>https://linkedin.com/in/john-doe</bold>, your handle would be <bold>john-doe</bold>."
                  description="Rewards campaign help text"
                  id="72r1UC"
                  values={{
                    bold: (chunks) => (
                      <Text color="inherit" size="inherit" weight="bold">
                        {chunks}
                      </Text>
                    ),
                  }}
                />
              }
              open={openTooltip === 'linkedin'}>
              <div className="w-full">
                <TextInput
                  errorMessage={
                    validationErrors?.linkedIn.status === 'rejected'
                      ? validationErrors?.linkedIn.reason
                      : undefined
                  }
                  isDisabled={isLoading}
                  isLabelHidden={true}
                  label="LinkedIn"
                  name="linkedin"
                  placeholder="john-doe"
                  value={handlesData.linkedInUsername}
                  onBlur={() => setOpenTooltip(null)}
                  onChange={(value) => {
                    onHandlesDataChange({
                      ...handlesData,
                      linkedInUsername: value,
                    });
                    setOpenTooltip(null);
                  }}
                  onFocus={() => setOpenTooltip('linkedin')}
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <Text size="body2">X / Twitter</Text>
          <div className="flex w-full max-w-sm items-center gap-2">
            <RiTwitterXFill
              className={clsx('size-5 shrink-0', themeTextSubtitleColor)}
            />
            <Tooltip
              asChild={true}
              label={
                <FormattedMessage
                  defaultMessage="For a profile URL like <bold>https://x.com/john-doe</bold>, your handle would be <bold>john-doe</bold>."
                  description="Rewards campaign help text"
                  id="8ADLgY"
                  values={{
                    bold: (chunks) => (
                      <Text color="inherit" size="inherit" weight="bold">
                        {chunks}
                      </Text>
                    ),
                  }}
                />
              }
              open={openTooltip === 'twitter'}>
              <div className="w-full max-w-sm">
                <TextInput
                  className="w-full"
                  errorMessage={
                    validationErrors?.twitter.status === 'rejected'
                      ? validationErrors?.twitter.reason
                      : undefined
                  }
                  isDisabled={isLoading}
                  isLabelHidden={true}
                  label="X / Twitter"
                  name="twitter"
                  placeholder="john-doe"
                  value={handlesData.twitterUsername}
                  onBlur={() => setOpenTooltip(null)}
                  onChange={(value) => {
                    onHandlesDataChange({
                      ...handlesData,
                      twitterUsername: value,
                    });
                    setOpenTooltip(null);
                  }}
                  onFocus={() => setOpenTooltip('twitter')}
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <Text size="body2">Instagram</Text>
          <div className="flex w-full max-w-sm items-center gap-2">
            <RiInstagramLine
              className={clsx('size-5 shrink-0', themeTextSubtitleColor)}
            />
            <Tooltip
              asChild={true}
              label={
                <FormattedMessage
                  defaultMessage="For a profile URL like <bold>https://instagram.com/johndoe</bold>, your handle would be <bold>johndoe</bold>."
                  description="Rewards campaign help text"
                  id="gv2f4M"
                  values={{
                    bold: (chunks) => (
                      <Text color="inherit" size="inherit" weight="bold">
                        {chunks}
                      </Text>
                    ),
                  }}
                />
              }
              open={openTooltip === 'instagram'}>
              <div className="w-full max-w-sm">
                <TextInput
                  className="w-full"
                  errorMessage={
                    validationErrors?.instagram.status === 'rejected'
                      ? validationErrors?.instagram.reason
                      : undefined
                  }
                  isDisabled={isLoading}
                  isLabelHidden={true}
                  label="Instagram"
                  name="instagram"
                  placeholder="john-doe"
                  value={handlesData.instagramUsername}
                  onBlur={() => setOpenTooltip(null)}
                  onChange={(value) => {
                    onHandlesDataChange({
                      ...handlesData,
                      instagramUsername: value,
                    });
                    setOpenTooltip(null);
                  }}
                  onFocus={() => setOpenTooltip('instagram')}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      {hasError && (
        <Text className="block" color="error" size="body2">
          <FormattedMessage
            defaultMessage="Invalid inputs. Please check that you have filled in the username or profile URL correctly."
            description="Form error text"
            id="kK7Cf2"
          />
        </Text>
      )}
      <div className="flex justify-end">
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Next',
            description: 'Next button label',
            id: 'pz1v44',
          })}
          size="sm"
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
}
