import { RiListUnordered } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/plugin/RichTextEditorToolbarActionNode';

export default function RichTextEditorUnorderedListPlugin() {
  const intl = useIntl();
  const { isUnorderedList, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiListUnordered}
      isActive={isUnorderedList}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Bullet list',
        description: 'Bullet list tooltip for Richtext toolbar',
        id: 'KbLzJO',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.ul)}
    />
  );
}
