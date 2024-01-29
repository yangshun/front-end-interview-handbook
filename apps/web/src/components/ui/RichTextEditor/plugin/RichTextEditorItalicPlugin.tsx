import { RiItalic } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';
import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';

export default function RichTextEditorItalicPlugin() {
  const intl = useIntl();
  const { isItalic, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiItalic}
      isActive={isItalic}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Italic',
        description: 'Italic tooltip for Richtext toolbar',
        id: '4uXotU',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.italic)}
    />
  );
}
