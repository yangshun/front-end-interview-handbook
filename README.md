# GreatFrontEnd

This repository is a monorepo using `npm`.

## Getting started

```sh
npm install
```

### Important directories

- `apps/web/`: App for https://greatfrontend.com.
- `apps/web/src/components/ui/`: Design system components. View the components showcase at http://localhost:3000/design-system.
- `apps/web/src/components/interviews/`: Any interviews related content should be placed here.

The code base is >95% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
