import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import path, { dirname } from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkSlug from 'remark-slug';

import remarkAlerts from '@gfe/remark-alerts';
import remarkExtractToc from '@stefanprobst/remark-extract-toc';
import remarkExtractTocExport from '@stefanprobst/remark-extract-toc/mdx';

// Warning! This file will not be shipped in the client bundle.
// Do not add anything here that will be imported by client-side code.

type Options = Readonly<{
  extractFrontmatter?: boolean;
  extractHeadings?: boolean;
  loadJSFilesAsText?: boolean;
}>;

/**
 * Assumes the MDX filenames are the locales exactly.
 */
export async function readMDXFileWithLocaleFallback(
  directoryPath: string,
  locale: string,
  options: Options,
): Promise<string | null> {
  try {
    return await readMDXFile(
      path.join(directoryPath, `${locale}.mdx`),
      options,
    );
  } catch {
    // Fallback to English.
    return await readMDXFile(path.join(directoryPath, `en-US.mdx`), options);
  }
}

export async function readMDXFile(
  filePath: string,
  {
    extractHeadings = false,
    loadJSFilesAsText = true,
    extractFrontmatter = false,
  }: Options,
): Promise<string | null> {
  const source = fs.readFileSync(filePath).toString().trim();
  const fileDirectory = dirname(filePath);

  const { code } = await bundleMDX({
    cwd: fileDirectory,
    esbuildOptions(options) {
      if (loadJSFilesAsText) {
        options.loader = {
          ...options.loader,
          '.js': 'text',
          '.ts': 'text',
        };
      }

      return options;
    },
    globals: {
      MDXCodeBlock: 'MDXCodeBlock',
      MDXTestExamples: 'MDXTestExamples',
    },
    mdxOptions(options) {
      const remarkPlugins = options.remarkPlugins ?? [];

      remarkPlugins.push(remarkGfm);
      remarkPlugins.push(remarkMdxCodeMeta);
      remarkPlugins.push(remarkAlerts);

      if (extractFrontmatter) {
        remarkPlugins.push(remarkFrontmatter, remarkMdxFrontmatter);
      }

      if (extractHeadings) {
        remarkPlugins.push(
          remarkSlug,
          // These two plugins are not typed correctly.
          // It happens because they depend on unified 11 while we using 10.
          remarkExtractToc as () => void,
          remarkExtractTocExport as () => void,
        );
      }

      options.remarkPlugins = remarkPlugins;
      // https://github.com/mdx-js/mdx/pull/2045#issuecomment-1136338668
      options.development = false;

      return options;
    },
    source,
  });

  return code;
}
