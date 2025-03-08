import { RiRulerLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import RichTextEditorToolbarActionNode from '~/components/ui/RichTextEditor/components/RichTextEditorToolbarActionNode';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';

export default function RichTextEditorHorizontalRulePlugin() {
  const intl = useIntl();
  const [editor] = useLexicalComposerContext();

  return (
    <RichTextEditorToolbarActionNode
      icon={RiRulerLine}
      tooltipLabel={intl.formatMessage({
        defaultMessage: 'Horizontal rule',
        description: 'Label for horizontal rule',
        id: 'RuN/vS',
      })}
      onClick={() =>
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
      }
    />
  );
}
