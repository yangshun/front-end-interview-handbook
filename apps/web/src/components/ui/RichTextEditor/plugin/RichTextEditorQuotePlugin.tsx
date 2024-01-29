import { RiQuoteText } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';
import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';

export default function RichTextEditorQuotePlugin() {
  const intl = useIntl();
  const { isQuote, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiQuoteText}
      isActive={isQuote}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Quote',
        description: 'Quote tooltip for richtext toolbar',
        id: 'd4ZiFU',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.quote)}
    />
  );
}
