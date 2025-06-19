'use client';

import clsx from 'clsx';
import { RiCodeLine, RiGithubFill, RiShareCircleLine } from 'react-icons/ri';

import BlurOverlay from '~/components/common/BlurOverlay';
import { FormattedMessage } from '~/components/intl';
import { useIntl } from '~/components/intl';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Card from '~/components/ui/Card';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
} from '~/components/ui/theme';

import ProjectsStartButton from '../../common/ProjectsStartButton';
import type { ProjectsViewerProjectsProfile } from '../../types';
import ProjectsChallengeContentPaywall from '../premium/ProjectsChallengeContentPaywall';
import type { ProjectsPremiumAccessControlFields } from '../premium/ProjectsPremiumAccessControl';
import { useProjectsChallengeSessionContext } from '../session/ProjectsChallengeSessionContext';
import ProjectsChallengeSubmitButton from './ProjectsChallengeSubmitButton';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeDeploymentCompletionPage({
  challenge,
  viewerAccess,
  viewerProjectsProfile,
}: Props) {
  const { metadata } = challenge;
  const { submitHref } = metadata;
  const intl = useIntl();

  const { accessAllSteps, fetchingCanAccessAllSteps } =
    useProjectsChallengeSessionContext();

  const showPaywall =
    viewerAccess.viewChallenge !== 'UNLOCKED' &&
    viewerAccess.viewChallenge !== 'ACCESSIBLE_TO_EVERYONE';
  const overlay = showPaywall ? (
    <ProjectsChallengeContentPaywall
      slug={metadata.slug}
      viewerContentAccess={viewerAccess.viewChallenge}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  ) : (
    <div
      className={clsx(
        'flex flex-col items-center gap-y-6',
        'mx-auto max-w-lg',
        'text-center',
      )}>
      {fetchingCanAccessAllSteps ? (
        <div className="py-10">
          <Spinner display="block" />
        </div>
      ) : (
        <>
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Start the project to access submission and deployment steps"
              description="Title for project overlay on projects details page"
              id="AjKgye"
            />
          </Heading>
          <div>
            <ProjectsStartButton
              slug={challenge.metadata.slug}
              viewerContentAccess={viewerAccess.viewChallenge}
              viewerProjectsProfile={viewerProjectsProfile}
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <BlurOverlay
      align="center"
      overlay={overlay}
      showOverlay={showPaywall || !accessAllSteps}>
      <div className="flex flex-col items-stretch">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Submission checklist"
            description="Title for the project submission checklist section"
            id="V4qTW5"
          />
        </Heading>
        <Section>
          <div className="flex max-w-2xl flex-col">
            <Text className="text-pretty mt-4" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="Once you're done developing, follow this step-by-step guide to host your solution and submit the challenge."
                description="Description for the project submission checklist section"
                id="SiWL+G"
              />
            </Text>
            <ul className="relative mt-8 flex flex-col gap-6">
              <div
                className={clsx(
                  'absolute bottom-0 left-4 top-16 w-px border-l border-dashed',
                  themeBorderElementColor,
                )}
              />
              <li className="flex gap-x-4">
                <Chip
                  className="mt-6"
                  label={intl.formatNumber(1)}
                  variant="neutral"
                />
                <Card
                  className="flex flex-col gap-6"
                  classNameOuter="flex-1"
                  disableSpotlight={true}
                  pattern={false}>
                  <div className="flex gap-4">
                    <div
                      className={clsx(
                        'rounded-lg p-3',
                        themeBackgroundLayerEmphasized,
                      )}>
                      <RiGithubFill className="size-6" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <Text size="body1" weight="bold">
                        <FormattedMessage
                          defaultMessage="GitHub repository"
                          description="Title for GitHub repo step in project submission checklist"
                          id="Q1/LnD"
                        />
                      </Text>
                      <Text color="secondary" size="body2">
                        <FormattedMessage
                          defaultMessage="Store your code in a public GitHub repository"
                          description="Description for GitHub repo step in project submission checklist"
                          id="MNzCyG"
                        />
                      </Text>
                    </div>
                  </div>
                  <Prose textSize="sm">
                    <FormattedMessage
                      defaultMessage="We will pull code from your repository and display it on your submission for code reviews."
                      description="Description for GitHub repo step in project submission checklist"
                      id="22EoCQ"
                    />
                    <ul>
                      <li>
                        <FormattedMessage
                          defaultMessage="Follow <link>this guide</link> on how to create a GitHub repository."
                          description="Description for GitHub repo step in project submission checklist"
                          id="PoylyF"
                          values={{
                            link: (chunks) => (
                              <Anchor href="https://docs.github.com/repositories/creating-and-managing-repositories/creating-a-new-repository">
                                {chunks}
                              </Anchor>
                            ),
                          }}
                        />
                      </li>
                      <li>
                        <FormattedMessage
                          defaultMessage="You will submit the link to your public GitHub repo on the submission page."
                          description="Description for GitHub repo step in project submission checklist"
                          id="XK5qY6"
                        />
                      </li>
                    </ul>
                  </Prose>
                  <Divider />
                  <div className="flex items-start gap-4">
                    <Badge
                      label={intl.formatMessage({
                        defaultMessage: 'Warning',
                        description:
                          'Warning badge label for GitHub repo step in project submission checklist',
                        id: 'k+T8RZ',
                      })}
                      size="sm"
                      variant="warning"
                    />
                    <Text color="secondary" size="body2">
                      <FormattedMessage
                        defaultMessage="Take care not to upload any premium Figma or guide files. Doing so will cause an immediate membership termination. <link>View terms</link>"
                        description="Warning message for GitHub repo step in project submission checklist"
                        id="0azrZ0"
                        values={{
                          link: (chunks) => (
                            <Anchor href="/legal/terms">{chunks}</Anchor>
                          ),
                        }}
                      />
                    </Text>
                  </div>
                </Card>
              </li>
              <li className="flex gap-x-4">
                <Chip
                  className="mt-6"
                  label={intl.formatNumber(2)}
                  variant="neutral"
                />
                <Card
                  className="flex flex-col gap-6"
                  classNameOuter="flex-1"
                  disableSpotlight={true}
                  pattern={false}>
                  <div className="flex gap-4">
                    <div
                      className={clsx(
                        'rounded-lg p-3',
                        themeBackgroundLayerEmphasized,
                      )}>
                      <RiCodeLine className="size-6" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <Text size="body1" weight="bold">
                        <FormattedMessage
                          defaultMessage="Deployment"
                          description="Title for Deployment step in project submission checklist"
                          id="RHPU56"
                        />
                      </Text>
                      <Text color="secondary" size="body2">
                        <FormattedMessage
                          defaultMessage="Host your site"
                          description="Description for Deployment step in project submission checklist"
                          id="6aAzFQ"
                        />
                      </Text>
                    </div>
                  </div>
                  <Prose textSize="sm">
                    <FormattedMessage
                      defaultMessage="As mentioned, there are many ways to host your site. Our recommended hosts are:"
                      description="Description for Deployment step in project submission checklist"
                      id="GKha2+"
                    />
                    <ul>
                      <li>
                        <Anchor href="https://docs.github.com/en/pages/quickstart">
                          GitHub Pages
                        </Anchor>
                      </li>
                      <li>
                        <Anchor href="https://vercel.com/docs/getting-started-with-vercel/projects-deployments">
                          Vercel
                        </Anchor>
                      </li>
                      <li>
                        <Anchor href="https://docs.netlify.com/get-started/">
                          Netlify
                        </Anchor>
                      </li>
                    </ul>
                  </Prose>
                </Card>
              </li>
              <li className="flex gap-x-4">
                <div className="flex flex-col">
                  <Chip
                    className="mt-6"
                    label={intl.formatNumber(3)}
                    variant="neutral"
                  />
                  <div
                    className={clsx('z-10 w-8 flex-1', themeBackgroundColor)}
                  />
                </div>
                <Card
                  className="flex items-start gap-4"
                  classNameOuter="flex-1"
                  disableSpotlight={true}
                  pattern={false}>
                  <div
                    className={clsx(
                      'rounded-lg p-3',
                      themeBackgroundLayerEmphasized,
                    )}>
                    <RiShareCircleLine className="size-6" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <Text size="body1" weight="bold">
                      <FormattedMessage
                        defaultMessage="Ready to submit?"
                        description="Title for Submit step in project submission checklist"
                        id="RY1Vtk"
                      />
                    </Text>
                    <Text color="secondary" size="body2">
                      <FormattedMessage
                        defaultMessage="You can edit your submission and code anytime."
                        description="Description for Submit step in project submission checklist"
                        id="mh0xHS"
                      />
                    </Text>
                    <ProjectsChallengeSubmitButton
                      className="mt-4 self-start"
                      submitHref={submitHref}
                    />
                  </div>
                </Card>
              </li>
            </ul>
          </div>
        </Section>
      </div>
    </BlurOverlay>
  );
}
