'use client';

import clsx from 'clsx';
import { RiArrowLeftLine, RiImageLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import type { ProjectsChallengeItem } from '~/components/projects/details/types';
import ProjectsOtherTechStackInput from '~/components/projects/skills/ProjectsOtherTechStackInput';
import ProjectsSkillInput from '~/components/projects/skills/ProjectsSkillInput';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Label from '~/components/ui/Label';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import {
  themeElementBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import ProjectsChallengeDeploymentUrlField from './fields/ProjectsChallengeSubmissionDeploymentUrlField';
import ProjectsChallengeSubmissionImplementationField from './fields/ProjectsChallengeSubmissionImplementationField';
import ProjectsChallengeRepositoryUrlField from './fields/ProjectsChallengeSubmissionRepositoryUrlField';
import ProjectsChallengeSubmissionSummaryField from './fields/ProjectsChallengeSubmissionSummaryField';
import ProjectsChallengeTitleField from './fields/ProjectsChallengeSubmissionTitleField';
import ProjectsChallengeSubmitPageDeploymentDialog from './ProjectsChallengeSubmitPageDeploymentDialog';
import RichTextEditor from './RichTextEditor';

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
                <ProjectsChallengeTitleField />
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
                <ProjectsChallengeRepositoryUrlField />
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
            <div className="grid lg:grid-cols-2 gap-x-6">
              <div className="flex flex-col gap-2">
                <ProjectsChallengeDeploymentUrlField />
                <ProjectsChallengeSubmitPageDeploymentDialog />
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-6">
              <div className="grid lg:grid-cols-2 gap-x-6">
                <ProjectsChallengeSubmissionSummaryField />
              </div>
              <ProjectsChallengeSubmissionImplementationField />
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <h3>Useful resources and lessons</h3>
                <p>
                  learnt Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Notes / Questions for Community Ut enim ad
                  minima veniam, quis nostrum exercitationem ullam corporis
                  suscipit laboriosam, nisi ut aliquid ex ea commodi
                  consequatur?
                </p>
              </Prose>
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
