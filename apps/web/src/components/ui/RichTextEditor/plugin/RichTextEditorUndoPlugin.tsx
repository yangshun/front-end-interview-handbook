import { RiArrowGoBackLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/plugin/RichTextEditorToolbarActionNode';

export default function RichTextEditorUndoPlugin() {
  const intl = useIntl();
  const { canUndo, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiArrowGoBackLine}
      isDisabled={!canUndo}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Undo',
        description: 'Undo tooltip for richtext toolbar',
        id: 'KQfZUe',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.undo)}
    />
  );
}
