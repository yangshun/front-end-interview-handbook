import { RiQuoteText } from 'react-icons/ri';

import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/plugin/RichTextEditorToolbarActionNode';

export default function RichTextEditorQuotePlugin() {
  const { isQuote, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiQuoteText}
      isActive={isQuote}
      onClick={() => onClick(richTextEditorToolbarEventTypes.quote)}
    />
  );
}
