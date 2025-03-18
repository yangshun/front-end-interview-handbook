import Config from '../config';
import { expandTargetPaths } from '../core';

export async function translate() {
  const config = new Config().getConfig();

  // Discover files to translate
  const allGroupTranslationFileMetadata = await Promise.all(
    config.groups.map(async (group) => {
      const groupPaths = await Promise.all(
        group.paths.map(async (groupPath) => {
          const paths = await expandTargetPaths(config.localeConfig, groupPath);
          return paths;
        }),
      );

      return groupPaths.flat();
    }),
  );

  console.dir(allGroupTranslationFileMetadata, { depth: null });
}
