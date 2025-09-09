import remarkExtractToc from '@stefanprobst/remark-extract-toc';
import remarkExtractTocExport from '@stefanprobst/remark-extract-toc/mdx';
import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import path, { dirname } from 'path';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import remarkSlug from 'remark-slug';

// Warning! This file will not be shipped in the client bundle.
// Do not add anything here that will be imported by client-side code.

type Options = Readonly<{
  extractHeadings?: boolean;
  loadJSFilesAsText?: boolean;
  mdxJsReactGlobal?: boolean;
}>;

/**
 * Assumes the MDX filenames are the locales exactly.
 */
export async function readMDXFileWithLocaleFallback(
  directoryPath: string,
  locale: string,
  options: Options,
): Promise<{
  code: string | null;
  frontmatter: Record<string, AnyIntentional>;
}> {
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
    mdxJsReactGlobal = false,
  }: Options,
): Promise<{
  code: string | null;
  frontmatter: Record<string, AnyIntentional>;
}> {
  const source = fs.readFileSync(filePath).toString().trim();
  const fileDirectory = dirname(filePath);

  const { code, frontmatter } = await bundleMDX({
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
      ...(mdxJsReactGlobal
        ? {
            '@mdx-js/react': {
              defaultExport: false,
              namedExports: ['useMDXComponents'],
              varName: 'MdxJsReact',
            },
          }
        : {}),
      MDXCodeBlock: 'MDXCodeBlock',
      MDXTestExamples: 'MDXTestExamples',
    },
    mdxOptions(options) {
      const remarkPlugins = options.remarkPlugins ?? [];

      remarkPlugins.push(remarkGfm);
      remarkPlugins.push(remarkMdxCodeMeta);

      if (extractHeadings) {
        remarkPlugins.push(
          remarkSlug,
          remarkExtractToc,
          remarkExtractTocExport,
        );
      }

      options.remarkPlugins = remarkPlugins;
      // https://github.com/mdx-js/mdx/pull/2045#issuecomment-1136338668
      options.development = false;

      return {
        ...options,
        ...(mdxJsReactGlobal ? { providerImportSource: '@mdx-js/react' } : {}),
      };
    },
    source,
  });

  return { code, frontmatter };
}
