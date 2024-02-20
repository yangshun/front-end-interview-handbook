import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import Prose from '~/components/ui/Prose';
import RichTextEditor from '~/components/ui/RichTextEditor';

import { getProjectsChallengeSubmissionImplementationAttributes } from './ProjectsChallengeSubmissionImplementationSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'implementation';

export default function ProjectsChallengeSubmissionImplementationField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionImplementationAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <div className="grid gap-x-6 gap-y-8 lg:grid-cols-2">
      <RichTextEditor
        description={attrs.description}
        descriptionStyle="tooltip"
        errorMessage={formState.errors[fieldName]?.message}
        label={attrs.label}
        required={attrs.validation.required}
        {...field}
        minHeight="300px"
        onChange={(newValue) => {
          field.onChange({
            target: {
              value: newValue,
            },
          });
        }}
      />
      <Prose textSize="sm">
        {/* TODO(projects): add a proper example */}
        <h2>Example write-up</h2>
        <h3>Tech stack and approach</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <h3>Useful resources and lessons</h3>
        <p>
          learnt Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Notes / Questions for Community
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        </p>
      </Prose>
    </div>
  );
}
