import { Banner, IconInfo32 } from '@create-figma-plugin/ui';
import clsx from 'clsx';
import { Fragment, h } from 'preact';

import { visitGFENode } from '../nodes/processGFENode';
import type { GFESceneNode } from '../nodes/types';
import { CopyCodeSection } from './CopyCodeSection';
import { HTMLCodeSection } from './HTMLCodeSection';

export function NodeProperties({
  node,
}: Readonly<{
  node: GFESceneNode;
}>) {
  if (node == null) {
    return <div>Loading</div>;
  }

  const { metadata, cssProperties, tailwindClasses } = visitGFENode(node);

  return (
    <div className={clsx('flex flex-col h-full')}>
      <div
        className={clsx(
          'grow',
          'divide-y divide-neutral-200 dark:divide-neutral-700',
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
        <CopyCodeSection
          title="Content"
          codeToCopy={metadata.content}
          code={metadata.content}
        />
      </div>
      <div className="shrink-0">
        <Banner variant="warning" icon={<IconInfo32 />}>
          Figma designs cannot always be converted to code accurately. Please
          manually verify the results.
        </Banner>
      </div>
    </div>
  );
}
