export default function nextI18nostic() {
  return (nextConfig) => {
    return Object.assign({}, nextConfig, {
      // TODO: Derive from NextJsWebpackConfig.
      webpack(config, options) {
        config.resolve.alias['next-i18nostic/config'] = [
          'private-next-root-dir/next-i18nostic.config',
        ];

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  };
}
