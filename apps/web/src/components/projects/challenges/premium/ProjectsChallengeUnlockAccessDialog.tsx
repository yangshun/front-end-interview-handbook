import clsx from 'clsx';
import type {
  ProjectsChallengeInfo,
  ProjectsChallengeMetadata,
} from 'contentlayer/generated';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import EmptyState from '~/components/ui/EmptyState';
import Spinner from '~/components/ui/Spinner';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBackgroundLayerEmphasized,
} from '~/components/ui/theme';

import { useI18nRouter } from '~/next-i18nostic/src';

import { projectsPaidPlanFeatures } from '../../purchase/ProjectsPricingFeaturesConfig';
import type { ProjectsViewerProjectsProfile } from '../../types';

function PrerequisiteChallengesList({
  challenges,
}: Readonly<{
  challenges: ReadonlyArray<{
    info: ProjectsChallengeInfo;
    metadata: ProjectsChallengeMetadata;
  }>;
}>) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-2',
        'p-3',
        'rounded-md',
        themeBackgroundElementColor,
        textVariants({ size: 'body3' }),
      )}>
      <FormattedMessage
        defaultMessage="The following challenges will be unlocked:"
        description="Confirmation text for unlocking a premium challenge"
        id="Cqx/J0"
      />
      <ul className="list-inside list-disc">
        {challenges.map((challengeToUnlock) => (
          <li
            key={challengeToUnlock.metadata.slug}
            className="flex items-center justify-between gap-3">
            <Anchor href={challengeToUnlock.metadata.href} target="_blank">
              {challengeToUnlock.info.title}
            </Anchor>
            {challengeToUnlock.metadata.baseCredits > 0 && (
              <>
                <div
                  className={clsx('h-px grow', themeBackgroundLayerEmphasized)}
                />
                <Text color="secondary">
                  <FormattedMessage
                    defaultMessage="{count, plural, one {1 credit} other {# credits}}"
                    description="Number of credits"
                    id="47jdAi"
                    values={{
                      count: challengeToUnlock.metadata.baseCredits,
                    }}
                  />
                </Text>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  slug: string;
  trigger: React.ReactNode;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeUnlockAccessDialog({
  viewerProjectsProfile,
  isShown,
  slug,
  trigger,
  onClose,
}: Props) {
  const plan = viewerProjectsProfile?.plan;
  const credits = viewerProjectsProfile?.credits ?? 0;

  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const router = useI18nRouter();
  const { showToast } = useToast();
  const { data, isLoading } =
    trpc.projects.challenge.unlockCreditsDetails.useQuery({ slug });
  const unlockAccessMutation = trpc.projects.challenge.unlockAccess.useMutation(
    {
      onSuccess: () => {
        trpcUtils.projects.challenge.invalidate();
      },
    },
  );

  const creditsLeftAfterUnlocking = credits - (data?.creditsRequired ?? 0);
  const hasSufficientCreditsToUnlock = creditsLeftAfterUnlocking >= 0;

  return (
    <ConfirmationDialog
      confirmButtonLabel={
        hasSufficientCreditsToUnlock
          ? undefined
          : intl.formatMessage({
              defaultMessage: 'Ok',
              description: 'Ok label',
              id: 'LXcvcX',
            })
      }
      isDisabled={!data || !hasSufficientCreditsToUnlock}
      isLoading={unlockAccessMutation.isLoading}
      isShown={isShown}
      title={
        hasSufficientCreditsToUnlock
          ? intl.formatMessage({
              defaultMessage: 'Unlock premium challenge',
              description: 'Title for unlocking a premium challenge',
              id: 'pSJKPJ',
            })
          : intl.formatMessage({
              defaultMessage: 'Insufficient credits',
              description: 'Title for unlocking a premium challenge',
              id: 'bT5MuR',
            })
      }
      trigger={trigger}
      onCancel={() => {
        onClose();
      }}
      onConfirm={async () => {
        await unlockAccessMutation.mutateAsync({
          slug,
        });
        onClose();
        showToast({
          title: intl.formatMessage({
            defaultMessage: 'Challenge unlocked successfully',
            description: 'Label to unlock a premium project',
            id: 'SG08/K',
          }),
          variant: 'success',
        });

        // Re-run server-side premium checks.
        router.refresh();
      }}>
      {(() => {
        if (isLoading) {
          return (
            <div className="py-10">
              <Spinner display="block" size="sm" />
            </div>
          );
        }

        if (data == null) {
          return <EmptyState title="An error occurred" variant="error" />;
        }

        if (data?.creditsRequired === 0) {
          return (
            <FormattedMessage
              defaultMessage="This challenge can be unlocked without spending any credits because you have unlocked all pre-requisite challenges. Proceed to unlock challenge?"
              description="Message about unlocking challenges"
              id="rIxZsj"
            />
          );
        }

        if (!hasSufficientCreditsToUnlock) {
          return (
            <div className="flex flex-col gap-2">
              <Text className="block">
                <FormattedMessage
                  defaultMessage="Unlocking this challenge requires {countRequired, plural, =0 {no premium credits} one {<bold>1</bold> premium credit} other {<bold>#</bold> premium credits}} but you only have {countAvailable, plural, =0 {no premium credits} one {<bold>1</bold> premium credit} other {<bold>#</bold> premium credits}} available."
                  description="Confirmation text for unlocking a premium challenge"
                  id="mtMKkm"
                  values={{
                    bold: (chunks) => <Text weight="medium">{chunks}</Text>,
                    countAvailable: credits,
                    countRequired: data?.creditsRequired,
                  }}
                />
              </Text>
              {data.challengesToUnlock.length > 1 && (
                <>
                  <PrerequisiteChallengesList
                    challenges={data.challengesToUnlock}
                  />
                  <Text className="block">
                    <FormattedMessage
                      defaultMessage="As this is a composite challenge, you may choose to unlock the dependent challenges first."
                      description="Confirmation text for unlocking a premium challenge"
                      id="6J+fmT"
                    />
                  </Text>
                </>
              )}
            </div>
          );
        }

        if (hasSufficientCreditsToUnlock) {
          return (
            <div className="flex flex-col gap-2">
              <Text className="block">
                <FormattedMessage
                  defaultMessage="Unlocking this challenge requires a total of {count, plural, one {<bold>1 premium credit</bold>} other {<bold># premium credits</bold>}}."
                  description="Confirmation text for unlocking a premium challenge"
                  id="2zikko"
                  values={{
                    bold: (chunks) => <Text weight="medium">{chunks}</Text>,
                    count: data?.creditsRequired,
                  }}
                />
              </Text>
              {(data.challengesToUnlock.length > 1 ||
                (data.challengesToUnlock.length === 1 &&
                  data.challengesToUnlock[0].metadata.slug !== slug)) && (
                <PrerequisiteChallengesList
                  challenges={data.challengesToUnlock}
                />
              )}
              {plan != null &&
                (projectsPaidPlanFeatures[plan].credits === 'unlimited' ? (
                  <Text className="block">
                    <FormattedMessage
                      defaultMessage="You currently have <bold>unlimited premium credits</bold>. Proceed to unlock?"
                      description="Confirmation text for unlocking a premium challenge"
                      id="g+jqM2"
                      values={{
                        bold: (chunks) => <Text weight="medium">{chunks}</Text>,
                        count: credits,
                      }}
                    />
                  </Text>
                ) : (
                  <Text className="block">
                    <FormattedMessage
                      defaultMessage="You currently have {count, plural, =0 {no premium credits} one {<bold>1 premium credit</bold>} other {<bold># premium credits</bold>}}. Proceed to unlock?"
                      description="Confirmation text for unlocking a premium challenge"
                      id="3n0B1m"
                      values={{
                        bold: (chunks) => <Text weight="medium">{chunks}</Text>,
                        count: credits,
                      }}
                    />
                  </Text>
                ))}
            </div>
          );
        }
      })()}
    </ConfirmationDialog>
  );
}
