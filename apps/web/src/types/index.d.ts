import type { DOMAttributes } from 'react';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export {};

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    /**
     * Boolean attribute indicating that the browser will ignore the element.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert MDN Web Docs}
     */
    inert?: '';
  }
}
