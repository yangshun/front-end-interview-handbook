import type { Monaco } from '@monaco-editor/react';

type TsConfigJSX =
  | 'preserve'
  | 'react-jsx'
  | 'react-jsxdev'
  | 'react-native'
  | 'react';

function convertJsx(monaco: Monaco, value: TsConfigJSX) {
  const { JsxEmit } = monaco.languages.typescript;

  type JsxEmitType = typeof JsxEmit;

  const configToMonacoOption: Record<
    TsConfigJSX,
    JsxEmitType[keyof JsxEmitType]
  > = {
    preserve: JsxEmit.Preserve,
    react: JsxEmit.React,
    'react-jsx': JsxEmit.ReactJSX,
    'react-jsxdev': JsxEmit.ReactJSXDev,
    'react-native': JsxEmit.ReactNative,
  };
  const newValue = configToMonacoOption[value];

  if (newValue == null) {
    throw `Unsupported tsconfig.jsx value: ${value}`;
  }

  return newValue;
}

type TsConfigModuleKind =
  | 'amd'
  | 'commonjs'
  | 'es6'
  | 'es2015'
  | 'esnext'
  | 'none'
  | 'system'
  | 'umd';

function convertModuleKind(monaco: Monaco, value: TsConfigModuleKind) {
  const { ModuleKind } = monaco.languages.typescript;

  type ModuleKindType = typeof ModuleKind;

  const configToMonacoOption: Record<
    TsConfigModuleKind,
    ModuleKindType[keyof ModuleKindType]
  > = {
    amd: ModuleKind.AMD,
    commonjs: ModuleKind.CommonJS,
    es2015: ModuleKind.ES2015,
    es6: ModuleKind.ES2015,
    esnext: ModuleKind.ESNext,
    none: ModuleKind.None,
    system: ModuleKind.System,
    umd: ModuleKind.UMD,
  };
  const newValue = configToMonacoOption[value];

  if (newValue == null) {
    throw `Unsupported tsconfig.module value: ${value}`;
  }

  return newValue;
}

type TsConfigModuleResolutionKind = 'classic' | 'node' | 'node10';

function convertModuleResolutionKind(
  monaco: Monaco,
  value: TsConfigModuleResolutionKind,
) {
  const { ModuleResolutionKind } = monaco.languages.typescript;

  type ModuleResolutionKindType = typeof ModuleResolutionKind;

  const configToMonacoOption: Record<
    TsConfigModuleResolutionKind,
    ModuleResolutionKindType[keyof ModuleResolutionKindType]
  > = {
    classic: ModuleResolutionKind.Classic,
    node: ModuleResolutionKind.NodeJs,
    node10: ModuleResolutionKind.NodeJs,
  };
  const newValue = configToMonacoOption[value];

  if (newValue == null) {
    throw `Unsupported tsconfig.moduleResolution value: ${value}`;
  }

  return newValue;
}

type TsConfigNewLineKind = 'crlf' | 'lf';

function convertNewLineKind(monaco: Monaco, value: TsConfigNewLineKind) {
  const { NewLineKind } = monaco.languages.typescript;

  type NewLineKindType = typeof NewLineKind;

  const configToMonacoOption: Record<
    TsConfigNewLineKind,
    NewLineKindType[keyof NewLineKindType]
  > = {
    crlf: NewLineKind.CarriageReturnLineFeed,
    lf: NewLineKind.LineFeed,
  };
  const newValue = configToMonacoOption[value];

  if (newValue == null) {
    throw `Unsupported tsconfig.newLine value: ${value}`;
  }

  return newValue;
}

type TsConfigScriptTarget =
  | 'es3'
  | 'es5'
  | 'es6'
  | 'es2015'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'esnext';

function convertScriptTarget(monaco: Monaco, value: TsConfigScriptTarget) {
  const { ScriptTarget } = monaco.languages.typescript;

  type ScriptTargetType = typeof ScriptTarget;

  const configToMonacoOption: Record<
    TsConfigScriptTarget,
    ScriptTargetType[keyof ScriptTargetType]
  > = {
    es2015: ScriptTarget.ES2015,
    es2016: ScriptTarget.ES2016,
    es2017: ScriptTarget.ES2017,
    es2018: ScriptTarget.ES2018,
    es2019: ScriptTarget.ES2019,
    es2020: ScriptTarget.ES2020,
    es3: ScriptTarget.ES3,
    es5: ScriptTarget.ES5,
    es6: ScriptTarget.ES2015,
    esnext: ScriptTarget.ESNext,
  };
  const newValue = configToMonacoOption[value];

  if (newValue == null) {
    throw `Unsupported tsconfig.target value: ${value}`;
  }

  return newValue;
}

// TODO: Using `any` for return type because the `CompilerOptions` type is not exposed by Monaco.
export function convertTsConfigToTsCompilerOptions(
  monaco: Monaco,
  tsConfig: any,
): any {
  const newConfig = {
    ...tsConfig,
  };

  if (Object.prototype.hasOwnProperty.call(newConfig, 'jsx')) {
    newConfig.jsx = convertJsx(monaco, newConfig.jsx.toLowerCase());
  }

  if (Object.prototype.hasOwnProperty.call(newConfig, 'module')) {
    newConfig.module = convertModuleKind(
      monaco,
      newConfig.module.toLowerCase(),
    );
  }

  if (Object.prototype.hasOwnProperty.call(newConfig, 'moduleResolution')) {
    newConfig.moduleResolution = convertModuleResolutionKind(
      monaco,
      newConfig.moduleResolution.toLowerCase(),
    );
  }

  if (Object.prototype.hasOwnProperty.call(newConfig, 'newLine')) {
    newConfig.newLine = convertNewLineKind(
      monaco,
      newConfig.newLine.toLowerCase(),
    );
  }

  if (Object.prototype.hasOwnProperty.call(newConfig, 'target')) {
    newConfig.target = convertScriptTarget(
      monaco,
      newConfig.target.toLowerCase(),
    );
  }

  return newConfig;
}
