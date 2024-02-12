import Popover from './index';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function PopoverExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Popover">
      <div className="flex flex-wrap gap-x-12 gap-y-6">
        {(['md', 'sm', 'xs'] as const).map((size) => (
          <Popover key={size} label="Open" size={size}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna
            etiam tempor orci eu lobortis elementum. In massa tempor nec feugiat
            nisl pretium. Habitant morbi tristique senectus et. Dictum at tempor
            commodo ullamcorper. Egestas tellus rutrum tellus pellentesque eu
            tincidunt tortor aliquam nulla. Cras sed felis eget velit aliquet
            sagittis id consectetur purus. Sem nulla pharetra diam sit amet nisl
            suscipit adipiscing bibendum. Tortor pretium viverra suspendisse
            potenti nullam ac tortor vitae. Magna eget est lorem ipsum.
          </Popover>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-12 gap-y-6">
        {(['start', 'center', 'end'] as const).map((align) => (
          <Popover key={align} align={align} label={`Open ${align}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna
            etiam tempor orci eu lobortis elementum. In massa tempor nec feugiat
            nisl pretium. Habitant morbi tristique senectus et. Dictum at tempor
            commodo ullamcorper. Egestas tellus rutrum tellus pellentesque eu
            tincidunt tortor aliquam nulla. Cras sed felis eget velit aliquet
            sagittis id consectetur purus. Sem nulla pharetra diam sit amet nisl
            suscipit adipiscing bibendum. Tortor pretium viverra suspendisse
            potenti nullam ac tortor vitae. Magna eget est lorem ipsum.
          </Popover>
        ))}
      </div>
      <div className="flex flex-wrap gap-12 gap-y-6">
        {(['sm', 'md', 'lg'] as const).map((width) => (
          <Popover key={width} label={`Open ${width}`} width={width}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna
            etiam tempor orci eu lobortis elementum. In massa tempor nec feugiat
            nisl pretium. Habitant morbi tristique senectus et. Dictum at tempor
            commodo ullamcorper.
          </Popover>
        ))}
      </div>
      <div className="flex flex-wrap gap-12 gap-y-6">
        <Popover label="With tooltip" tooltip="Hello I'm a tooltip!">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna
          etiam tempor orci eu lobortis elementum. In massa tempor nec feugiat
          nisl pretium. Habitant morbi tristique senectus et. Dictum at tempor
          commodo ullamcorper.
        </Popover>
      </div>
    </UIExamplesGroup>
  );
}
