import { RiArrowGoForwardLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/plugin/RichTextEditorToolbarActionNode';

export default function RichTextEditorRedoPlugin() {
  const intl = useIntl();
  const { canRedo, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiArrowGoForwardLine}
      isDisabled={!canRedo}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Redo',
        description: 'Redo tooltip for Richtext toolbar',
        id: 'u2wpqq',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.redo)}
    />
  );
}
