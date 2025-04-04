type MiddlewareFn =
  | ((context: any, next: () => Promise<void>) => Promise<void>)
  | ((context: any, next: () => Promise<void>) => void);

export default function middlewares(
  ...fns: Array<MiddlewareFn>
): (context?: any) => Promise<void> {
  return function (context = {}) {
    function execute(index: number): Promise<void> {
      if (index === fns.length) {
        return Promise.resolve();
      }

      const fn = fns[index];
      return Promise.resolve(fn(context, () => execute(index + 1)));
    }

    return execute(0);
  };
}
