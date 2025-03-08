import clsx from 'clsx';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import RichTextEditorBoldPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorBoldPlugin';
import RichTextEditorCodePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorCodePlugin';
import RichTextEditorHorizontalRulePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorHorizontalRulePlugin';
import RichTextEditorInlineCodePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorInlineCodePlugin';
import RichTextEditorItalicPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorItalicPlugin';
import RichTextEditorOrderedListPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorOrderedListPlugin';
import RichTextEditorQuotePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorQuotePlugin';
import RichTextEditorRedoPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorRedoPlugin';
import RichTextEditorSpecialCasePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorSpecialCasePlugin';
import RichTextEditorTextTypePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorTextTypePlugin';
import RichTextEditorUnderlinePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorUnderlinePlugin';
import RichTextEditorUndoPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorUndoPlugin';
import RichTextEditorUnorderedListPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorUnorderedListPlugin';
import { themeBorderElementColor } from '~/components/ui/theme';

import RichTextEditorLinkActionNode from '../plugin/RichTextEditorLinkActionNode';

type Props = Readonly<{
  floatingAnchorElem: HTMLDivElement | null;
}>;

function Divider() {
  return <div className={clsx('h-5 border-l', themeBorderElementColor)} />;
}

export default function RichTextEditorToolbar({ floatingAnchorElem }: Props) {
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');
  const [isCode, setIsCode] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null,
  );

  const codePlugin = (
    <RichTextEditorCodePlugin
      codeLanguage={codeLanguage}
      isCode={isCode}
      selectedElementKey={selectedElementKey}
      setCodeLanguage={setCodeLanguage}
      setIsCode={setIsCode}
      setSelectedElementKey={setSelectedElementKey}
    />
  );

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center',
        'p-1',
        'gap-1',
        'text-neutral-600 dark:text-neutral-200',
        ['border-b', themeBorderElementColor],
      )}>
      {isCode ? (
        codePlugin
      ) : (
        <>
          <RichTextEditorUndoPlugin />
          <RichTextEditorRedoPlugin />
          <Divider />
          <RichTextEditorTextTypePlugin />
          <Divider />
          <RichTextEditorBoldPlugin />
          <RichTextEditorItalicPlugin />
          <RichTextEditorUnderlinePlugin />
          <RichTextEditorLinkActionNode
            floatingAnchorElem={floatingAnchorElem}
          />
          <Divider />
          <RichTextEditorHorizontalRulePlugin />
          <RichTextEditorInlineCodePlugin />
          <RichTextEditorSpecialCasePlugin />
          {!isMobileAndBelow && (
            <>
              <RichTextEditorUnorderedListPlugin />
              <RichTextEditorOrderedListPlugin />
              {codePlugin}
              <RichTextEditorQuotePlugin />
            </>
          )}
        </>
      )}
    </div>
  );
}
