export interface IConfig {
  source: string;
  locales: string[];
  paths: string[];
  cache: string;
  mdxConfig?: {
    excludeFrontMatter: string[];
  };
}
