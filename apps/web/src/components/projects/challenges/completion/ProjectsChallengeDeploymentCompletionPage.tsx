'use client';

import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiCodeLine,
  RiGithubFill,
  RiShareCircleLine,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
} from '~/components/ui/theme';

import { useProjectsChallengeSessionContext } from '../session/ProjectsChallengeSessionContext';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeDeploymentCompletionPage({
  challenge,
}: Props) {
  const { metadata } = challenge;
  const { submitHref } = metadata;
  const intl = useIntl();

  const { startProject, accessAllSteps } = useProjectsChallengeSessionContext();

  return (
    <BlurOverlay
      align="center"
      disableOverlay={accessAllSteps}
      overlay={
        <div className="mx-auto flex max-w-lg flex-col items-center gap-y-6 text-center">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Start the project to access submission and deployment steps"
              description="Title for project overlay on projects details page"
              id="AjKgye"
            />
          </Heading>
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Start project',
              description: 'Start Project button label',
              id: 'Se4xmG',
            })}
            size="lg"
            variant="primary"
            onClick={startProject}
          />
        </div>
      }>
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
            <Text className="mt-4" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="Once you're done coding, follow this step-by-step guide to host your solution and submit the project."
                description="Description for the project submission checklist section"
                id="w3tshW"
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
                      <Text weight="bold">
                        <FormattedMessage
                          defaultMessage="GitHub repo"
                          description="Title for GitHub repo step in project submission checklist"
                          id="M3V59d"
                        />
                      </Text>
                      <Text color="secondary" size="body2">
                        <FormattedMessage
                          defaultMessage="Store your code in a public GitHub repo"
                          description="Description for GitHub repo step in project submission checklist"
                          id="9EReUF"
                        />
                      </Text>
                    </div>
                  </div>
                  <Prose textSize="sm">
                    <FormattedMessage
                      defaultMessage="We will pull code from this repo for code reviews"
                      description="Description for GitHub repo step in project submission checklist"
                      id="1L7vdf"
                    />
                    <ul>
                      <li>
                        <FormattedMessage
                          defaultMessage="Follow <link>this guide</link> on how to create a GitHub repo"
                          description="Description for GitHub repo step in project submission checklist"
                          id="GVNK36"
                          values={{
                            link: (chunks) => (
                              <Anchor href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository">
                                {chunks}
                              </Anchor>
                            ),
                          }}
                        />
                      </li>
                      <li>
                        <FormattedMessage
                          defaultMessage="You will submit the link to your public GitHub repo in the submission screen"
                          description="Description for GitHub repo step in project submission checklist"
                          id="8x6UPf"
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
                            <Anchor href="#TODO(projects)">{chunks}</Anchor>
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
                      <Text weight="bold">
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
                  <Divider />
                  <div className="flex items-start gap-4">
                    <Badge
                      label={intl.formatMessage({
                        defaultMessage: 'Tip',
                        description:
                          'Tip badge label for Deployment step in project submission checklist',
                        id: 'imHjx3',
                      })}
                      size="sm"
                      variant="info"
                    />
                    <Prose textSize="sm">
                      <FormattedMessage
                        defaultMessage="Before you deploy, always ensure the following:"
                        description="Warning message for GitHub repo step in project submission checklist"
                        id="KM0VJJ"
                        values={{
                          li: (chunks) => (
                            <li className="ps-2">
                              <span className="-ms-1">{chunks}</span>
                            </li>
                          ),
                          ul: (chunks) => (
                            <ul className="list-inside list-disc">{chunks}</ul>
                          ),
                        }}
                      />
                      <ul>
                        <li>
                          <FormattedMessage
                            defaultMessage="Backward compatibility: xxxx"
                            description="Warning message for GitHub repo step in project submission checklist"
                            id="3jfsNU"
                          />
                        </li>
                        <li>
                          <FormattedMessage
                            defaultMessage="Browser compatibility: xxx"
                            description="Warning message for GitHub repo step in project submission checklist"
                            id="8OWx2n"
                          />
                        </li>
                      </ul>
                    </Prose>
                  </div>
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
                    <Text weight="bold">
                      <FormattedMessage
                        defaultMessage="Ready to submit?"
                        description="Title for Submit step in project submission checklist"
                        id="RY1Vtk"
                      />
                    </Text>
                    <Text color="secondary" size="body2">
                      <FormattedMessage
                        defaultMessage="You can edit your submission and code anytime"
                        description="Description for Submit step in project submission checklist"
                        id="kF4lTl"
                      />
                    </Text>
                    <Button
                      className="mt-4 self-start"
                      href={submitHref}
                      icon={RiArrowRightLine}
                      label={intl.formatMessage({
                        defaultMessage: 'Submit project',
                        description:
                          'Submit project button label for Submit step in project submission checklist',
                        id: 'oxeO+l',
                      })}
                      variant="primary"
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
