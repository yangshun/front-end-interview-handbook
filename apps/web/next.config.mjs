// @ts-check

import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';
import { withContentlayer } from 'next-contentlayer2';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import nextMDX from '@next/mdx';
import { redirects } from './src/routing/redirects.js';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    format: 'mdx',
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [rehypeSlug],
  },
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  poweredByHeader: false,
  reactStrictMode: false, // TODO: setting to true will cause stale Sandpack compilation issues.
  env: {
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID: process.env.VERCEL_DEPLOYMENT_ID,
  },
  experimental: {
    serverComponentsExternalPackages: [
      'mdx-bundler',
      '@react-email/components',
      '@react-email/render',
      '@react-email/tailwind',
      '@sparticuz/chromium',
    ],
  },
  transpilePackages: ['next-i18nostic'],
  async redirects() {
    return redirects;
  },
  async headers() {
    return [
      {
        source: '/api/projects/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Set your origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    });

    // TODO: Remove when https://github.com/contentlayerdev/contentlayer/issues/313 is complete.
    config.infrastructureLogging = {
      level: 'error',
    };

    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

export default withContentlayer(withMDX(nextConfig));
