import clsx from 'clsx';
import { type ReactNode } from 'react';
import { RiAlignCenter, RiAlignLeft, RiAlignRight } from 'react-icons/ri';

import Tooltip from './Tooltip';
import UIExamplesGroup from '../misc/UIExamplesGroup';

function Box({
  children,
  className,
  ...props
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div
      className={clsx(
        'size-16 flex rounded p-2',
        'bg-neutral-200 dark:bg-neutral-800',
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

const shortLabel = 'Hello world!';
const longLabel =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';

export default function TooltipExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Tooltip">
      <div className="flex gap-8">
        <Tooltip label={shortLabel} side="top">
          Tooltip top
        </Tooltip>
        <Tooltip label={shortLabel} side="bottom">
          Tooltip bottom
        </Tooltip>
        <Tooltip label={shortLabel} side="left">
          Tooltip left
        </Tooltip>
        <Tooltip label={shortLabel} side="right">
          Tooltip right
        </Tooltip>
      </div>
      <div className="flex gap-8">
        <Tooltip label={shortLabel} side="top">
          Short label
        </Tooltip>
        <Tooltip label={longLabel} side="top">
          Long label
        </Tooltip>
      </div>
      <div className="flex gap-8">
        <Tooltip label={longLabel} side="top" size="md">
          Medium label
        </Tooltip>
        <Tooltip label={longLabel} side="top" size="sm">
          Small label
        </Tooltip>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <Tooltip align="start" label="Top + Start" side="top">
            <Box className="items-top justify-start">
              <RiAlignLeft className="size-4" />
            </Box>
          </Tooltip>
          <Tooltip label="Top + Center" side="top">
            <Box className="items-top justify-center">
              <RiAlignCenter className="size-4" />
            </Box>
          </Tooltip>
          <Tooltip align="end" label="Top + End" side="top">
            <Box className="items-top justify-end">
              <RiAlignRight className="size-4" />
            </Box>
          </Tooltip>
          <Tooltip align="start" label="Bottom + Start" side="bottom">
            <Box className="items-end justify-start">
              <RiAlignLeft className="size-4" />
            </Box>
          </Tooltip>
          <Tooltip label="Bottom + Center" side="bottom">
            <Box className="items-end justify-center">
              <RiAlignCenter className="size-4" />
            </Box>
          </Tooltip>
          <Tooltip align="end" label="Bottom + End" side="bottom">
            <Box className="items-end justify-end">
              <RiAlignRight className="size-4" />
            </Box>
          </Tooltip>
        </div>
        <div className="flex gap-8">
          <Tooltip align="start" label="Left + Start" side="left">
            <Box className="items-start justify-start">
              <RiAlignRight className="size-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip label="Left + Center" side="left">
            <Box className="items-center justify-start">
              <RiAlignCenter className="size-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip align="end" label="Left + End" side="left">
            <Box className="items-end justify-start">
              <RiAlignLeft className="size-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip align="start" label="Right + Start" side="right">
            <Box className="items-start justify-end">
              <RiAlignLeft className="size-4 rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip label="Right + Center" side="right">
            <Box className="items-center justify-end">
              <RiAlignCenter className="size-4 rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip align="end" label="Right + End" side="right">
            <Box className="items-end justify-end">
              <RiAlignRight className="size-4 rotate-90" />
            </Box>
          </Tooltip>
        </div>
      </div>
    </UIExamplesGroup>
  );
}
