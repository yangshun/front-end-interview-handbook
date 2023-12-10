'use client';

import clsx from 'clsx';
import {
  RiArrowRightLine,
  RiCodeLine,
  RiGithubLine,
  RiShareCircleLine,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import type { ProjectsProject } from '~/components/projects/projects/types';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundLayerEmphasized,
  themeElementBorderColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  project: ProjectsProject;
}>;

export default function ProjectsProjectDeploymentCompletionPage({
  project: { slug },
}: Props) {
  const intl = useIntl();

  // TODO(projects): Replace below with actual logic
  const isUserPremium = false;

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-col">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Submission checklist"
            description="Title for the project submission checklist section"
            id="V4qTW5"
          />
        </Heading>
        <Section>
          <div className="flex flex-col">
            <Text className="mt-4" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="Follow this step-by-step deployment and submission checklist"
                description="Description for the project submission checklist section"
                id="Xlmv0q"
              />
            </Text>
            <ul className="relative flex flex-col">
              <div
                className={clsx(
                  'absolute bottom-0 left-4 top-16 w-px border-l border-dashed',
                  themeElementBorderColor,
                )}
              />
              <li className="mt-8 flex gap-x-4">
                <Chip
                  className="mt-6"
                  label={intl.formatNumber(1)}
                  variant="neutral"
                />
                <Card
                  className="flex flex-col gap-6"
                  classNameOuter="flex-1"
                  pattern={false}>
                  <div className="flex gap-4">
                    <div
                      className={clsx(
                        'rounded-lg p-3',
                        themeBackgroundLayerEmphasized,
                      )}>
                      <RiGithubLine className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <Text>
                        <FormattedMessage
                          defaultMessage="Github repo"
                          description="Title for Github repo step in project submission checklist"
                          id="NFH4kL"
                        />
                      </Text>
                      <Text color="secondary" size="body2">
                        <FormattedMessage
                          defaultMessage="Store your code in a public github repo"
                          description="Description for Github repo step in project submission checklist"
                          id="W6BfVJ"
                        />
                      </Text>
                    </div>
                  </div>
                  <Text color="secondary" size="body2">
                    <FormattedMessage
                      defaultMessage="We will pull code from this repo for code reviews<ul><li>Follow <link>this guide</link> on how to create a Github repo</li><li>You will submit the link to your public github repo in the submission screen</li></ul>"
                      description="Description for Github repo step in project submission checklist"
                      id="wzxWP7"
                      values={{
                        li: (chunks) => (
                          <li className="ps-2">
                            <span className="-ms-1">{chunks}</span>
                          </li>
                        ),
                        link: (chunks) => <Anchor>{chunks}</Anchor>,
                        ul: (chunks) => (
                          <ul className="list-inside list-disc">{chunks}</ul>
                        ),
                      }}
                    />
                  </Text>
                  <Divider />
                  <div className="flex items-start gap-4">
                    <Badge
                      label={intl.formatMessage({
                        defaultMessage: 'Warning',
                        description:
                          'Warning badge label for Github repo step in project submission checklist',
                        id: 'byPVGG',
                      })}
                      size="sm"
                      variant="warning"
                    />
                    <Text color="secondary" size="body2">
                      <FormattedMessage
                        defaultMessage="Take care not to upload any premium figma or guide files. Doing so will cause an immediate membership termination. <link>View terms</link>"
                        description="Warning message for Github repo step in project submission checklist"
                        id="n7Jv00"
                        values={{
                          link: (chunks) => (
                            <Button
                              className="!text-brand"
                              display="inline"
                              icon={RiArrowRightLine}
                              label={chunks as unknown as string}
                              variant="tertiary"
                            />
                          ),
                        }}
                      />
                    </Text>
                  </div>
                </Card>
              </li>
              <li className="mt-8 flex gap-x-4">
                <Chip
                  className="mt-6"
                  label={intl.formatNumber(2)}
                  variant="neutral"
                />
                <Card
                  className="flex flex-col gap-6"
                  classNameOuter="flex-1"
                  pattern={false}>
                  <div className="flex gap-4">
                    <div
                      className={clsx(
                        'rounded-lg p-3',
                        themeBackgroundLayerEmphasized,
                      )}>
                      <RiCodeLine className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <Text>
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
                  <Text color="secondary" size="body2">
                    <FormattedMessage
                      defaultMessage="As mentioned, there are many ways to host your site. Our recommended hosts are:<ul><li>Github Pages (<github>Deployment Guide</github>)</li><li>Vercel (<vercel>Deployment Guide</vercel>)</li><li>Netlify (<netlify>Deployment Guide</netlify>)</li></ul>"
                      description="Description for Deployment step in project submission checklist"
                      id="VdG0l0"
                      values={{
                        github: (chunks) => <Anchor>{chunks}</Anchor>,
                        li: (chunks) => (
                          <li className="ps-2">
                            <span className="-ms-1">{chunks}</span>
                          </li>
                        ),
                        netlify: (chunks) => <Anchor>{chunks}</Anchor>,
                        ul: (chunks) => (
                          <ul className="list-inside list-disc">{chunks}</ul>
                        ),
                        vercel: (chunks) => <Anchor>{chunks}</Anchor>,
                      }}
                    />
                  </Text>
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
                    <Text color="secondary" size="body2">
                      <FormattedMessage
                        defaultMessage="Before you deploy, always ensure the following:<ul><li>Backward compatibility: xxxx</li><li>Browser compatibility: xxx</li></ul>"
                        description="Warning message for Github repo step in project submission checklist"
                        id="i3RRZo"
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
                    </Text>
                  </div>
                </Card>
              </li>
              <li className="mt-8 flex gap-x-4">
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
                  pattern={false}>
                  <div
                    className={clsx(
                      'rounded-lg p-3',
                      themeBackgroundLayerEmphasized,
                    )}>
                    <RiShareCircleLine className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <Text>
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
                      href={`/projects/p/${slug}/submit`}
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
    </div>
  );
}
