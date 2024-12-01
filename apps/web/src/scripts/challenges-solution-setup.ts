import assert from 'assert';
import fs from 'fs';
import { globby } from 'globby';
import { groupBy } from 'lodash-es';
import nullthrows from 'nullthrows';
import path from 'path';

import type {
  ProjectsChallengeSolutionBundle,
  ProjectsChallengeSolutionFrameworkType,
  ProjectsChallengeSolutionWorkspace,
} from '~/components/projects/challenges/types';

import {
  CHALLENGES_SOLUTIONS_SRC_DIR,
  getChallengeSolutionsOutPath,
  getChallengeSolutionsSrcPath,
} from '~/db/projects/ProjectsChallengeSolutionConfig';

import type { SandpackFile } from '@codesandbox/sandpack-react';

const SUPPORTED_CHALLENGE_SOLUTION_TYPE =
  new Set<ProjectsChallengeSolutionFrameworkType>(['vanilla', 'react']);

async function generateSetupForChallengesSolutions(slug: string) {
  const challengeSolutionsPath = getChallengeSolutionsSrcPath(slug);

  const allFilesForChallenges = (
    await globby(path.join('**', '*'), {
      cwd: challengeSolutionsPath,
    })
  ).filter(
    (path_) =>
      !(
        (
          path_.endsWith('mdx') ||
          path_.endsWith('greatfrontend.json') ||
          path_.includes('node_modules')
        )
        // TODO(projects): exclude media/images file
        // path_.includes('img/')
      ),
  );

  // Group folders for a challenges by (solution type, setupType).
  const groupedFiles = groupBy(allFilesForChallenges, (filePath) => {
    const parts = filePath.split('/');

    return parts[0] + '/' + parts[1];
  });

  const setups = await Promise.all(
    Object.entries(groupedFiles).map(async ([key, paths]) => {
      const parts = key.split('/');

      const solutionFrameworkType =
        parts[1] as ProjectsChallengeSolutionFrameworkType;

      assert(
        SUPPORTED_CHALLENGE_SOLUTION_TYPE.has(solutionFrameworkType),
        `Unsupported solution type: ${solutionFrameworkType}`,
      );

      paths.sort((a, b) => a.localeCompare(b));

      const [files, workspace] = await Promise.all([
        // Read files needed.
        paths.reduce<Record<string, SandpackFile>>((accFiles, filePath) => {
          const relativePath = path.relative(
            path.join('solutions', solutionFrameworkType),
            filePath,
          );
          const fullPath = path.join(challengeSolutionsPath, filePath);
          const contents = fs.readFileSync(fullPath).toString();

          // Sandpack requires all file paths to be from the root,
          // hence we add a leading slash.
          accFiles['/' + relativePath] = {
            code: contents,
          };

          return accFiles;
        }, {}),
        // Read greatfrontend.json.
        (() => {
          const greatfrontendConfigPath = path.join(
            challengeSolutionsPath,
            'solutions',
            solutionFrameworkType,
            'greatfrontend.json',
          );

          try {
            return JSON.parse(
              fs.readFileSync(greatfrontendConfigPath).toString(),
            ) as ProjectsChallengeSolutionWorkspace;
          } catch {
            return null;
          }
        })(),
      ]);

      return {
        files,
        solutionFrameworkType,
        workspace: nullthrows(workspace),
      };
    }),
  );

  await Promise.all([
    ...setups.map(async ({ solutionFrameworkType, files, workspace }) => {
      workspace?.visibleFiles?.forEach((file) => {
        if (!(file in files)) {
          throw Error(
            `Visible file "${file}" not found in files for solution of ${solutionFrameworkType} for ${slug}`,
          );
        }
      });

      const outPath = path.join(
        getChallengeSolutionsOutPath(slug),
        `${solutionFrameworkType}.json`,
      );

      fs.mkdirSync(path.dirname(outPath), { recursive: true });

      const bundle: ProjectsChallengeSolutionBundle = {
        files,
        workspace,
      };

      fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2));
    }),
  ]);
}

export async function generateChallengesSolutionsSetup(): Promise<void> {
  const directories = fs
    .readdirSync(CHALLENGES_SOLUTIONS_SRC_DIR, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(async (dirent) => {
      await generateSetupForChallengesSolutions(dirent.name);
    }),
  );
}
