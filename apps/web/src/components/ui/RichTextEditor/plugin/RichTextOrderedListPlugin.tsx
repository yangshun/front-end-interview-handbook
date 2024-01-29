import { RiListOrdered2 } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/plugin/RichTextEditorToolbarActionNode';

export default function RichTextEditorOrderedListPlugin() {
  const intl = useIntl();
  const { isOrderedList, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiListOrdered2}
      isActive={isOrderedList}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Numbered list',
        description: 'Numbered list tooltip for Richtext toolbar',
        id: 'hkKaPn',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.ol)}
    />
  );
}
