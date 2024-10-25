import type { Variants } from 'console-feed/lib/definitions/Component';
import type { Styles } from 'console-feed/lib/definitions/Styles';

export function getConsoleStyles(theme: Variants, fontSize: string): Styles {
  const isLight = theme === 'light';

  return {
    ARROW_FONT_SIZE: 10,
    BASE_BACKGROUND_COLOR: 'transparent',
    BASE_FONT_FAMILY: 'Consolas, Lucida Console, monospace',
    BASE_FONT_SIZE: fontSize,
    LOG_AMOUNT_BACKGROUND: isLight ? '#a5b4fc' : '#6366f1',
    LOG_AMOUNT_COLOR: '#000',
    LOG_BACKGROUND: 'transparent',
    LOG_BORDER: isLight ? '#e4e4e7' : '#27272a',
    LOG_COLOR: isLight ? '#000' : '#fff',
    LOG_DEBUG_COLOR: '#4D88FF',
    LOG_ERROR_AMOUNT_BACKGROUND: '#dc2727',
    LOG_ERROR_AMOUNT_COLOR: '#000',
    LOG_ERROR_BACKGROUND: isLight ? 'rgb(255,235,235)' : '#290000',
    LOG_ERROR_BORDER: isLight ? 'rgb(253,204,205)' : '#5b0000',
    LOG_ERROR_COLOR: isLight ? 'rgb(252,0,5)' : '#ff8080',
    LOG_ICON_HEIGHT: 18,
    LOG_ICON_WIDTH: 15,
    LOG_LINK_COLOR: isLight ? 'rgb(66, 66, 66)' : 'rgb(177, 177, 177)',
    LOG_WARN_AMOUNT_BACKGROUND: '#ffbb17',
    LOG_WARN_AMOUNT_COLOR: '#000',
    LOG_WARN_BACKGROUND: isLight ? 'rgb(255,250,220)' : '#332b00',
    LOG_WARN_BORDER: isLight ? 'rgb(255,244,181)' : '#650',
    LOG_WARN_COLOR: isLight ? 'rgb(73,45,2)' : '#ffdc9e',
    OBJECT_VALUE_STRING_COLOR: isLight ? '#0d9488' : '#14b8a6',
  };
}
