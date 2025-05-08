# Web

This

## Development

First, install Turborepo globally. Even though `turbo` is installed globally, when any global `turbo` commands are run from the terminal, it [uses the local version](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-global-turbo) specified in `package.json` located at repo's root.

```bash
pnpm install turbo --global
```

Run the development server using Turborepo. The reason we use Turborepo to run the development command as opposed to `pnpm dev` is because the app might depend on other monorepo packages in and they have to be built before the Next.js app can run:

```bash
turbo dev
```
