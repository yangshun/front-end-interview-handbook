import { RiFontSize2, RiH1, RiH2, RiH3 } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';
import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import type { RichTextEditorHeadingType } from '~/components/ui/RichTextEditor/types';

export default function RichTextEditorTextTypePlugin() {
  const intl = useIntl();
  const { headingType, onClick } = useRichTextEditorOnClickListener();
  const typeOptions: Array<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: RichTextEditorHeadingType;
  }> = [
    {
      icon: RiFontSize2,
      label: intl.formatMessage({
        defaultMessage: 'Normal',
        description: 'Label for Normal',
        id: 'hYp7sF',
      }),
      value: 'normal',
    },
    {
      icon: RiH1,
      label: intl.formatMessage({
        defaultMessage: 'Heading 1',
        description: 'Label for heading 1',
        id: 'td/xb6',
      }),
      value: 'h1',
    },
    {
      icon: RiH2,
      label: intl.formatMessage({
        defaultMessage: 'Heading 2',
        description: 'Label for heading 2',
        id: 'gAcM0t',
      }),
      value: 'h2',
    },
    {
      icon: RiH3,
      label: intl.formatMessage({
        defaultMessage: 'Heading 3',
        description: 'Label for heading 3',
        id: 'F4qs12',
      }),
      value: 'h3',
    },
  ];

  const selectedValue = typeOptions.find((type) => type.value === headingType);

  return (
    <DropdownMenu
      align="end"
      icon={selectedValue?.icon ?? RiFontSize2}
      label={
        selectedValue?.label ??
        intl.formatMessage({
          defaultMessage: 'Normal',
          description: 'Label for Normal',
          id: 'hYp7sF',
        })
      }
      labelColor="inherit"
      size="xs"
      variant="flat">
      {typeOptions.map(({ label, value, icon }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={headingType === value}
          label={label}
          onClick={() => onClick(value)}
        />
      ))}
    </DropdownMenu>
  );
}
