import type { LinkAttributes, SerializedAutoLinkNode } from '@lexical/link';
import {
  $createAutoLinkNode,
  $createLinkNode,
  AutoLinkNode,
  LinkNode,
} from '@lexical/link';
import { addClassNamesToElement } from '@lexical/utils';
import clsx from 'clsx';
import type { NodeKey } from 'lexical';
import { type SerializedElementNode, type Spread } from 'lexical';

import { anchorVariants } from '~/components/ui/Anchor';
import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

export type SerializedCustomLinkNode = Spread<
  {
    url: string;
  },
  Spread<LinkAttributes, SerializedElementNode>
>;

export class CustomLinkNode extends LinkNode {
  __customLinkWrapper?: (__url: string) => string;
  static getType() {
    return 'custom-link';
  }

  static clone(node: CustomLinkNode): CustomLinkNode {
    return new CustomLinkNode(
      node.__url,
      node?.__customLinkWrapper,
      { rel: node.__rel, target: node.__target, title: node.__title },
      node.__key,
    );
  }

  constructor(
    url: string,
    customLinkWrapper?: (__url: string) => string,
    attributes?: LinkAttributes,
    key?: NodeKey,
  ) {
    super(key ?? 'custom-link');
    this.__url = url;
    this.__target = attributes?.target ?? null;
    this.__rel = attributes?.rel ?? null;
    this.__title = attributes?.title ?? null;
    this.__customLinkWrapper = customLinkWrapper;
  }

  createDOM(): HTMLAnchorElement {
    const element = document.createElement('a');
    const finalHrefString = this.__url.toString();

    const className = anchorVariants({
      className: clsx(
        themeOutlineElement_FocusVisible,
        themeOutlineElementBrandColor_FocusVisible,
      ),
    });

    const finalHref = this.__customLinkWrapper
      ? this.__customLinkWrapper(finalHrefString)
      : finalHrefString;

    element.target = '_blank';
    element.href = finalHref;
    addClassNamesToElement(element, className);

    return element;
  }

  static importJSON(serializedNode: SerializedCustomLinkNode): LinkNode {
    const node = $createLinkNode(serializedNode.url, {
      rel: serializedNode.rel,
      target: serializedNode.target,
      title: serializedNode.title,
    });

    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);

    return node;
  }

  exportJSON(): SerializedCustomLinkNode {
    return {
      ...super.exportJSON(),
      rel: this.getRel(),
      target: this.getTarget(),
      title: this.getTitle(),
      type: 'custom-link',
      url: this.getURL(),
      version: 1,
    };
  }
}

export class CustomAutoLinkNode extends AutoLinkNode {
  __customLinkWrapper?: (__url: string) => string;
  static getType(): string {
    return 'custom-autolink';
  }

  static clone(node: CustomAutoLinkNode): CustomAutoLinkNode {
    return new CustomAutoLinkNode(
      node.__url,
      node?.__customLinkWrapper,
      { rel: node.__rel, target: node.__target, title: node.__title },
      node.__key,
    );
  }

  constructor(
    url: string,
    customLinkWrapper?: (__url: string) => string,
    attributes?: LinkAttributes,
    key?: NodeKey,
  ) {
    super(key ?? 'custom-autolink');
    this.__url = url;
    this.__target = attributes?.target ?? null;
    this.__rel = attributes?.rel ?? null;
    this.__title = attributes?.title ?? null;
    this.__customLinkWrapper = customLinkWrapper;
  }

  createDOM(): HTMLAnchorElement {
    const element = document.createElement('a');
    const finalHrefString = this.__url.toString();

    const className = anchorVariants({
      className: clsx(
        themeOutlineElement_FocusVisible,
        themeOutlineElementBrandColor_FocusVisible,
      ),
    });

    const finalHref = this.__customLinkWrapper
      ? this.__customLinkWrapper(finalHrefString)
      : finalHrefString;

    element.target = '_blank';
    element.href = finalHref;
    addClassNamesToElement(element, className);

    return element;
  }

  static importJSON(serializedNode: SerializedAutoLinkNode): AutoLinkNode {
    const node = $createAutoLinkNode(serializedNode.url, {
      rel: serializedNode.rel,
      target: serializedNode.target,
      title: serializedNode.title,
    });

    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);

    return node;
  }

  exportJSON(): SerializedAutoLinkNode {
    return {
      ...super.exportJSON(),
      type: 'custom-autolink',
      version: 1,
    };
  }
}
