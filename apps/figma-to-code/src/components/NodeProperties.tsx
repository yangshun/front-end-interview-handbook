import clsx from 'clsx';
import { Fragment, h } from 'preact';

import { CopyCodeSection } from './CopyCodeSection';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { processGFENode } from '../nodes/processGFENode';
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
        'w-full hover:bg-neutral-100 transition-colors',
      )}
      onClick={() => {
        copyCss(String(value));
      }}>
      <div className="shrink-0 w-20 text-neutral-500">{label}</div>
      <div className="grow truncate select-text">{value}</div>
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
    processGFENode(node);

  return (
    <div className={clsx('divide-y divide-neutral-200', 'pb-4')}>
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
              <div className="select-text" key={key}>
                <span className="select-text">{key}</span>:{' '}
                <span
                  className={clsx(
                    'select-text',
                    value.toString().startsWith('"')
                      ? 'text-green-600'
                      : 'text-pink-500',
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
    </div>
  );
}
