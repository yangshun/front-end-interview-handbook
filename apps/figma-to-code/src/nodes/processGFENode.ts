import * as autoLayoutChildrenPropsPrinter from './props/autoLayoutChildrenPropsPrinter';
import * as autoLayoutPropsPrinter from './props/autoLayoutPropsPrinter';
import * as blendPropsPrinter from './props/blendPropsPrinter';
import * as fillsPrinter from './props/fillsPrinter';
import * as frameNodePropsPrinter from './props/frameNodePropsPrinter';
import * as layoutPropsPrinter from './props/layoutPropsPrinter';
import * as strokesPropsPrinter from './props/strokesPropsPrinter';
import * as textNodePropsPrinter from './props/textNodePropsPrinter';
import type {
  GFECSSProperties,
  GFENodeMetadata,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './props/types';
import type { GFENode } from './types';

export function visitGFENode(node: GFENode) {
  type NewType = GFENodePropertiesList;

  const propertiesList: NewType = [];
  let content = null;

  const metadata: GFENodeMetadata = { type: null };
  const cssProperties: GFECSSProperties = {};
  const tailwindClasses: GFETailwindClasses = new Set();

  const extractionArgs = [
    propertiesList,
    cssProperties,
    tailwindClasses,
  ] as const;

  switch (node.type) {
    case 'TEXT': {
      metadata.type = 'INLINE';
      content = node.characters;

      textNodePropsPrinter.processFontName(metadata, node, ...extractionArgs);
      textNodePropsPrinter.processFontWeight(metadata, node, ...extractionArgs);
      textNodePropsPrinter.processFontSize(metadata, node, ...extractionArgs);
      textNodePropsPrinter.processLetterSpacing(
        metadata,
        node,
        ...extractionArgs,
      );
      textNodePropsPrinter.processLineHeight(metadata, node, ...extractionArgs);
      textNodePropsPrinter.processTextAlignHorizontal(
        metadata,
        node,
        ...extractionArgs,
      );
      textNodePropsPrinter.processTextDecoration(
        metadata,
        node,
        ...extractionArgs,
      );
      textNodePropsPrinter.processTextCase(metadata, node, ...extractionArgs);
      fillsPrinter.processFills(metadata, node, ...extractionArgs);

      blendPropsPrinter.processOpacity(metadata, node, ...extractionArgs);
      break;
    }
    case 'COMPONENT':
    case 'INSTANCE':
    case 'FRAME': {
      metadata.type = 'BLOCK';
      autoLayoutPropsPrinter.processPrimaryAxisSizingMode(
        metadata,
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processCounterAxisSizingMode(
        metadata,
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processLayoutMode(
        metadata,
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processLayoutWrap(
        metadata,
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processPrimaryAxisAlignItems(
        metadata,
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processCounterAxisAlignItems(
        metadata,
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processCounterAxisAlignContent(
        metadata,
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processSpacing(metadata, node, ...extractionArgs);

      autoLayoutChildrenPropsPrinter.processLayoutAlign(
        metadata,
        node,
        ...extractionArgs,
      );
      autoLayoutChildrenPropsPrinter.processLayoutGrow(
        metadata,
        node,
        ...extractionArgs,
      );

      layoutPropsPrinter.processLayoutSizingHorizontal(
        metadata,
        node,
        ...extractionArgs,
      );
      layoutPropsPrinter.processLayoutSizingVertical(
        metadata,
        node,
        ...extractionArgs,
      );

      fillsPrinter.processFills(metadata, node, ...extractionArgs);

      frameNodePropsPrinter.processPadding(metadata, node, ...extractionArgs);
      frameNodePropsPrinter.processCornerRadius(
        metadata,
        node,
        ...extractionArgs,
      );

      strokesPropsPrinter.processStrokeWeight(
        metadata,
        node,
        ...extractionArgs,
      );
      strokesPropsPrinter.processStrokesStyle(
        metadata,
        node,
        ...extractionArgs,
      );
      strokesPropsPrinter.processStrokesColor(
        metadata,
        node,
        ...extractionArgs,
      );

      blendPropsPrinter.processOpacity(metadata, node, ...extractionArgs);
      blendPropsPrinter.processEffects(metadata, node, ...extractionArgs);
      break;
    }
    case 'RECTANGLE': {
      metadata.type = 'BLOCK';
      layoutPropsPrinter.processLayoutSizingHorizontal(
        metadata,
        node,
        ...extractionArgs,
      );
      layoutPropsPrinter.processLayoutSizingVertical(
        metadata,
        node,
        ...extractionArgs,
      );

      blendPropsPrinter.processOpacity(metadata, node, ...extractionArgs);
      blendPropsPrinter.processEffects(metadata, node, ...extractionArgs);

      fillsPrinter.processFills(metadata, node, ...extractionArgs);
      break;
    }
    case 'VECTOR': {
      metadata.type = 'SVG';

      layoutPropsPrinter.processLayoutSizingHorizontal(
        metadata,
        node,
        ...extractionArgs,
      );
      layoutPropsPrinter.processLayoutSizingVertical(
        metadata,
        node,
        ...extractionArgs,
      );

      blendPropsPrinter.processOpacity(metadata, node, ...extractionArgs);
      blendPropsPrinter.processEffects(metadata, node, ...extractionArgs);

      fillsPrinter.processFills(metadata, node, ...extractionArgs);
      break;
    }
  }

  return {
    content,
    cssProperties,
    metadata,
    properties: propertiesList,
    tailwindClasses,
  };
}

type GFEHTMLNode = Readonly<{
  children: ReadonlyArray<GFEHTMLNode> | string | null;
  className: string | null;
  type: 'div' | 'img' | 'span' | 'svg';
}>;

export function transformGFENode(node: GFENode): GFEHTMLNode | undefined {
  const { metadata, content, tailwindClasses } = visitGFENode(node);

  switch (node.type) {
    case 'TEXT': {
      return {
        children: content,
        className: Array.from(tailwindClasses).join(' '),
        type: 'span',
      };
    }
    case 'COMPONENT':
    case 'INSTANCE':
    case 'FRAME': {
      return {
        children: node.children
          .map((childNode) => transformGFENode(childNode))
          .flatMap((htmlNode) => (htmlNode != null ? [htmlNode] : [])),
        className: Array.from(tailwindClasses).join(' '),
        type:
          metadata.type === 'BLOCK'
            ? 'div'
            : metadata.type === 'IMAGE'
              ? 'img'
              : metadata.type === 'INLINE'
                ? 'span'
                : 'div',
      };
    }
    case 'RECTANGLE': {
      return {
        children: null,
        className: Array.from(tailwindClasses).join(' '),
        type: metadata.type === 'IMAGE' ? 'img' : 'div',
      };
    }
    case 'VECTOR': {
      return {
        children: null,
        className: Array.from(tailwindClasses).join(' '),
        type: metadata.type === 'IMAGE' ? 'img' : 'svg',
      };
    }
  }
}

export function printGFEHTMLNode(node: GFEHTMLNode): string {
  const openingElement =
    `<${node.type}` +
    (node.className !== '' ? ` class="${node.className}"` : '') +
    `>`;
  const children = (() => {
    if (node.children == null) {
      return;
    }

    if (typeof node.children === 'string') {
      return node.children;
    }

    return node.children
      .map((childNode) => printGFEHTMLNode(childNode))
      .join('');
  })();
  const closingElement = `</${node.type}>`;

  return openingElement + (children || '') + closingElement;
}
