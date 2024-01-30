import { RiImageLine, RiLink, RiRulerLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';

type RichTextEditorInsertType = 'horizontal' | 'image' | 'link';

export default function RichTextEditorInsertPlugin() {
  const intl = useIntl();
  const insertOptions: Array<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: RichTextEditorInsertType;
  }> = [
    {
      icon: RiLink,
      label: intl.formatMessage({
        defaultMessage: 'Link',
        description: 'Label for link',
        id: 'ftK9zU',
      }),
      value: 'link',
    },
    {
      icon: RiRulerLine,
      label: intl.formatMessage({
        defaultMessage: 'Horizontal rule',
        description: 'Label for horizontal rule',
        id: 'RuN/vS',
      }),
      value: 'horizontal',
    },
    {
      icon: RiImageLine,
      label: intl.formatMessage({
        defaultMessage: 'Image',
        description: 'Label for image',
        id: 'nw9bBh',
      }),
      value: 'image',
    },
  ];

  return (
    <DropdownMenu align="start" label="Insert" size="xs" variant="flat">
      {insertOptions.map(({ label, value, icon }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={false}
          label={label}
          onClick={() => {}}
        />
      ))}
    </DropdownMenu>
  );
}
