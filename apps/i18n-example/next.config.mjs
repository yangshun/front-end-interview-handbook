// @ts-check

import nextI18nostic from './nextI18nostic.mjs';

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mdx-bundler'],
  },
  transpilePackages: ['next-i18nostic'],
  pageExtensions: ['ts', 'tsx'],
};

export default nextI18nostic()(nextConfig);
