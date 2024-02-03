'use client';

import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

import useProfile from '~/hooks/user/useProfile';

import ProjectsChallengeGridList from '~/components/projects/challenges/lists/ProjectsChallengeGridList';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsSkillProgressBreakdownCard from '~/components/projects/skills/ProjectsSkillProgressBreakdownCard';
import { ProjectsLevelingProgressBar } from '~/components/projects/stats/ProjectsLevelingProgressBar';
import { ProjectsSegmentedProgressBar } from '~/components/projects/stats/ProjectsSegmentedProgressBar';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

function ReputationIncreaseBackground({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="270"
      viewBox="0 0 302 270"
      width="302"
      xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_3457_204864)" opacity="0.15">
        <path
          d="M242.366 147.266C234.785 197.009 188.209 220 134.652 220C81.0947 220 52.525 190.739 56.947 147.266C61.3689 103.793 111.593 51.9599 165.292 57.394C218.991 62.8282 249.947 97.523 242.366 147.266Z"
          fill="url(#paint0_linear_3457_204864)"
        />
      </g>
      <path
        d="M34 105L34.1875 105.56C35.6975 110.07 39.0974 113.699 43.5 115.5C39.0974 117.301 35.6975 120.93 34.1875 125.44L34 126L33.8125 125.44C32.3025 120.93 28.9026 117.301 24.5 115.5C28.9026 113.699 32.3025 110.07 33.8125 105.56L34 105Z"
        fill="#948CF9"
      />
      <path
        d="M281 135L281.187 135.56C282.698 140.07 286.097 143.699 290.5 145.5C286.097 147.301 282.698 150.93 281.187 155.44L281 156L280.813 155.44C279.302 150.93 275.903 147.301 271.5 145.5C275.903 143.699 279.302 140.07 280.813 135.56L281 135Z"
        fill="#948CF9"
      />
      <path
        d="M16 57L16.1763 57.563C17.008 60.2192 18.9498 62.3848 21.5 63.5C18.9498 64.6152 17.008 66.7808 16.1763 69.437L16 70L15.8237 69.437C14.992 66.7808 13.0502 64.6152 10.5 63.5C13.0502 62.3848 14.992 60.2192 15.8237 57.563L16 57Z"
        fill="#948CF9"
      />
      <path
        d="M296 105L296.176 105.563C297.008 108.219 298.95 110.385 301.5 111.5C298.95 112.615 297.008 114.781 296.176 117.437L296 118L295.824 117.437C294.992 114.781 293.05 112.615 290.5 111.5C293.05 110.385 294.992 108.219 295.824 105.563L296 105Z"
        fill="#948CF9"
      />
      <path
        d="M113 226L113.176 226.563C114.008 229.219 115.95 231.385 118.5 232.5C115.95 233.615 114.008 235.781 113.176 238.437L113 239L112.824 238.437C111.992 235.781 110.05 233.615 107.5 232.5C110.05 231.385 111.992 229.219 112.824 226.563L113 226Z"
        fill="#948CF9"
      />
      <path
        d="M3 81L3.08689 81.2818C3.46069 82.494 4.34064 83.4852 5.5 84C4.34064 84.5148 3.46069 85.506 3.08689 86.7182L3 87L2.91311 86.7182C2.53931 85.506 1.65936 84.5148 0.5 84C1.65936 83.4852 2.53931 82.494 2.91311 81.2818L3 81Z"
        fill="#948CF9"
      />
      <path
        d="M65 33L65.0869 33.2818C65.4607 34.494 66.3406 35.4852 67.5 36C66.3406 36.5148 65.4607 37.506 65.0869 38.7182L65 39L64.9131 38.7182C64.5393 37.506 63.6594 36.5148 62.5 36C63.6594 35.4852 64.5393 34.494 64.9131 33.2818L65 33Z"
        fill="#948CF9"
      />
      <path
        d="M22 144L22.0869 144.282C22.4607 145.494 23.3406 146.485 24.5 147C23.3406 147.515 22.4607 148.506 22.0869 149.718L22 150L21.9131 149.718C21.5393 148.506 20.6594 147.515 19.5 147C20.6594 146.485 21.5393 145.494 21.9131 144.282L22 144Z"
        fill="#948CF9"
      />
      <path
        d="M94 205L94.0869 205.282C94.4607 206.494 95.3406 207.485 96.5 208C95.3406 208.515 94.4607 209.506 94.0869 210.718L94 211L93.9131 210.718C93.5393 209.506 92.6594 208.515 91.5 208C92.6594 207.485 93.5393 206.494 93.9131 205.282L94 205Z"
        fill="#948CF9"
      />
      <path
        d="M272 69L272.087 69.2818C272.461 70.494 273.341 71.4852 274.5 72C273.341 72.5148 272.461 73.506 272.087 74.7182L272 75L271.913 74.7182C271.539 73.506 270.659 72.5148 269.5 72C270.659 71.4852 271.539 70.494 271.913 69.2818L272 69Z"
        fill="#948CF9"
      />
      <path
        d="M258 187L258.087 187.282C258.461 188.494 259.341 189.485 260.5 190C259.341 190.515 258.461 191.506 258.087 192.718L258 193L257.913 192.718C257.539 191.506 256.659 190.515 255.5 190C256.659 189.485 257.539 188.494 257.913 187.282L258 187Z"
        fill="#948CF9"
      />
      <path
        d="M264 0L264.087 0.281796C264.461 1.49399 265.341 2.4852 266.5 3C265.341 3.5148 264.461 4.50601 264.087 5.7182L264 6L263.913 5.7182C263.539 4.50601 262.659 3.5148 261.5 3C262.659 2.4852 263.539 1.49399 263.913 0.281795L264 0Z"
        fill="#948CF9"
      />
      <g filter="url(#filter1_d_3457_204864)">
        <path
          d="M149.5 86.6667C139.835 86.6667 132 78.8316 132 69.1667C132 64.1411 134.118 59.6105 137.511 56.4187C140.643 53.4721 148.333 48.1655 147.167 36.5C161.167 45.8333 168.167 55.1667 154.167 69.1667C156.5 69.1667 160 69.1667 165.833 63.4024C166.463 65.2075 167 67.1472 167 69.1667C167 78.8316 159.165 86.6667 149.5 86.6667Z"
          fill="#948CF9"
        />
      </g>
      <defs>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="263"
          id="filter0_f_3457_204864"
          width="287"
          x="6.5"
          y="7">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_3457_204864"
            stdDeviation="25"
          />
        </filter>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="114.167"
          id="filter1_d_3457_204864"
          width="99"
          x="100"
          y="4.5">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="8"
            result="effect1_dropShadow_3457_204864"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.580392 0 0 0 0 0.54902 0 0 0 0 0.976471 0 0 0 0.4 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_3457_204864"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3457_204864"
            mode="normal"
            result="shape"
          />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_3457_204864"
          x1="240.155"
          x2="54.1952"
          y1="79.1304"
          y2="155.611">
          <stop stop-color="#948CF9" />
          <stop offset="1" stop-color="#948CF9" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type Props = Readonly<{
  suggestedChallenges: ReadonlyArray<ProjectsChallengeItem>;
}>;

export default function ProjectsChallengeSubmissionSuccessPage({
  suggestedChallenges,
}: Props) {
  const intl = useIntl();
  const { profile } = useProfile();

  return (
    <CardContainer>
      <div className="relative self-center">
        <ReputationIncreaseBackground />
        <div className="flex flex-col gap-2 absolute bottom-[90px] mx-auto start-0 end-0 items-center">
          <FormattedMessage
            defaultMessage="<emph>+ {points}</emph><small>reputation points</small>"
            description="Reputation point increase on project submission success page"
            id="HGXFQP"
            values={{
              emph: (chunks) => <Heading level="heading2">{chunks}</Heading>,
              points: 237,
              small: (chunks) => <Text size="body2">{chunks}</Text>,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <Heading level="heading4">
          <FormattedMessage
            defaultMessage="Submission success"
            description="Title for the project submission success page"
            id="5+8FGz"
          />
        </Heading>
        <Text color="secondary" size="body1">
          <FormattedMessage
            defaultMessage="Your code has been successfully submitted and is now available for community review. "
            description="Description for the project submission success page"
            id="AK/+j2"
          />
        </Text>
        <Button
          label={intl.formatMessage({
            defaultMessage: 'View your submission',
            description:
              'Label for View your submission button on project submit page',
            id: 'Geiogi',
          })}
          size="lg"
          variant="primary"
        />
      </div>
      <Card
        className="flex flex-col gap-16 xl:gap-8"
        classNameOuter="mt-24"
        pattern={false}>
        <div className="grid gap-x-12 gap-y-8 xl:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Text size="body1">
              <FormattedMessage
                defaultMessage="Leveling progress"
                description="Label for leveling progress on project submission success page"
                id="KgN46v"
              />
            </Text>
            <div className="flex gap-6 self-stretch items-end">
              <UserAvatar
                className="w-20 h-20"
                profile={profile}
                size="custom"
              />
              <ProjectsLevelingProgressBar
                className="flex-1"
                currentLevel={2}
                currentRepCount={500}
                repIncrease={100}
                repTotal={700}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Text color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="You've gained rep in these skills:"
                  description="Label for skills gained on project submission success page"
                  id="TgOWsI"
                />
              </Text>
              <Button
                className="-me-3 !text-brand"
                label={intl.formatMessage({
                  defaultMessage: 'See all',
                  description:
                    'Label for See all button on project submission success page',
                  id: 'RZedau',
                })}
                variant="tertiary"
              />
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-3 mt-6 gap-2.5">
              <ProjectsSkillProgressBreakdownCard
                skill={{
                  key: 'javascript',
                  repIncrease: 100,
                  repTotal: 1000,
                }}
                subSkills={[
                  {
                    key: 'react',
                    repIncrease: 1000,
                  },
                  {
                    key: 'html',
                    repIncrease: 1000,
                  },
                ]}
              />
              <ProjectsSkillProgressBreakdownCard
                skill={{
                  key: 'javascript',
                  repIncrease: 100,
                  repTotal: 1000,
                }}
                subSkills={[
                  {
                    key: 'react',
                    repIncrease: 1000,
                  },
                  {
                    key: 'html',
                    repIncrease: 1000,
                  },
                ]}
              />
              <ProjectsSkillProgressBreakdownCard
                className="hidden xl:flex"
                skill={{
                  key: 'javascript',
                  repIncrease: 100,
                  repTotal: 1000,
                }}
                subSkills={[
                  {
                    key: 'react',
                    repIncrease: 1000,
                  },
                  {
                    key: 'html',
                    repIncrease: 1000,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-x-12 gap-y-8 xl:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Text size="body1">
              <FormattedMessage
                defaultMessage="{trackName} progress"
                description="Label for track progress on project submission success page"
                id="/9JvuU"
                values={{
                  trackName: 'Design Systems Track',
                }}
              />
            </Text>
            <div className="flex gap-6 self-stretch items-end">
              <div className="w-20 h-20 rounded-lg bg-red" />
              <ProjectsSegmentedProgressBar
                className="flex-1"
                currentSegmentCount={4}
                segmentIncrease={1}
                totalSegmentCount={11}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Text color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="Next project:"
                  description="Title for next project section on project submission success page"
                  id="rxpmQt"
                />
              </Text>
              <Button
                className="-me-3 !text-brand"
                label={intl.formatMessage({
                  defaultMessage: 'See all',
                  description:
                    'Label for See all button on project submission success page',
                  id: 'RZedau',
                })}
                variant="tertiary"
              />
            </div>
            <div className="bg-red rounded-lg mt-6 h-[188px]" />
          </div>
        </div>
        <div className="grid gap-x-12 gap-y-8 xl:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Text size="body1">
              <FormattedMessage
                defaultMessage="{skillPlanName} progress"
                description="Label for skill plan progress on project submission success page"
                id="iyz4Hv"
                values={{
                  skillPlanName: 'HTML skill plan',
                }}
              />
            </Text>
            <div className="flex gap-6 self-stretch items-end">
              <div className="w-20 h-20 rounded-lg bg-red" />
              <ProjectsSegmentedProgressBar
                className="flex-1"
                currentSegmentCount={4}
                segmentIncrease={1}
                totalSegmentCount={11}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Text color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="Next project:"
                  description="Title for next project section on project submission success page"
                  id="rxpmQt"
                />
              </Text>
              <Button
                className="-me-3 !text-brand"
                label={intl.formatMessage({
                  defaultMessage: 'See all',
                  description:
                    'Label for See all button on project submission success page',
                  id: 'RZedau',
                })}
                variant="tertiary"
              />
            </div>
            <div className="bg-red rounded-lg mt-6 h-[188px]" />
          </div>
        </div>
      </Card>
      <div className="flex flex-col mt-24">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Projects you may be interested in"
            description="Title for projects you may be interested in section on project submission success page"
            id="XkPGFj"
          />
        </Heading>
        <Section>
          <Text className="mt-4" color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Based on your activity, we think you might be interested in these projects"
              description="Description for projects you may be interested in section on project submission success page"
              id="1GF83M"
            />
          </Text>
          <ProjectsChallengeGridList
            challenges={suggestedChallenges}
            className="mt-12"
          />
        </Section>
      </div>
    </CardContainer>
  );
}
