import * as autoLayoutChildrenPropsPrinter from './props/autoLayoutChildrenPropsPrinter';
import * as autoLayoutPropsPrinter from './props/autoLayoutPropsPrinter';
import * as blendPropsPrinter from './props/blendPropsPrinter';
import * as frameNodePropsPrinter from './props/frameNodePropsPrinter';
import * as layoutPropsPrinter from './props/layoutPropsPrinter';
import * as strokesPropsPrinter from './props/strokesPropsPrinter';
import * as textNodePropsPrinter from './props/textNodePropsPrinter';
import type {
  GFECSSProperties,
  GFENodePropertiesList,
  GFETailwindClasses,
} from './props/types';
import type { GFENode } from './types';

export function visitGFENode(node: GFENode) {
  type NewType = GFENodePropertiesList;

  const propertiesList: NewType = [];
  let content = null;
  const cssProperties: GFECSSProperties = {};
  const tailwindClasses: GFETailwindClasses = new Set();

  const extractionArgs = [
    propertiesList,
    cssProperties,
    tailwindClasses,
  ] as const;

  switch (node.type) {
    case 'TEXT': {
      content = node.characters;

      textNodePropsPrinter.processFontName(node, ...extractionArgs);
      textNodePropsPrinter.processFontWeight(node, ...extractionArgs);
      textNodePropsPrinter.processFontSize(node, ...extractionArgs);
      textNodePropsPrinter.processLetterSpacing(node, ...extractionArgs);
      textNodePropsPrinter.processLineHeight(node, ...extractionArgs);
      textNodePropsPrinter.processTextAlignHorizontal(node, ...extractionArgs);
      textNodePropsPrinter.processTextDecoration(node, ...extractionArgs);
      textNodePropsPrinter.processTextCase(node, ...extractionArgs);
      textNodePropsPrinter.processFills(node, ...extractionArgs);

      blendPropsPrinter.processOpacity(node, ...extractionArgs);
      break;
    }
    case 'COMPONENT':
    case 'INSTANCE':
    case 'FRAME': {
      autoLayoutPropsPrinter.processPrimaryAxisSizingMode(
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processCounterAxisSizingMode(
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processLayoutMode(node, ...extractionArgs);
      autoLayoutPropsPrinter.processLayoutWrap(node, ...extractionArgs);
      autoLayoutPropsPrinter.processPrimaryAxisAlignItems(
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processCounterAxisAlignItems(
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processCounterAxisAlignContent(
        node,
        ...extractionArgs,
      );
      autoLayoutPropsPrinter.processSpacing(node, ...extractionArgs);

      autoLayoutChildrenPropsPrinter.processLayoutAlign(
        node,
        ...extractionArgs,
      );
      autoLayoutChildrenPropsPrinter.processLayoutGrow(node, ...extractionArgs);

      layoutPropsPrinter.processLayoutSizingHorizontal(node, ...extractionArgs);
      layoutPropsPrinter.processLayoutSizingVertical(node, ...extractionArgs);

      frameNodePropsPrinter.processPadding(node, ...extractionArgs);
      frameNodePropsPrinter.processFills(node, ...extractionArgs);
      frameNodePropsPrinter.processCornerRadius(node, ...extractionArgs);

      strokesPropsPrinter.processStrokeWeight(node, ...extractionArgs);
      strokesPropsPrinter.processStrokesStyle(node, ...extractionArgs);
      strokesPropsPrinter.processStrokesColor(node, ...extractionArgs);

      blendPropsPrinter.processOpacity(node, ...extractionArgs);
      blendPropsPrinter.processEffects(node, ...extractionArgs);
      break;
    }
  }

  return {
    content,
    cssProperties,
    properties: propertiesList,
    tailwindClasses,
  };
}

type GFEHTMLNode = Readonly<{
  children: ReadonlyArray<GFEHTMLNode> | string | null;
  className: string | null;
  type: 'div' | 'span';
}>;

export function transformGFENode(node: GFENode): GFEHTMLNode | undefined {
  const { content, tailwindClasses } = visitGFENode(node);

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
        type: 'div',
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

  return openingElement + children + closingElement;
}
