import { RiListUnordered, RiMacbookLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { BlogViewField } from '~/components/blog/BlogTypes';
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
        defaultMessage: 'List View',
        description: 'View option for blog list- List View',
        id: '2nYCLe',
      }),
      value: 'list',
    },
    {
      icon: RiMacbookLine,
      label: intl.formatMessage({
        defaultMessage: 'Article View',
        description: 'View option for blog list- Article View',
        id: 'OP75e8',
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
