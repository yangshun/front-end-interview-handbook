import { RiCodeSSlashLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';
import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';

export default function RichTextEditorCodePlugin() {
  const intl = useIntl();
  const { isCode, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiCodeSSlashLine}
      isActive={isCode}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Insert code block',
        description: 'Insert code block tooltip for Richtext toolbar',
        id: 'm2WYh/',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.code)}
    />
  );
}
