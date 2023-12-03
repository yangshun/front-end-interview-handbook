import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import type { ProjectSkillDetailed } from './types';

function SkillGroupIcon() {
  return (
    <div className="grid rotate-45 grid-cols-2 gap-[2px]">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="h-2 w-2 rounded-[2px] bg-white" />
      ))}
    </div>
  );
}

function SkillItemIcon() {
  return <div className="h-3 w-3 rotate-45 rounded-[2px] bg-white" />;
}

const emblemClasses: Record<
  ProjectSkillDetailed['type'],
  {
    margin: string;
    size: string;
  }
> = {
  group: {
    margin: 'p-[16px]',
    size: 'h-[72px] w-[72px]',
  },
  item: {
    margin: 'p-[14px]',
    size: 'h-[56px] w-[56px]',
  },
};

type Props = Readonly<{ disabled?: boolean; skill: ProjectSkillDetailed }>;

export default function ProjectsSkillEmblem({
  skill: { type, label, completedProjectCount, totalProjectCount },
  disabled,
}: Props) {
  const intl = useIntl();
  const progress =
    totalProjectCount > 0 ? completedProjectCount / totalProjectCount : 1;

  return (
    <div className="relative">
      <div className={emblemClasses[type].margin}>
        <div className="box-content flex rotate-45 rounded-lg">
          <div
            className="border-brand/60 absolute left-0 top-0 h-full w-full rounded-lg border-2 border-dashed"
            style={{
              WebkitMaskImage: `conic-gradient(from -45deg, transparent 0turn, transparent 10deg, black 10deg, black 170deg, transparent 170deg, transparent 180deg)`,
              maskImage: `conic-gradient(from -45deg, transparent 0turn, transparent 10deg, black 10deg, black 170deg, transparent 170deg, transparent 180deg)`,
            }}
          />
          <button
            aria-label={intl.formatMessage(
              {
                defaultMessage:
                  '{skillName}: {completedProjectCount} out of {totalProjectCount}',
                description: 'Label for Projects skill emblem',
                id: '+P3MU0',
              },
              {
                completedProjectCount,
                skillName: label,
                totalProjectCount,
              },
            )}
            className={clsx(
              emblemClasses[type].size,
              'focus:outline-brand relative m-2 flex items-center justify-center rounded-md p-[2px] transition-transform hover:scale-110 focus:scale-110 focus:outline-offset-4',
            )}
            disabled={disabled}
            type="button">
            <div
              className="absolute -z-10 h-full w-full rounded-md bg-[linear-gradient(to_bottom_right,_#ea499a,_#737cd9)]"
              style={{
                WebkitMaskImage: `conic-gradient(from 135deg, black 0turn, black ${progress}turn, transparent ${progress}turn)`,
                backgroundColor: 'transparent',
                maskImage: `conic-gradient(from 135deg, black 0turn, black ${progress}turn, transparent ${progress}turn)`,
              }}
            />
            <div
              className={clsx(
                themeBackgroundEmphasized,
                'flex h-full w-full items-center justify-center rounded-[5px] bg-clip-content',
                'shadow-brand/50 shadow-[0px_0px_37px_0px_rgba(0,0,0,0.75)]',
              )}>
              <div className="flex -rotate-45 flex-col items-center gap-1">
                {type === 'group' ? <SkillGroupIcon /> : <SkillItemIcon />}
                <Text
                  size={type === 'group' ? 'body' : 'body2'}
                  weight="medium">
                  <FormattedMessage
                    defaultMessage="{completedProjectCount}/{totalProjectCount}"
                    description="Progress indicator in Projects skills emblem"
                    id="9kF5T7"
                    values={{
                      completedProjectCount,
                      totalProjectCount,
                    }}
                  />
                </Text>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 mx-auto flex translate-y-full justify-center">
        <Text
          aria-hidden={true}
          className={clsx('rounded-full px-4 py-2', themeBackgroundEmphasized)}
          size={type === 'group' ? 'body' : 'body2'}>
          {label}
        </Text>
      </div>
    </div>
  );
}
