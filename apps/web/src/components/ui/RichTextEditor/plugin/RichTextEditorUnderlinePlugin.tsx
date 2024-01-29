import { RiUnderline } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';
import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import { richTextEditorToolbarEventTypes } from '~/components/ui/RichTextEditor/misc';

export default function RichTextEditorUnderlinePlugin() {
  const intl = useIntl();
  const { isUnderline, onClick } = useRichTextEditorOnClickListener();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiUnderline}
      isActive={isUnderline}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Underline',
        description: 'Underline tooltip for Richtext toolbar',
        id: '7tztU9',
      })}
      onClick={() => onClick(richTextEditorToolbarEventTypes.underline)}
    />
  );
}
