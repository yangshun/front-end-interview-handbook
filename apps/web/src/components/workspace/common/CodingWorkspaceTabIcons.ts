import { BiLogoTypescript } from 'react-icons/bi';
import { CgBrowser } from 'react-icons/cg';
import { IoLogoJavascript } from 'react-icons/io';
import {
  RiAngularjsFill,
  RiArchiveLine,
  RiBracesFill,
  RiCheckboxLine,
  RiCodeLine,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiEditLine,
  RiFileList2Line,
  RiFlaskLine,
  RiFolderLine,
  RiHashtag,
  RiHtml5Fill,
  RiKeyboardBoxLine,
  RiLightbulbLine,
  RiListCheck3,
  RiNpmjsFill,
  RiPlayLine,
  RiTeamLine,
  RiTerminalBoxLine,
} from 'react-icons/ri';

export type CodingWorkspaceTabIconType =
  | 'angular'
  | 'browser'
  | 'code'
  | 'community_solution_create'
  | 'community_solution'
  | 'community_solutions'
  | 'console'
  | 'css'
  | 'description'
  | 'editor_shortcuts'
  | 'explorer'
  | 'html'
  | 'js'
  | 'json'
  | 'npm'
  | 'run'
  | 'solution'
  | 'submissions'
  | 'submit'
  | 'test_cases_all'
  | 'test_cases'
  | 'ts'
  | 'versions';

export type CodingWorkspaceTabIcon = Readonly<{
  className?: string;
  icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
}>;

export const CodingWorkspaceTabIcons: Record<
  CodingWorkspaceTabIconType,
  CodingWorkspaceTabIcon
> = {
  angular: {
    icon: RiAngularjsFill,
  },
  browser: {
    icon: CgBrowser,
  },
  code: {
    icon: RiCodeLine,
  },
  community_solution: {
    icon: RiCodeSSlashLine,
  },
  community_solution_create: {
    icon: RiEditLine,
  },
  community_solutions: {
    icon: RiTeamLine,
  },
  console: {
    icon: RiTerminalBoxLine,
  },
  css: {
    icon: RiHashtag,
  },
  description: {
    icon: RiFileList2Line,
  },
  editor_shortcuts: {
    icon: RiKeyboardBoxLine,
  },
  explorer: {
    icon: RiFolderLine,
  },
  html: {
    icon: RiHtml5Fill,
  },
  js: {
    icon: IoLogoJavascript,
  },
  json: {
    icon: RiBracesFill,
  },
  npm: {
    icon: RiNpmjsFill,
  },
  run: {
    icon: RiPlayLine,
  },
  solution: {
    icon: RiLightbulbLine,
  },
  submissions: {
    icon: RiArchiveLine,
  },
  submit: {
    icon: RiCheckboxLine,
  },
  test_cases: {
    icon: RiFlaskLine,
  },
  test_cases_all: {
    icon: RiListCheck3,
  },
  ts: {
    icon: BiLogoTypescript,
  },
  versions: {
    icon: RiDatabase2Line,
  },
};
