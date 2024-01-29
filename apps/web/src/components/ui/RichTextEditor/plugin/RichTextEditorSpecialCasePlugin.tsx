import {
  RiFontSize,
  RiStrikethrough,
  RiSubscript,
  RiSuperscript,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';
import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import type { RichTextEditorSpecialCase } from '~/components/ui/RichTextEditor/types';
import Tooltip from '~/components/ui/Tooltip';

export default function RichTextEditorSpecialCasePlugin() {
  const intl = useIntl();
  const { specialCase, onClick } = useRichTextEditorOnClickListener();
  const caseOptions: Array<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    value: RichTextEditorSpecialCase;
  }> = [
    {
      icon: RiStrikethrough,
      label: intl.formatMessage({
        defaultMessage: 'Strikethrough',
        description: 'Label for strikethrough',
        id: 'j06fZl',
      }),
      value: 'strikethrough',
    },
    {
      icon: RiSubscript,
      label: intl.formatMessage({
        defaultMessage: 'Subscript',
        description: 'Label for subscript',
        id: 'ZqJYfb',
      }),
      value: 'subscript',
    },
    {
      icon: RiSuperscript,
      label: intl.formatMessage({
        defaultMessage: 'Superscript',
        description: 'Label for superscript',
        id: 'RsPxKM',
      }),
      value: 'superscript',
    },
  ];

  const selectedValue = caseOptions.find((type) => type.value === specialCase);

  const menu = (
    <DropdownMenu
      align="end"
      icon={selectedValue?.icon ?? RiFontSize}
      isLabelHidden={true}
      label={selectedValue?.label ?? ''}
      labelVariant="brand"
      size="sm"
      variant="flat">
      {caseOptions.map(({ label, value, icon }) => (
        <DropdownMenu.Item
          key={value}
          icon={icon}
          isSelected={specialCase === value}
          label={label}
          onClick={() => onClick(value)}
        />
      ))}
    </DropdownMenu>
  );

  return specialCase === null ? (
    menu
  ) : (
    <Tooltip label={selectedValue?.label} position="above">
      {menu}
    </Tooltip>
  );
}
