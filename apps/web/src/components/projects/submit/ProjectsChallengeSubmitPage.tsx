'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

import ProjectsChallengeSubmissionForm from './ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeSubmitPage({ challenge }: Props) {
  const intl = useIntl();
  const router = useI18nRouter();

  const createSubmissionMutation = trpc.projects.submissions.create.useMutation(
    {
      onSuccess: (submission) => {
        router.push(`/projects/s/${submission.id}`);
      },
    },
  );

  const { href } = challenge.metadata;

  return (
    <div>
      <div className="flex">
        <Button
          addonPosition="start"
          className="-ms-4 -mt-2"
          href={href}
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'To challenge',
            description: 'Link label to go back to the challenge details page',
            id: 'IGlDjB',
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
      <div className="mt-9">
        <Section>
          <ProjectsChallengeSubmissionForm
            mode="create"
            onSubmit={(data) => {
              createSubmissionMutation.mutate({
                slug: challenge.metadata.slug,
                ...data,
              });
            }}
          />
        </Section>
      </div>
    </div>
  );
}
