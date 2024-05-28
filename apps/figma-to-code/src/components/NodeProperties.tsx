import clsx from 'clsx';
import { Fragment, h } from 'preact';

import { CopyCodeSection } from './CopyCodeSection';
import { HTMLCodeSection } from './HTMLCodeSection';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { visitGFENode } from '../nodes/processGFENode';
import type { GFENode } from '../nodes/types';

function PropertyRow({
  label,
  value,
}: Readonly<{
  label: string;
  value: number | string;
}>) {
  const [, copyCss] = useCopyToClipboard();

  return (
    <div
      className={clsx(
        'flex gap-2',
        'px-3 py-1',
        'w-full',
        'hover:bg-neutral-100 hover:dark:bg-neutral-700',
        'transition-colors',
      )}
      onClick={() => {
        copyCss(String(value));
      }}>
      <div
        className={clsx(
          'shrink-0 w-20 text-neutral-600 dark:text-neutral-300',
        )}>
        {label}
      </div>
      <div
        className={clsx(
          'grow truncate select-text',
          'text-neutral-950 dark:text-white',
        )}>
        {value}
      </div>
    </div>
  );
}

export function NodeProperties({
  node,
}: Readonly<{
  node: GFENode;
}>) {
  if (node == null) {
    return <div>Loading</div>;
  }

  const { content, properties, cssProperties, tailwindClasses } =
    visitGFENode(node);

  return (
    <div
      className={clsx(
        'divide-y divide-neutral-200 dark:divide-neutral-700',
        'pb-4',
      )}>
      <div className="py-3 flex flex-col gap-y-3">
        <h2 className="px-3 font-semibold">Properties</h2>
        <div>
          <PropertyRow label="Width" value={`${node.width}px`} />
          <PropertyRow label="Height" value={`${node.height}px`} />
          <Fragment>
            {properties.map(({ value, label }) => (
              <PropertyRow label={label} value={value} />
            ))}
          </Fragment>
        </div>
      </div>
      <CopyCodeSection
        title="CSS"
        code={
          <Fragment>
            {Object.entries(cssProperties).map(([key, value]) => (
              <div className="select-text whitespace-nowrap" key={key}>
                <span className="select-text">{key}</span>:{' '}
                <span
                  className={clsx(
                    'select-text',
                    value.toString().startsWith('"')
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-pink-500 dark:text-pink-400',
                  )}>
                  {value}
                </span>
                ;
              </div>
            ))}
          </Fragment>
        }
        codeToCopy={Object.entries(cssProperties)
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n')}
      />
      <CopyCodeSection
        title="Tailwind CSS"
        code={Array.from(tailwindClasses).join(' ')}
        codeToCopy={Array.from(tailwindClasses).join(' ')}
      />
      <CopyCodeSection title="Content" codeToCopy={content} code={content} />
      <HTMLCodeSection node={node} />
    </div>
  );
}
