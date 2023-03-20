import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import remarkGfm from 'remark-gfm';

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const mdxSource = fs
    .readFileSync(
      path.join(fileURLToPath(path.dirname(import.meta.url)), `${locale}.mdx`),
    )
    .toString();

  const { code } = await bundleMDX({
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      return options;
    },
    source: mdxSource,
  });

  const Markdown = getMDXComponent(code);

  return <Markdown />;
}
