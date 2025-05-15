import type { TestError } from '@codesandbox/sandpack-client';
import clsx from 'clsx';
import * as React from 'react';

import {
  themeBackgroundEmphasized,
  themeBorderColor,
  themeTextColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { failTextClassName, passTextClassName } from './style';

type Props = Readonly<{
  error: TestError;
  path: string;
}>;

const betterAsyncError = (error: TestError): TestError => {
  // Check if the error is a timeout error related to async code
  if (
    error.message?.includes('Exceeded timeout') &&
    error.message?.includes('jest.setTimeout(newTimeout)')
  ) {
    // Create a more beginner-friendly error message
    return {
      ...error,
      message: `Your test is taking too long to complete. This usually happens with asynchronous code that doesn't properly resolve. Common causes include:

- Missing await for async functions
- Promises that never resolve
- Infinite loops

Original error: ${error.message}`,
    };
  }

  return error;
};

export default function FormattedError({ error }: Props) {
  const html = formatDiffMessage(betterAsyncError(error));

  if (!html) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className={clsx(
        'overflow-x-auto whitespace-pre rounded p-3',
        themeBackgroundEmphasized,
        'text-xs',
        ['border', themeBorderColor],
        ['font-mono', themeTextSecondaryColor],
      )}
    />
  );
}

const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const formatDiffMessage = (error: TestError): string => {
  let finalMessage = '';

  if (error.matcherResult) {
    finalMessage = `<span>${escapeHtml(error.message)
      .replace(/(expected)/m, `<span class="${passTextClassName}">$1</span>`)
      .replace(/(received)/m, `<span class="${failTextClassName}">$1</span>`)
      .replace(/(Difference:)/m, `<span>$1</span>`)
      .replace(
        /(Expected:)(.*)/m,
        `<span class="${themeTextColor}">$1</span><span class="${passTextClassName}">$2</span>`,
      )
      .replace(
        /(Received:)(.*)/m,
        `<span class="${themeTextColor}">$1</span><span class="${failTextClassName}">$2</span>`,
      )
      .replace(/^(-.*)/gm, `<span class="${failTextClassName}">$1</span>`)
      .replace(
        /^(\+.*)/gm,
        `<span class="${passTextClassName}">$1</span>`,
      )}</span>`;
  } else if (error.name || error.message) {
    const titleString = [error.name, error.message].join(': ');

    finalMessage = `<span class="${themeTextColor}">${escapeHtml(
      titleString,
    )}</span>`;
  } else {
    finalMessage = '';
  }

  if (error.mappedErrors?.[0]?._originalScriptCode) {
    const mappedError = error.mappedErrors[0];

    const _originalScriptCode = mappedError._originalScriptCode || [];

    const widestNumber =
      Math.max(
        ..._originalScriptCode.map((code) => String(code.lineNumber).length),
      ) + 2;

    const margin = Array.from({ length: widestNumber }).map(() => ' ');

    finalMessage += '<br />';
    finalMessage += '<br />';
    finalMessage += '<div>';
    _originalScriptCode
      .filter((s) => s.content.trim())
      .forEach((code) => {
        const currentLineMargin = String(code.lineNumber).length;
        const newMargin = [...margin];

        newMargin.length -= currentLineMargin;
        if (code.highlight) {
          newMargin.length -= 2;
        }

        const toBeIndex = code.content.indexOf('.to');
        const toBeMargin = Array.from(
          { length: margin.length + toBeIndex - (widestNumber - 1) },
          () => ' ',
        );

        const content = escapeHtml(code.content)
          .replace(
            /(describe|test|it)(\()(&#039;|&quot;|`)(.*)(&#039;|&quot;|`)/m,
            `<span>$1$2$3</span><span class="${themeTextColor}">$4</span><span>$5</span>`,
          )
          .replace(
            /(expect\()(.*)(\)\..*)(to[\w\d]*)(\()(.*)(\))/m,
            `<span>$1</span><span class="${failTextClassName}">$2</span><span>$3</span><span class="${themeTextColor}">$4</span><span>$5</span><span class="${passTextClassName}">$6</span><span>$7</span>`,
          );

        finalMessage +=
          `<div ${code.highlight ? `style="font-weight:200;"` : ``}>` +
          (code.highlight
            ? `<span class="${failTextClassName}">></span> `
            : '') +
          newMargin.join('') +
          escapeHtml(String(code.lineNumber)) +
          ' | ' +
          content +
          '</div>' +
          // TODO: add caret even for non-matchers.
          (error.matcherResult
            ? code.highlight
              ? '<div>' +
                margin.join('') +
                ' | ' +
                toBeMargin.join('') +
                `<span class="${failTextClassName}">^</span>` +
                '</div>'
              : ''
            : '');
      });
    finalMessage += '</div>';
  }

  return finalMessage.replace(/(?:\r\n|\r|\n)/g, '<br />');
};
