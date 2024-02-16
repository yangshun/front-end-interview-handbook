import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';

import ProjectsProfileMotivationsField from './ProjectsProfileMotivationsField';

export default function ProjectsProfileMotivationSection() {
  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Motivations for joining"
          description="Title of motivation for joining section of projects profile edit page"
          id="DlMtVL"
        />
      </Heading>
      <ProjectsProfileMotivationsField />
    </div>
  );
}
