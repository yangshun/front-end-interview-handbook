import type { SandpackTheme } from '@codesandbox/sandpack-react';

const theme: SandpackTheme = {
  colors: {
    accent: '#22d3ee',
    base: '#808080',
    clickable: '#999999',
    disabled: '#4D4D4D',
    error: '#f97316',
    errorSurface: '#fef1e8',
    hover: '#C5C5C5',
    surface1: '#151515',
    surface2: '#252525',
    surface3: '#2F2F2F',
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    lineHeight: '20px',
    mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    size: '13px',
  },
  syntax: {
    comment: {
      color: '#757575',
      fontStyle: 'italic',
    },
    definition: '#a78bfa',
    keyword: '#22d3ee',
    plain: '#fff',
    property: '#f472b6',
    punctuation: '#fff',
    static: '#e879f9',
    string: '#a3e635',
    tag: '#f43f5e',
  },
};

export default theme;
