interface JQuery {
  css: (
    prop: string,
    value?: boolean | string | number,
  ) => JQuery | string | undefined;
}

export default function $(selector: string): JQuery {
  const element = document.querySelector(selector) as HTMLElement | null;

  return {
    css: function (prop, value) {
      // Getter case.
      if (value === undefined) {
        // No matching elements.
        if (element == null) {
          return undefined;
        }

        const value = element.style[prop as any];
        return value === '' ? undefined : value;
      }

      // Setter case.
      if (element != null) {
        element.style[prop as any] = String(value);
      }

      return this;
    },
  };
}
