import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { RiInformationLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsProfileSocialInput from '~/components/projects/profile/edit/ProjectsProfileSocialInput';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';
import { themeTextFaintColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Values = ProjectsProfileEditFormValues;

export default function ProjectsProfileSocialSection() {
  const intl = useIntl();
  const { control } = useFormContext<Values>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Social links"
            description="Title of social links section of projects profile edit page"
            id="a3gDom"
          />
        </Heading>
        <Tooltip
          label={intl.formatMessage({
            defaultMessage: 'Add your socials so that others can find you!',
            description:
              'Description for social link input on Projects profile onboarding page',
            id: 'SbE8XR',
          })}>
          <RiInformationLine className={clsx('h-4', themeTextFaintColor)} />
        </Tooltip>
      </div>
      <ProjectsProfileSocialInput control={control} />
    </div>
  );
}
