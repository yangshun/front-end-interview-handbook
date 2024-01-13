'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
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
  const { showToast } = useToast();
  const router = useI18nRouter();

  const createSubmissionMutation = trpc.projects.submissions.create.useMutation(
    {
      onError: () => {
        showToast({
          title: intl.formatMessage({
            defaultMessage: 'Oops something went wrong',
            description: 'Error message',
            id: 'Nz7W/0',
          }),
          variant: 'danger',
        });
      },
      onSuccess: (submission) => {
        showToast({
          subtitle: intl.formatMessage({
            // TODO(projects): Actual rep gained.
            defaultMessage: 'You have gained XXX rep!',
            description: 'Success message after submitting a project',
            id: 'JiDkSH',
          }),
          title: intl.formatMessage({
            defaultMessage: 'Congratulations!',
            description: 'Success message',
            id: '5qLBww',
          }),
          variant: 'info',
        });
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
