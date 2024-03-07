import clsx from 'clsx';
import type { SerializedElementNode, Spread } from 'lexical';
import URL from 'url';

import { anchorVariants } from '~/components/ui/Anchor';
import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import { i18nHref } from '~/next-i18nostic/src';

import type { LinkAttributes } from '@lexical/link';
import { LinkNode } from '@lexical/link';
import { addClassNamesToElement } from '@lexical/utils';

export type SerializedCustomLinkNode = Spread<
  {
    url: string;
  },
  Spread<LinkAttributes, SerializedElementNode>
>;

export class CustomLinkNode extends LinkNode {
  static getType() {
    return 'custom-link';
  }

  static clone(node: CustomLinkNode): CustomLinkNode {
    return new CustomLinkNode(
      node.__url,
      { rel: node.__rel, target: node.__target, title: node.__title },
      node.__key,
    );
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

    const warnLink = URL.format(
      i18nHref({
        pathname: '/link',
        query: {
          u: encodeURI(finalHrefString),
        },
      }),
    );

    element.target = '_blank';
    element.href = warnLink;
    addClassNamesToElement(element, className);

    return element;
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
