export interface LocaleConfig {
  source: string; // Source locale
  target: string[]; // Target locales
}

export interface IConfigFile {
  source: string; // source location for the base source locale file
  target: string; // target location for the translated locale file
  excludeKeys?: string[]; // Keys to skip from the translation
  ignore?: string[]; // files to ignore
}

export interface IPluginFileHandler {
  name: string;
  handlerFilePath: string;
}

export interface IPlugin {
  handlers?: IPluginFileHandler[];
}

export interface IConfigGroup {
  name: string;
  handler: 'json' | 'mdx' | 'string'; // Type of the file to be translated or a custom handler
  files: IConfigFile[];
  localeConfig?: LocaleConfig; // Optional
}
export interface IConfig {
  localeConfig: LocaleConfig;
  groups: IConfigGroup[];
  plugin?: IPlugin;
}
