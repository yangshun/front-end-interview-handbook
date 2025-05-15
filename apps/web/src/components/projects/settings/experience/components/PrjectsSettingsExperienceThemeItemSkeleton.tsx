import clsx from 'clsx';

import type { ColorScheme } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';

function Shape({
  className,
  height,
  theme,
  width,
}: {
  className?: string;
  height?: number;
  theme: ColorScheme;
  width?: number;
}) {
  return (
    <div
      className={clsx(
        'rounded-lg',
        theme === 'light' ? 'bg-neutral-300' : 'bg-neutral-500',
        className,
      )}
      style={{ height, width }}
    />
  );
}

export default function ProjectsSettingsExperienceThemeItemSkeleton({
  theme,
}: {
  theme: ColorScheme;
}) {
  const mediumColor = '!bg-[#eab308]';

  return (
    <div
      className={clsx(
        'flex h-[152px] w-[296px] p-2',
        theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-900',
      )}>
      <div className={clsx('flex w-[54px] flex-col')}>
        <div className="flex flex-col gap-4">
          <Shape className="w-full" height={7} theme={theme} />
          <div className="flex flex-col gap-2">
            <Shape height={4} theme={theme} width={31} />
            <Shape height={4} theme={theme} width={20} />
            <Shape height={4} theme={theme} width={31} />
            <Shape height={4} theme={theme} width={25} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="ml-2 flex justify-between">
          <Shape height={7} theme={theme} width={71} />
          <div className="flex gap-1">
            <Shape height={7} theme={theme} width={50} />
            <Shape className="!bg-brand" height={7} theme={theme} width={18} />
            <Shape
              className={clsx(mediumColor)}
              height={7}
              theme={theme}
              width={7}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Shape
              className={clsx('!rounded-full', mediumColor)}
              height={21}
              theme={theme}
              width={21}
            />
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <Shape height={7} theme={theme} width={26} />
                <Shape height={7} theme={theme} width={7} />
              </div>
              <Shape height={7} theme={theme} width={44} />
            </div>
          </div>
          <Shape height={7} theme={theme} width={64} />
        </div>
        <div className="flex gap-2">
          {Array(4)
            .fill(1)
            .map((_) => (
              <div
                key={Math.random()}
                className="flex h-[25px] w-[52px] items-end rounded bg-white p-1">
                <Shape height={9} theme={theme} width={24} />
              </div>
            ))}
        </div>
        <Shape height={9} theme={theme} width={62} />
        <div className="flex gap-2">
          {Array(3)
            .fill(1)
            .map((_) => (
              <div
                key={Math.random()}
                className="flex h-[33px] w-[71px] rounded bg-white"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
