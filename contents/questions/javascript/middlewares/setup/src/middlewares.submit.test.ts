import middlewares from './middlewares';

async function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

describe('middlewares', () => {
  describe('return values', () => {
    test('returns a function', () => {
      const fn = middlewares();
      expect(typeof fn).toBe('function');
    });

    test('returns a function that returns a promise', () => {
      const fn = middlewares();
      const result = fn();
      expect(result).toBeInstanceOf(Promise);
      expect(typeof result.then).toBe('function');
      expect(typeof result.catch).toBe('function');
    });
  });

  test('no functions', async () => {
    const calls: string[] = [];

    const fn = middlewares();

    await fn({});
    expect(calls).toEqual([]);
  });

  test('one function', async () => {
    const calls: string[] = [];

    function f1(ctx: any, next: Function) {
      calls.push('f1-start');
      next();
      calls.push('f1-end');
    }

    const fn = middlewares(f1);

    await fn({});
    expect(calls).toEqual(['f1-start', 'f1-end']);
  });

  describe('two functions', () => {
    test('synchronous', async () => {
      const calls: string[] = [];

      function f1(ctx: any, next: Function) {
        calls.push('f1-start');
        next();
        calls.push('f1-end');
      }

      function f2(ctx: any, next: Function) {
        calls.push('f2-start');
        next();
        calls.push('f2-end');
      }

      const fn = middlewares(f1, f2);

      await fn({});
      expect(calls).toEqual(['f1-start', 'f2-start', 'f2-end', 'f1-end']);
    });

    test('asynchronous', async () => {
      const calls: string[] = [];

      async function f1(ctx: any, next: Function) {
        calls.push('f1-start');
        await next();
        calls.push('f1-end');
      }

      async function f2(ctx: any, next: Function) {
        calls.push('f2-start');
        sleep(300);
        await next();
        calls.push('f2-end');
      }

      const fn = middlewares(f1, f2);

      await fn({});
      expect(calls).toEqual(['f1-start', 'f2-start', 'f2-end', 'f1-end']);
    });
  });

  describe('three functions', () => {
    test('synchronous', async () => {
      const calls: string[] = [];

      function f1(ctx: any, next: Function) {
        calls.push('f1-start');
        next();
        calls.push('f1-end');
      }

      function f2(ctx: any, next: Function) {
        calls.push('f2-start');
        next();
        calls.push('f2-end');
      }

      function f3(ctx: any, next: Function) {
        calls.push('f3-start');
        next();
        calls.push('f3-end');
      }

      const fn = middlewares(f1, f2, f3);

      await fn({});
      expect(calls).toEqual([
        'f1-start',
        'f2-start',
        'f3-start',
        'f3-end',
        'f2-end',
        'f1-end',
      ]);
    });

    test('asynchronous', async () => {
      const calls: string[] = [];

      async function f1(ctx: any, next: Function) {
        calls.push('f1-start');
        await next();
        calls.push('f1-end');
      }

      async function f2(ctx: any, next: Function) {
        calls.push('f2-start');
        sleep(300);
        await next();
        calls.push('f2-end');
      }

      async function f3(ctx: any, next: Function) {
        calls.push('f3-start');
        await next();
        calls.push('f3-end');
      }

      const fn = middlewares(f1, f2, f3);

      await fn({});
      expect(calls).toEqual([
        'f1-start',
        'f2-start',
        'f3-start',
        'f3-end',
        'f2-end',
        'f1-end',
      ]);
    });

    test('middle function sync', async () => {
      const calls: string[] = [];

      async function f1(ctx: any, next: Function) {
        calls.push('f1-start');
        await next();
        calls.push('f1-end');
      }

      function f2(ctx: any, next: Function) {
        calls.push('f2-start');
        return next().then(() => {
          calls.push('f2-end');
        });
      }

      async function f3(ctx: any, next: Function) {
        calls.push('f3-start');
        await next();
        calls.push('f3-end');
      }

      const fn = middlewares(f1, f2, f3);

      await fn({});
      expect(calls).toEqual([
        'f1-start',
        'f2-start',
        'f3-start',
        'f3-end',
        'f2-end',
        'f1-end',
      ]);
    });

    test('last function sync', async () => {
      const calls: string[] = [];

      async function f1(ctx: any, next: Function) {
        calls.push('f1-start');
        await next();
        calls.push('f1-end');
      }

      async function f2(ctx: any, next: Function) {
        calls.push('f2-start');
        sleep(300);
        await next();
        calls.push('f2-end');
      }

      function f3(ctx: any, next: Function) {
        calls.push('f3-start');
        next();
        calls.push('f3-end');
      }

      const fn = middlewares(f1, f2, f3);

      await fn({});
      expect(calls).toEqual([
        'f1-start',
        'f2-start',
        'f3-start',
        'f3-end',
        'f2-end',
        'f1-end',
      ]);
    });
  });

  test('does not call next()', async () => {
    const calls: string[] = [];

    async function f1(ctx: any, next: Function) {
      calls.push('f1-start');
      await next();
      calls.push('f1-end');
    }

    async function f2(ctx: any, next: Function) {
      calls.push('f2-start');
      calls.push('f2-end');
    }

    function f3(ctx: any, next: Function) {
      calls.push('f3-start');
      next();
      calls.push('f3-end');
    }

    const fn = middlewares(f1, f2, f3);

    await fn({});
    expect(calls).toEqual(['f1-start', 'f2-start', 'f2-end', 'f1-end']);
  });

  test('context is passed', async () => {
    async function f1(ctx: any, next: Function) {
      ctx.push('f1-start');
      await next();
      ctx.push('f1-end');
    }

    async function f2(ctx: any, next: Function) {
      ctx.push('f2-start');
      await next();
      ctx.push('f2-end');
    }

    function f3(ctx: any, next: Function) {
      ctx.push('f3-start');
      next();
      ctx.push('f3-end');
    }

    const fn = middlewares(f1, f2, f3);

    const context: string[] = [];
    await fn(context);

    expect(context).toEqual([
      'f1-start',
      'f2-start',
      'f3-start',
      'f3-end',
      'f2-end',
      'f1-end',
    ]);
  });

  test('can be called multiple times', async () => {
    let count = 0;

    async function f1(ctx: any, next: Function) {
      count++;
      ctx.push('f1-start');
      await next();
      ctx.push('f1-end');
    }

    async function f2(ctx: any, next: Function) {
      count++;
      ctx.push('f2-start');
      await next();
      ctx.push('f2-end');
    }

    function f3(ctx: any, next: Function) {
      count++;
      ctx.push('f3-start');
      next();
      ctx.push('f3-end');
    }

    const fn = middlewares(f1, f2, f3);

    const context1: string[] = [];
    const context2: string[] = [];

    await Promise.all([fn(context1), fn(context2)]);

    expect(context1).toEqual([
      'f1-start',
      'f2-start',
      'f3-start',
      'f3-end',
      'f2-end',
      'f1-end',
    ]);
    expect(context2).toEqual([
      'f1-start',
      'f2-start',
      'f3-start',
      'f3-end',
      'f2-end',
      'f1-end',
    ]);
    expect(count).toBe(6);
  });
});
