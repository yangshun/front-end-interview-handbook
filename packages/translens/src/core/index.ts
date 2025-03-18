import { IConfigPathItem, LocaleConfig } from '../config/types';
import { globby } from 'globby';
import { TranslationFileItem } from './types';
import { generateTargetPaths } from './generate-target-paths';

type TranslationFileMetadata = Readonly<{
  source: TranslationFileItem;
  targets: ReadonlyArray<TranslationFileItem>;
}>;

export async function expandTargetPaths(
  localeConfig: LocaleConfig,
  pathItem: IConfigPathItem,
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
