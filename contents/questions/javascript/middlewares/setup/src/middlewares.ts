type MiddlewareFn =
  | ((context: any, next: () => Promise<void>) => Promise<void>)
  | ((context: any, next: () => Promise<void>) => void);

export default function middlewares(
  ...fns: Array<MiddlewareFn>
): (context?: any) => Promise<void> {
  return async function (context = {}) {
    async function execute(index: number): Promise<void> {
      if (index === fns.length) {
        return;
      }

      const fn = fns[index];
      await fn(context, () => execute(index + 1));
    }

    await execute(0);
  };
}
