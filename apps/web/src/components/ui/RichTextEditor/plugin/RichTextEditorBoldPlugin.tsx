import { RiBold } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';
import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';

export default function RichTextEditorBoldPlugin() {
  const intl = useIntl();
  const { isBold, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiBold}
      isActive={isBold}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Bold',
        description: 'Bold tooltip for Richtext toolbar',
        id: '8yHADh',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.bold)}
    />
  );
}
