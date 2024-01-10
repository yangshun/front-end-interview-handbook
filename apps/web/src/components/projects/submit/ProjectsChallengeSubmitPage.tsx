'use client';

import clsx from 'clsx';
import {
  RiArrowLeftLine,
  RiImageLine,
  RiInformationLine,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import type { ProjectsChallengeItem } from '~/components/projects/details/types';
import ProjectsOtherTechStackInput from '~/components/projects/skills/ProjectsOtherTechStackInput';
import ProjectsSkillInput from '~/components/projects/skills/ProjectsSkillInput';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Label from '~/components/ui/Label';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import {
  themeElementBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsChallengeSubmitPageDeploymentDialog from './ProjectsChallengeSubmitPageDeploymentDialog';
import RichTextEditor from './RichTextEditor';
import { themeTextFaintColor } from '../../ui/theme';

type Props = Readonly<{
  project: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeSubmitPage({ project }: Props) {
  const { href } = project.metadata;
  const intl = useIntl();

  return (
    <div>
      <div className="flex">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          href={href}
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'To project',
            description: 'Label of To Project button on project submit page',
            id: 'R8BLW9',
          })}
          variant="tertiary"
        />
      </div>
      <Heading className="mt-8" level="heading5">
        <FormattedMessage
          defaultMessage="Project submission"
          description="Title for the project submission checklist section"
          id="VuGzvG"
        />
      </Heading>
      <Section>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <div className="flex flex-col gap-10 mt-9">
            <div className="grid lg:grid-cols-2 gap-x-6">
              <div className="flex flex-col">
                <TextInput
                  description={intl.formatMessage({
                    defaultMessage:
                      "An eye-catching name to describe your solution. Will be displayed under the original Project's name and help other users identify your submission.",
                    description:
                      'Description for submission name input on project submit page',
                    id: 'XYCpWf',
                  })}
                  descriptionStyle="tooltip"
                  label={intl.formatMessage({
                    defaultMessage: 'Submission name',
                    description:
                      'Label for submission name input on project submit page',
                    id: '3igUzj',
                  })}
                  maxLength={80}
                  placeholder={intl.formatMessage({
                    defaultMessage:
                      'E.g. "Responsive solution with React and Tailwind CSS"',
                    description:
                      'Placeholder for submission name input on project submit page',
                    id: 'zeK111',
                  })}
                  required={true}
                />
                <ProjectsSkillInput
                  description={intl.formatMessage({
                    defaultMessage:
                      'The Skills you are using in this project, which are in our skills tree. Helps us track your progress on skills development',
                    description:
                      'Description for skills input on project submit page',
                    id: 'gVRtnm',
                  })}
                  descriptionStyle="tooltip"
                  label={intl.formatMessage({
                    defaultMessage: 'Skills',
                    description:
                      'Label for skills input on project submit page',
                    id: 'KC1Rzx',
                  })}
                />
                <ProjectsOtherTechStackInput value={[]} onChange={() => {}} />
                <TextInput
                  description={
                    <FormattedMessage
                      defaultMessage="The URL of your GitHub repository. We will also use it to pull files onto the platform for code reviews."
                      description="Description for GitHub repository input on project submit page"
                      id="aW6XJi"
                    />
                  }
                  descriptionStyle="tooltip"
                  label={intl.formatMessage({
                    defaultMessage: 'GitHub code repository URL',
                    description:
                      'Label for GitHub repository input on project submit page',
                    id: 'ql7kBY',
                  })}
                  placeholder="https://github.com/johndoe/my-awesome-project"
                  required={true}
                  type="url"
                />
              </div>
              <div className="flex grow flex-col gap-2">
                <Label
                  description={intl.formatMessage({
                    defaultMessage:
                      'Take a screenshot of your solution, which will be used as your Submission display photo.',
                    description: 'Project submission tooltip',
                    id: 'QQPZy5',
                  })}
                  descriptionStyle="tooltip"
                  label={intl.formatMessage({
                    defaultMessage: 'Screenshot of solution',
                    description: 'Project submission label',
                    id: 'vMmOYL',
                  })}
                  required={true}
                />
                <div
                  className={clsx(
                    'flex grow rounded-lg items-center justify-center',
                    'p-4',
                    ['border', themeElementBorderColor, 'border-dashed'],
                  )}>
                  <div className="flex flex-col items-center gap-3">
                    <RiImageLine
                      aria-hidden={true}
                      className={clsx(
                        'w-10 h-10 shrink-0',
                        themeTextSecondaryColor,
                      )}
                    />
                    <Text color="secondary" display="block" size="body3">
                      WebP, PNG, JPG, GIF up to 5MB
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Text size="body2" weight="medium">
                    Live site URL
                  </Text>
                  <Tooltip
                    label={
                      <FormattedMessage
                        defaultMessage="The URL where your solution is hosted. Find our <link>recommended free hosting providers</link> if you haven\'t already."
                        description="Description for live site URL input on project submit page"
                        id="wP8dNq"
                        values={{
                          link: (chunks) => <Anchor>{chunks}</Anchor>,
                        }}
                      />
                    }>
                    <RiInformationLine
                      className={clsx('h-4', themeTextFaintColor)}
                    />
                  </Tooltip>
                </div>
                <ProjectsChallengeSubmitPageDeploymentDialog />
              </div>
              <Text color="secondary" size="body3">
                <FormattedMessage
                  defaultMessage="Provide at least 1 URL where you hosted your solution"
                  description="Description for live site URL input on project submit page"
                  id="g15ta9"
                />
              </Text>
              <div className="grid lg:grid-cols-2 gap-x-6 pt-4">
                <TextInput
                  label={intl.formatMessage({
                    defaultMessage: 'Pricing page',
                    description:
                      'Label for pricing page input on project submit page',
                    id: 'XzVqzs',
                  })}
                  placeholder="www.solution.com"
                  required={true}
                  type="url"
                />
                <TextInput
                  label={intl.formatMessage({
                    defaultMessage: 'Home page',
                    description:
                      'Label for home page input on project submit page',
                    id: 'FT5uOi',
                  })}
                  placeholder="www.solution.com"
                  required={true}
                  type="url"
                />
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-6">
              <div className="grid lg:grid-cols-2 gap-x-6">
                <TextInput
                  description={
                    <FormattedMessage
                      defaultMessage="1-2 lines on what the project is about, to be displayed on the Submission cards to attract the community to comment on your project"
                      description="Description for submission summary input on project submit page"
                      id="UpQB3R"
                    />
                  }
                  descriptionStyle="tooltip"
                  label={intl.formatMessage({
                    defaultMessage: 'Submission summary',
                    description:
                      'Label for submission summary input on project submit page',
                    id: '+AO/s+',
                  })}
                  maxLength={40}
                  required={true}
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-x-6 gap-y-8">
                <div className="flex flex-col grow gap-2">
                  <Label
                    description={intl.formatMessage({
                      defaultMessage:
                        'Describe your project approach and take the opportunity to document challenges and how they were overcome. To help others in the community, also describe your general tech stack and how they were used together, as well as any guides or resources you used.',
                      description: 'Project submission tooltip',
                      id: 'EO+aoa',
                    })}
                    descriptionStyle="tooltip"
                    label={intl.formatMessage({
                      defaultMessage: 'Implementation details',
                      description: 'Project submission label',
                      id: 'ne3JuA',
                    })}
                    required={true}
                  />
                  <RichTextEditor />
                </div>
                <Prose textSize="sm">
                  <h2>Example write-up</h2>
                  <h3>Tech stack and approach</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <h3>Useful resources and lessons</h3>
                  <p>
                    learnt Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Notes / Questions for
                    Community Ut enim ad minima veniam, quis nostrum
                    exercitationem ullam corporis suscipit laboriosam, nisi ut
                    aliquid ex ea commodi consequatur?
                  </p>
                </Prose>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Submit',
                description: 'Label for submit button on project submit page',
                id: 'uqV/yJ',
              })}
              size="lg"
              type="submit"
              variant="primary"
            />
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description: 'Label for cancel button on project submit page',
                id: 'WsLzW7',
              })}
              size="lg"
              variant="secondary"
            />
          </div>
        </form>
      </Section>
    </div>
  );
}
