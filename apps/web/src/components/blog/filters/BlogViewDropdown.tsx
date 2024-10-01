import { RiListUnordered, RiMacbookLine } from 'react-icons/ri';

import type { BlogViewField } from '~/components/blog/BlogTypes';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

type Props = Readonly<{
  onChange: (value: BlogViewField) => void;
  viewField: BlogViewField;
}>;

export default function BlogViewDropdown({ viewField, onChange }: Props) {
  const intl = useIntl();
  const viewOptions: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: BlogViewField;
  }> = [
    {
      icon: RiListUnordered,
      label: intl.formatMessage({
        defaultMessage: 'List view',
        description: 'View option for blog list',
        id: '/iXiP2',
      }),
      value: 'list',
    },
    {
      icon: RiMacbookLine,
      label: intl.formatMessage({
        defaultMessage: 'Article view',
        description: 'View option for blog list',
        id: 'O0Nl6x',
      }),
      value: 'article',
    },
  ];
  const selectedField = viewOptions.filter(
    (option) => option.value === viewField,
  )?.[0];

  return (
    <DropdownMenu
      align="end"
      icon={selectedField.icon ?? RiListUnordered}
      isLabelHidden={false}
      label={
        selectedField.label ??
        intl.formatMessage({
          defaultMessage: 'View',
          description: 'Label for view button',
          id: 'wdjeYA',
        })
      }
      showChevron={false}
      size="sm">
      {viewOptions.map(({ label, value, icon }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={viewField === value}
          label={label}
          onClick={() => {
            onChange(value);
          }}
        />
      ))}
    </DropdownMenu>
  );
}
