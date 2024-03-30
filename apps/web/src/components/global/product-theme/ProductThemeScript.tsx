import type { ProductTheme } from './ProductThemeManager';
import useProductTheme from './useProductTheme';

type Props = Readonly<{
  theme: ProductTheme;
}>;

/**
 * Sets the theme on <body> and unsets when unmounts.
 * Warning: assumes only one present on the page, otherwise the last one that runs wins.
 */
export function ProductThemeScript({ theme }: Props) {
  useProductTheme(theme);

  // Eagerly sets the theme value on the <html> while the HTML is being parsed so that users can see
  // the current theme without waiting for the side effect within useProductTheme
  // which requires JavaScript to run.
  // Can only be set if the theme hasn't been set.
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{if(!document.documentElement.dataset.theme){document.documentElement.dataset.theme='${theme}';}}catch{}`,
      }}
      id="product-theme"
    />
  );
}
