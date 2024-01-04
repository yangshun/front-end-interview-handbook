'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import type { ProjectsProjectMetadata } from '~/components/projects/details/types';
import ProjectsOtherTechStackInput from '~/components/projects/skills/ProjectsOtherTechStackInput';
import ProjectsSkillInput from '~/components/projects/skills/ProjectsSkillInput';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  project: ProjectsProjectMetadata;
}>;

export default function ProjectsProjectSubmitPage({ project }: Props) {
  const { href } = project;
  const intl = useIntl();

  return (
    <Container className="flex flex-col items-stretch pb-10 pt-4 lg:pb-20 lg:pt-16">
      <Button
        addonPosition="start"
        className="self-start -ms-3"
        href={href}
        icon={RiArrowLeftLine}
        label={intl.formatMessage({
          defaultMessage: 'To project',
          description: 'Label of To Project button on project submit page',
          id: 'R8BLW9',
        })}
        variant="tertiary"
      />
      <Heading className="mt-8" level="heading5">
        <FormattedMessage
          defaultMessage="Submission checklist"
          description="Title for the project submission checklist section"
          id="V4qTW5"
        />
      </Heading>
      <Section>
        <div className="grid lg:grid-cols-2 gap-x-6 mt-9">
          <div className="flex flex-col">
            <TextInput
              description={intl.formatMessage(
                {
                  defaultMessage:
                    "An eye-catching name to describe your solution.{br}{br}Will be displayed under the original Project's name and help other users identify your submission.",
                  description:
                    'Description for submission name input on project submit page',
                  id: 'bDWkt7',
                },
                {
                  br: <br />,
                },
              )}
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
                description: 'Label for skills input on project submit page',
                id: 'KC1Rzx',
              })}
            />
            <ProjectsOtherTechStackInput value={[]} onChange={() => {}} />
          </div>
          <div className="bg-red/20 h-[268px] rounded-lg flex items-center justify-center">
            <Text>[PLACEHOLDER] Image picker for Screenshot of solution</Text>
          </div>
        </div>
        <Divider className="my-12" />
        <div className="grid lg:grid-cols-2 gap-x-6">
          <TextInput
            description={
              <FormattedMessage
                defaultMessage="The URL where your solution is hosted. Find our <link>recommended free hosting providers</link> if you haven\'t already."
                description="Description for live site URL input on project submit page"
                id="wP8dNq"
                values={{
                  link: (chunks) => <Anchor>{chunks}</Anchor>,
                }}
              />
            }
            descriptionStyle="tooltip"
            label={intl.formatMessage({
              defaultMessage: 'Live site URL',
              description:
                'Label for live site URL input on project submit page',
              id: 't/yfeM',
            })}
            required={true}
            type="url"
          />
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
            required={true}
            type="url"
          />
        </div>
        <Divider className="my-12" />
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
            required={true}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-x-6 mt-6 gap-y-8">
          <div className="bg-red/20 h-[508px] rounded-lg flex items-center justify-center">
            <Text>[PLACEHOLDER] Implementation details</Text>
          </div>
          <div className="bg-red/20 h-[380px] rounded-lg flex items-center justify-center">
            <Text>[PLACEHOLDER] Example write-up</Text>
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
      </Section>
    </Container>
  );
}
