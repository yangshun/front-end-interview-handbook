'use client';

import clsx from 'clsx';
import { RiLayoutColumnLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';

type CodingWorkspaceLayout = 'horizontal' | 'vertical';
type Props = Readonly<{
  layout: CodingWorkspaceLayout;
  onChangeLayout: (layout: CodingWorkspaceLayout) => void;
}>;

export default function CodingWorkspaceChangeLayoutButton({
  layout,
  onChangeLayout,
}: Props) {
  const intl = useIntl();

  return (
    <Button
      icon={({ className, ...others }) => (
        <RiLayoutColumnLine
          className={clsx(className, layout === 'horizontal' && 'rotate-90')}
          {...others}
        />
      )}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Layout',
        description:
          'Label for button that changes the layout of the coding workspace',
        id: 'tJIZWT',
      })}
      size="xs"
      tooltip={
        layout === 'horizontal'
          ? intl.formatMessage({
              defaultMessage: 'Change to vertical',
              description:
                'Tooltip for changing to vertical layout for coding workspace',
              id: 'OkgtcI',
            })
          : intl.formatMessage({
              defaultMessage: 'Change to horizontal',
              description:
                'Tooltip for changing to horizontal layout for coding workspace',
              id: '2a4of9',
            })
      }
      tooltipPosition="start"
      variant="secondary"
      onClick={() => {
        onChangeLayout(layout === 'horizontal' ? 'vertical' : 'horizontal');
      }}
    />
  );
}
