import { capitalize } from 'lodash-es';
import type { Paragraph, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const markers = ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'] as const;

export type RemarkAlertVariants = Lowercase<(typeof markers)[number]>;

const RE = new RegExp(`^\\[\\!(${markers.join('|')})\\]([^\\n\\r]*)`);

function getFirstTextContent(paragraph: Paragraph | undefined) {
  if (!paragraph) {
    return null;
  }

  let firstContent = paragraph.children?.[0];

  if (!firstContent) {
    return null;
  }

  if (
    !('value' in firstContent) &&
    'children' in firstContent &&
    firstContent.children[0]
  ) {
    firstContent = firstContent.children[0];
  }

  if (firstContent.type !== 'text') {
    return null;
  }

  return firstContent;
}

type RemarkAlertsOptions = {
  componentName?: string;
};

const remarkAlerts: Plugin<[RemarkAlertsOptions], Root> = ({
  componentName = 'MDXAlert',
}: RemarkAlertsOptions = {}) => {
  return (tree: any) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (index === undefined || !parent) {
        return;
      }

      const children = node.children as Array<Paragraph>;
      const firstParagraph = children[0];

      const firstContent = getFirstTextContent(firstParagraph);

      if (!firstContent) {
        return;
      }

      const match = firstContent.value.match(RE);

      if (!match) {
        return;
      }

      const type = match[1]?.toUpperCase() as (typeof markers)[number];
      const title = match[2]?.trim() || capitalize(type);

      // Remove callout
      firstContent.value = firstContent.value
        .slice(match[0].length)
        .trimStart();

      // Transform the blockquote to an Alert

      const variant = type.toLowerCase() as RemarkAlertVariants;

      node.data = {
        ...(node.data || {}),
        hName: componentName,
        hProperties: {
          title,
          variant: variant ?? 'note',
        },
      };
    });
  };
};

export default remarkAlerts;
