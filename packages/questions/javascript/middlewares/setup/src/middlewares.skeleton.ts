type MiddlewareFn =
  | ((context: any, next: () => Promise<void>) => Promise<void>)
  | ((context: any, next: () => Promise<void>) => void);

export default function middlewares(
  ...fns: Array<MiddlewareFn>
): (context?: any) => Promise<void> {
  throw 'Not implemented!';
}
