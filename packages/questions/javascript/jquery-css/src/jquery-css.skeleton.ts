interface JQuery {
  css: (prop: string, value?: boolean | string | number) => JQuery;
}

export default function $(selector: string): JQuery {
  throw 'Not implemented!';
}
