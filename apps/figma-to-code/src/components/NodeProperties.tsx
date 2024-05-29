import clsx from 'clsx';
import { Fragment, h } from 'preact';

import { CopyCodeSection } from './CopyCodeSection';
import { HTMLCodeSection } from './HTMLCodeSection';
import { visitGFENode } from '../nodes/processGFENode';
import type { GFENode } from '../nodes/types';

export function NodeProperties({
  node,
}: Readonly<{
  node: GFENode;
}>) {
  if (node == null) {
    return <div>Loading</div>;
  }

  const { content, cssProperties, tailwindClasses } = visitGFENode(node);

  return (
    <div
      className={clsx(
        'divide-y divide-neutral-200 dark:divide-neutral-700',
        'pb-4',
      )}>
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
      <HTMLCodeSection node={node} />
      <CopyCodeSection title="Content" codeToCopy={content} code={content} />
    </div>
  );
}
