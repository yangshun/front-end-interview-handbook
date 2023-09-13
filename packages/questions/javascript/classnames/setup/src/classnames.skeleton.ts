type ClassName =
  | string
  | number
  | boolean
  | undefined
  | null
  | Object
  | Array<ClassName>;

export default function classNames(...args: Array<ClassName>): string {
  throw 'Not implemented!';
}
