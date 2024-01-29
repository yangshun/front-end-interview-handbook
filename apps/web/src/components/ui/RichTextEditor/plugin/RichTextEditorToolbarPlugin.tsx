import clsx from 'clsx';
import { capitalize } from 'lodash-es';
import { useMediaQuery } from 'usehooks-ts';

import useRichTextEditorOnClickListener from '~/components/ui/RichTextEditor/hooks/useRichTextEditorOnClickListener';
import RichTextEditorBoldPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorBoldPlugin';
import RichTextEditorCodePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorCodePlugin';
import RichTextEditorInsertPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorInsertPlugin';
import RichTextEditorItalicPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorItalicPlugin';
import RichTextEditorQuotePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorQuotePlugin';
import RichTextEditorRedoPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorRedoPlugin';
import RichTextEditorSpecialCasePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorSpecialCasePlugin';
import RichTextEditorTextTypePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorTextTypePlugin';
import RichTextEditorUnderlinePlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorUnderlinePlugin';
import RichTextEditorUndoPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorUndoPlugin';
import RichTextEditorUnorderedListPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorUnorderedListPlugin';
import RichTextEditorOrderedListPlugin from '~/components/ui/RichTextEditor/plugin/RichTextOrderedListPlugin';
import Select from '~/components/ui/Select';
import { themeBorderElementColor } from '~/components/ui/theme';

function Divider() {
  return (
    <div className={clsx('h-6 w-[1px] bg-neutral-300 dark:bg-neutral-700')} />
  );
}

export default function RichTextEditorToolbarPlugin() {
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');
  const { isCode, codeLanguage, onCodeLanguageSelect, codeLanguages } =
    useRichTextEditorOnClickListener();

  return (
    <div
      className={clsx(
        'p-1 flex items-center gap-1 border-b flex-wrap',
        themeBorderElementColor,
      )}>
      {isCode ? (
        <>
          <RichTextEditorCodePlugin />
          <Select
            isLabelHidden={true}
            label="Code"
            options={codeLanguages.map((code) => ({
              label: capitalize(code),
              value: code,
            }))}
            size="sm"
            value={codeLanguage}
            onChange={onCodeLanguageSelect}
          />
        </>
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
          <RichTextEditorSpecialCasePlugin />

          {!isMobileAndBelow && (
            <>
              <RichTextEditorUnorderedListPlugin />
              <RichTextEditorOrderedListPlugin />
              <RichTextEditorCodePlugin />
              <RichTextEditorQuotePlugin />
              <RichTextEditorInsertPlugin />
            </>
          )}
        </>
      )}
    </div>
  );
}
