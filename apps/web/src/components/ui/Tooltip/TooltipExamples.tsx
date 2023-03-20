import Tooltip from './Tooltip';
import UIExamplesGroup from '../misc/UIExamplesGroup';

function Box() {
  return <div className="h-10 w-10 bg-slate-500" />;
}

export default function TooltipExamples() {
  return (
    <UIExamplesGroup title="Tooltip">
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
          <Tooltip alignment="start" label="Hello World" position="above">
            <Box />
          </Tooltip>
          <Tooltip label="Hello World" position="above">
            <Box />
          </Tooltip>
          <Tooltip alignment="end" label="Hello World" position="above">
            <Box />
          </Tooltip>
          <Tooltip alignment="start" label="Hello World" position="below">
            <Box />
          </Tooltip>
          <Tooltip label="Hello World" position="below">
            <Box />
          </Tooltip>
          <Tooltip alignment="end" label="Hello World" position="below">
            <Box />
          </Tooltip>
        </div>
        <div className="flex gap-8">
          <Tooltip alignment="top" label="Hello World" position="start">
            <Box />
          </Tooltip>
          <Tooltip label="Hello World" position="start">
            <Box />
          </Tooltip>
          <Tooltip alignment="bottom" label="Hello World" position="start">
            <Box />
          </Tooltip>
          <Tooltip alignment="top" label="Hello World" position="end">
            <Box />
          </Tooltip>
          <Tooltip label="Hello World" position="end">
            <Box />
          </Tooltip>
          <Tooltip alignment="bottom" label="Hello World" position="end">
            <Box />
          </Tooltip>
        </div>
      </div>
    </UIExamplesGroup>
  );
}
