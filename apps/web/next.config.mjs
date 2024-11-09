// @ts-check

import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';
import { withContentlayer } from 'next-contentlayer';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkExtractToc from '@stefanprobst/remark-extract-toc';
import remarkExtractTocExport from '@stefanprobst/remark-extract-toc/mdx';
import nextMDX from '@next/mdx';

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

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  poweredByHeader: false,
  reactStrictMode: false, // TODO: setting to true will cause stale Sandpack compilation issues.
  experimental: {
    serverComponentsExternalPackages: [
      'mdx-bundler',
      '@react-email/components',
      '@react-email/render',
      '@react-email/tailwind',
    ],
  },
  transpilePackages: ['next-i18nostic'],
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/interviews/pricing',
        permanent: false,
      },
      {
        source: '/payment/success',
        destination: '/interviews/payment/success',
        permanent: false,
      },
      {
        source: '/prepare',
        destination: '/interviews/dashboard',
        permanent: false,
      },
      {
        source: '/prepare/coding',
        destination: '/questions',
        permanent: false,
      },
      {
        source: '/prepare/quiz',
        destination: '/questions/quiz',
        permanent: false,
      },
      {
        source: '/prepare/system-design',
        destination: '/questions/system-design',
        permanent: false,
      },
      {
        source: '/prepare/behavioral',
        destination: '/behavioral-interview-playbook',
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
      {
        source: '/study-plans',
        destination: '/interviews/study-plans',
        permanent: true,
      },
      {
        source: '/prepare/one-week',
        destination: '/interviews/study-plans/one-week',
        permanent: true,
      },
      {
        source: '/prepare/one-month',
        destination: '/interviews/study-plans/one-month',
        permanent: true,
      },
      {
        source: '/prepare/three-months',
        destination: '/interviews/study-plans/three-months',
        permanent: true,
      },
      {
        source: '/focus-areas',
        destination: '/interviews/focus-areas',
        permanent: true,
      },
      {
        source: '/focus-areas/:path*',
        destination: '/interviews/focus-areas/:path*',
        permanent: true,
      },
      {
        source: '/system-design',
        destination: '/front-end-system-design-playbook',
        permanent: true,
      },
      {
        source: '/system-design/:path*',
        destination: '/front-end-system-design-playbook/:path*',
        permanent: true,
      },
      {
        source: '/front-end-interview-guidebook',
        destination: '/front-end-interview-playbook',
        permanent: true,
      },
      {
        source: '/front-end-interview-guidebook/:path*',
        destination: '/front-end-interview-playbook/:path*',
        permanent: true,
      },
      {
        source: '/behavioral-interview-guidebook',
        destination: '/behavioral-interview-playbook',
        permanent: true,
      },
      {
        source: '/behavioral-interview-guidebook/:path*',
        destination: '/behavioral-interview-playbook/:path*',
        permanent: true,
      },
    ];
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
