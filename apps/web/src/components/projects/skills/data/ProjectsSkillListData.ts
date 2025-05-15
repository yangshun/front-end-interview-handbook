import { startCase } from 'lodash-es';

import type { ProjectsSkillKey } from '../types';
import { allRoadmapSkillsSet } from './ProjectsSkillProcessor';
import { projectsSkillRoadmapItemLabelsDict } from './ProjectsSkillUtils';

const ProjectsSkillLabels: Record<ProjectsSkillKey, string> = {
  '@11ty/eleventy': 'Eleventy',
  '@angular/core': 'Angular',
  '@ariakit/react': 'Ariakit',
  '@ark-ui/react': 'Ark UI (React)',
  '@ark-ui/solid': 'Ark UI (Solid)',
  '@ark-ui/vue': 'Ark UI (Vue)',
  '@chakra-ui/react': 'Chakra UI',
  '@headlessui/react': 'Headless UI (React)',
  '@headlessui/vue': 'Headless UI (Vue)',
  '@material-ui/core': 'Material UI',
  '@pandacss/dev': 'Panda CSS',
  '@remix-run/dev': 'Remix',
  '@stencil/core': 'Stencil.js',
  '@sveltejs/kit': 'SvelteKit',
  '@tanstack/react-query': 'React Query',
  '@trpc/client': 'tRPC',
  alpinejs: 'Alpine.js',
  antd: 'Ant Design',
  'apollo-client': 'Apollo',
  astro: 'Astro',
  axios: 'Axios',
  babel: 'Babel',
  backbone: 'Backbone',
  bootstrap: 'Bootstrap',
  bun: 'Bun',
  chai: 'Chai',
  clsx: 'clsx',
  cypress: 'Cypress',
  d3: 'D3.js',
  'ember-source': 'Ember.js',
  enzyme: 'Enzyme',
  eslint: 'ESLint',
  flutter: 'Flutter',
  gatsby: 'Gatsby',
  graphql: 'GraphQL',
  grunt: 'Grunt',
  gulp: 'Gulp',
  jest: 'Jest',
  joi: 'Joi',
  jquery: 'jQuery',
  lit: 'Lit',
  lodash: 'Lodash',
  mobx: 'MobX',
  mocha: 'Mocha',
  next: 'Next.js',
  npm: 'npm',
  nuxt: 'Nuxt',
  pnpm: 'pnpm',
  polymer: 'Polymer',
  postcss: 'PostCSS',
  preact: 'Preact',
  prettier: 'Prettier',
  prisma: 'Prisma',
  react: 'React',
  'react-aria-components': 'React Aria',
  'react-hook-form': 'React Hook Form',
  redux: 'Redux',
  sass: 'Sass',
  'solid-js': 'Solid.js',
  'styled-components': 'Styled Components',
  svelte: 'Svelte',
  tailwindcss: 'Tailwind',
  three: 'Three.js',
  turbo: 'Turborepo',
  typescript: 'TypeScript',
  vite: 'Vite',
  vue: 'Vue',
  webpack: 'Webpack',
  yarn: 'Yarn',
  zod: 'Zod',
  zustand: 'Zustand',
};

const ProjectsRoadmapSkillLabels = projectsSkillRoadmapItemLabelsDict();

export function projectsSkillLabel(skillKey: ProjectsSkillKey): string {
  return (
    ProjectsSkillLabels[skillKey] ??
    ProjectsRoadmapSkillLabels[skillKey] ??
    startCase(skillKey)
  );
}

export function ProjectsSkillArrayToTypeaheadValues(
  values: ReadonlyArray<ProjectsSkillKey>,
) {
  return values.map((value) => ({
    label: projectsSkillLabel(value),
    value,
  }));
}

export function ProjectsSkillTypeaheadValuesToArray(
  values: ReadonlyArray<
    Readonly<{ label: string; value: ProjectsSkillKey }>
  > | null,
) {
  return values?.map(({ value }) => value) ?? null;
}

export function projectsSkillTypeaheadOptions(excludeRoadmapSkills = true) {
  return Object.entries(ProjectsSkillLabels)
    .filter((pair) =>
      excludeRoadmapSkills ? !allRoadmapSkillsSet.has(pair[0]) : true,
    )
    .map(([value, label]) => ({
      label,
      value,
    }));
}
