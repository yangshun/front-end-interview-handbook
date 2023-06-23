import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiAlignCenter, RiAlignLeft, RiAlignRight } from 'react-icons/ri';

import Tooltip from './Tooltip';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import Text from '../Text';

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

const shortLabel = 'Hello world!';
const longLabel =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';

export default function TooltipExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Tooltip">
      <div className="flex gap-8">
        <Tooltip label={shortLabel} position="above">
          <Text>Tooltip above</Text>
        </Tooltip>
        <Tooltip label={shortLabel} position="below">
          <Text>Tooltip below</Text>
        </Tooltip>
        <Tooltip label={shortLabel} position="start">
          <Text>Tooltip left</Text>
        </Tooltip>
        <Tooltip label={shortLabel} position="end">
          <Text>Tooltip right</Text>
        </Tooltip>
      </div>
      <div className="flex gap-8">
        <Tooltip label={shortLabel} position="above">
          <Text>Short label</Text>
        </Tooltip>
        <Tooltip label={longLabel} position="above">
          <Text>Long label</Text>
        </Tooltip>
      </div>
      <div className="flex gap-8">
        <Tooltip label={longLabel} position="above" size="md">
          <Text>Medium label</Text>
        </Tooltip>
        <Tooltip label={longLabel} position="above" size="sm">
          <Text>Small label</Text>
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
          <Tooltip alignment="top" label={shortLabel} position="start">
            <Box className="items-start justify-start">
              <RiAlignRight className="h-4 w-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip label={shortLabel} position="start">
            <Box className="items-center justify-start">
              <RiAlignCenter className="h-4 w-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip alignment="bottom" label={shortLabel} position="start">
            <Box className="items-end justify-start">
              <RiAlignLeft className="h-4 w-4 -rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip alignment="top" label={shortLabel} position="end">
            <Box className="items-start justify-end">
              <RiAlignLeft className="h-4 w-4 rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip label={shortLabel} position="end">
            <Box className="items-center justify-end">
              <RiAlignCenter className="h-4 w-4 rotate-90" />
            </Box>
          </Tooltip>
          <Tooltip alignment="bottom" label={shortLabel} position="end">
            <Box className="items-end justify-end">
              <RiAlignRight className="h-4 w-4 rotate-90" />
            </Box>
          </Tooltip>
        </div>
      </div>
    </UIExamplesGroup>
  );
}
