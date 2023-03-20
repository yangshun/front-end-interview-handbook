// import { NextConfig, Metadata } from "next";

// export type NextI18nosticHrefLang = keyof NonNullable<
//   NonNullable<Metadata["alternates"]>["languages"]
// >;

// export type WithI18nostic = (config: NextConfig) => NextConfig;

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
