import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiAlignCenter, RiAlignLeft, RiAlignRight } from 'react-icons/ri';

import Tooltip from './Tooltip';
import UIExamplesGroup from '../misc/UIExamplesGroup';

function Box({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div
      className={clsx(
        'flex h-16 w-16 rounded bg-neutral-200 p-2 dark:bg-neutral-800',
        className,
      )}>
      {children}
    </div>
  );
}

export default function TooltipExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Tooltip">
      <div className="flex gap-8">
        <Tooltip label="Hello World" position="above">
          Tooltip above
        </Tooltip>
        <Tooltip label="Hello World" position="below">
          Tooltip below
        </Tooltip>
        <Tooltip label="Hello World" position="start">
          Tooltip left
        </Tooltip>
        <Tooltip label="Hello World" position="end">
          Tooltip right
        </Tooltip>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <Tooltip alignment="start" label="Top + Start" position="above">
            <Box className="items-top justify-start">
              <RiAlignLeft className="h-4 w-4" />
            </Box>
          </Tooltip>
          <Tooltip label="Top + Center" position="above">
            <Box className="items-top justify-center">
              <RiAlignCenter className="h-4 w-4" />
            </Box>
          </Tooltip>
          <Tooltip alignment="end" label="Top + End" position="above">
            <Box className="items-top justify-end">
              <RiAlignRight className="h-4 w-4" />
            </Box>
          </Tooltip>
          <Tooltip alignment="start" label="Bottom + Start" position="below">
            <Box className="items-end justify-start">
              <RiAlignLeft className="h-4 w-4" />
            </Box>
          </Tooltip>
          <Tooltip label="Bottom + Center" position="below">
            <Box className="items-end justify-center">
              <RiAlignCenter className="h-4 w-4" />
            </Box>
          </Tooltip>
          <Tooltip alignment="end" label="Bottom + End" position="below">
            <Box className="items-end justify-end">
              <RiAlignRight className="h-4 w-4" />
            </Box>
          </Tooltip>
        </div>
        <div className="flex gap-8">
          <Tooltip alignment="top" label="Hello World" position="start">
            <Box className="items-start justify-start">
              <RiAlignRight className="h-4 w-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip label="Hello World" position="start">
            <Box className="items-center justify-start">
              <RiAlignCenter className="h-4 w-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip alignment="bottom" label="Hello World" position="start">
            <Box className="items-end justify-start">
              <RiAlignLeft className="h-4 w-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip alignment="top" label="Hello World" position="end">
            <Box className="items-start justify-end">
              <RiAlignLeft className="h-4 w-4 rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip label="Hello World" position="end">
            <Box className="items-center justify-end">
              <RiAlignCenter className="h-4 w-4 rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip alignment="bottom" label="Hello World" position="end">
            <Box className="items-end justify-end">
              <RiAlignRight className="h-4 w-4 rotate-90" />
            </Box>
          </Tooltip>
        </div>
      </div>
    </UIExamplesGroup>
  );
}
