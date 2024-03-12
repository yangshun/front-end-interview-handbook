import clsx from 'clsx';
import { RiInformationLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FieldView } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextFaintColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsProfileMotivationsField from './ProjectsProfileMotivationsField';

export default function ProjectsProfileMotivationSection({
  view,
}: {
  view: FieldView;
}) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Heading level="heading6">
          <div className="flex items-center gap-1">
            <FormattedMessage
              defaultMessage="Motivation for joining"
              description="Title of motivation for joining section of projects profile edit page"
              id="k+36tk"
            />
            <Tooltip
              label={intl.formatMessage({
                defaultMessage:
                  'Tell the community about your motivations for joining this platform',
                description:
                  'Description for "Motivation for joining" for projects profile page',
                id: 'bvzjIm',
              })}>
              <RiInformationLine className={clsx('h-4', themeTextFaintColor)} />
            </Tooltip>
          </div>
        </Heading>
        <Text color="secondary" display="block" size="body2">
          <FormattedMessage
            defaultMessage="Choose up to 2 reasons:"
            description="Subtitle of motivation for joining section of projects profile edit page"
            id="1zX8Aw"
          />
        </Text>
      </div>
      <ProjectsProfileMotivationsField view={view} />
    </div>
  );
}
