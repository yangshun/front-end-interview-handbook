import { useIntl } from 'react-intl';

import Label from '~/components/ui/Label';
import Prose from '~/components/ui/Prose';

import { getProjectsChallengeSubmissionImplementationAttributes } from './ProjectsChallengeSubmissionImplementationSchema';
import RichTextEditor from '../RichTextEditor';

export default function ProjectsChallengeSubmissionImplementationField() {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionImplementationAttributes(intl);

  return (
    <div className="grid lg:grid-cols-2 gap-x-6 gap-y-8">
      <div className="flex flex-col grow gap-2">
        <Label
          description={attrs.description}
          descriptionStyle="tooltip"
          label={attrs.label}
          required={attrs.validation.required}
        />
        <RichTextEditor />
      </div>
      <Prose textSize="sm">
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
