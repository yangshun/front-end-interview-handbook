import { ConfigGroupPathItem, LocaleConfig } from '../config/types';
import { globby } from 'globby';
import { TranslationFileMetadata } from './types';
import { generateTargetPaths } from './generate-target-paths';

export async function expandTargetPaths(
  localeConfig: LocaleConfig,
  pathItem: ConfigGroupPathItem,
): Promise<ReadonlyArray<TranslationFileMetadata>> {
  const paths = await globby(pathItem.source);

  return paths.map((sourcePath) => ({
    source: {
      locale: localeConfig.source,
      path: sourcePath,
    },
    targets: generateTargetPaths(
      pathItem.source,
      pathItem.target,
      sourcePath,
      localeConfig.target,
    ),
  }));
}
