// @ts-check

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkExtractToc from '@stefanprobst/remark-extract-toc';
import remarkExtractTocExport from '@stefanprobst/remark-extract-toc/mdx';
import nextMDX from '@next/mdx';

import nextI18nostic from './nextI18nostic.mjs';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    format: 'mdx',
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkSlug,
      remarkExtractToc,
      remarkExtractTocExport, // Adds toc as exported const for MDX files.
    ],
  },
});

const withNextI18nostic = nextI18nostic();

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // reactStrictMode: true, // TODO: re-enable this and fix the stale tests issue with coding workspace.
  experimental: {
    serverComponentsExternalPackages: ['mdx-bundler'],
  },
  transpilePackages: ['next-i18nostic'],
  async redirects() {
    return [
      {
        source: '/questions/javascript',
        destination: '/questions/js',
        permanent: false,
      },
      {
        source: '/questions/coding',
        destination: '/prepare/coding',
        permanent: false,
      },
      {
        source: '/questions/quiz',
        destination: '/prepare/quiz',
        permanent: false,
      },
      {
        source: '/questions/system-design',
        destination: '/prepare/system-design',
        permanent: false,
      },
      {
        source: '/questions/quiz/css/:path*',
        destination: '/questions/quiz/:path*',
        permanent: false,
      },
      {
        source: '/questions/quiz/html/:path*',
        destination: '/questions/quiz/:path*',
        permanent: false,
      },
      {
        source: '/questions/quiz/javascript/:path*',
        destination: '/questions/quiz/:path*',
        permanent: false,
      },
    ];
  },
};

export default withNextI18nostic(withMDX(nextConfig));