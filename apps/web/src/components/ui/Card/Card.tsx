import clsx from 'clsx';
import type { ReactNode } from 'react';

import {
  themeBackgroundEmphasized,
  themeGlassyBorder,
} from '~/components/ui/theme';

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  pattern?: boolean;
}>;

export default function Card({ children, className, pattern = true }: Props) {
  return (
    <div
      className={clsx(
        'relative isolate overflow-clip rounded-lg bg-neutral-100 py-5 px-6',
        themeGlassyBorder,
        themeBackgroundEmphasized,
        className,
      )}>
      {children}
      {pattern && <BackgroundPattern />}
    </div>
  );
}

function BackgroundPattern() {
  return (
    <svg
      aria-hidden={true}
      className="absolute top-0 right-0 -z-10"
      fill="none"
      height="100%"
      viewBox="0 0 266 116"
      xmlns="http://www.w3.org/2000/svg">
      <mask
        height="116"
        id="mask0_321_49427"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
        width="266"
        x="0"
        y="0">
        <rect
          fill="url(#paint0_linear_321_49427)"
          height="116"
          rx="8"
          width="266"
        />
        <rect
          fill="url(#paint1_linear_321_49427)"
          height="116"
          rx="8"
          width="266"
        />
      </mask>
      <g mask="url(#mask0_321_49427)">
        <g opacity="0.3">
          <rect
            fill="url(#paint2_linear_321_49427)"
            height="161.226"
            transform="rotate(15 103.47 -58.6924)"
            width="0.700982"
            x="103.47"
            y="-58.6924"
          />
          <rect
            fill="url(#paint3_linear_321_49427)"
            height="161.226"
            transform="rotate(15 136.647 -49.8027)"
            width="0.700982"
            x="136.647"
            y="-49.8027"
          />
          <rect
            fill="url(#paint4_linear_321_49427)"
            height="161.226"
            transform="rotate(15 169.828 -40.9121)"
            width="0.700982"
            x="169.828"
            y="-40.9121"
          />
          <rect
            fill="url(#paint5_linear_321_49427)"
            height="161.226"
            transform="rotate(15 203.002 -32.0225)"
            width="0.700982"
            x="203.002"
            y="-32.0225"
          />
          <rect
            fill="url(#paint6_linear_321_49427)"
            height="161.226"
            transform="rotate(15 236.183 -23.1328)"
            width="0.700982"
            x="236.183"
            y="-23.1328"
          />
          <rect
            fill="url(#paint7_linear_321_49427)"
            height="161.226"
            transform="rotate(15 269.357 -14.2432)"
            width="0.700982"
            x="269.357"
            y="-14.2432"
          />
          <rect
            fill="url(#paint8_linear_321_49427)"
            height="161.226"
            transform="rotate(15 302.538 -5.35254)"
            width="0.700982"
            x="302.538"
            y="-5.35254"
          />
          <rect
            fill="url(#paint9_linear_321_49427)"
            height="161.226"
            transform="rotate(15 70.2925 -67.582)"
            width="0.700982"
            x="70.2925"
            y="-67.582"
          />
          <rect
            fill="url(#paint10_linear_321_49427)"
            height="161.226"
            transform="rotate(15 37.1152 -76.4727)"
            width="0.700982"
            x="37.1152"
            y="-76.4727"
          />
          <rect
            fill="url(#paint11_linear_321_49427)"
            height="0.700982"
            transform="rotate(15 -1.42383 -59.9463)"
            width="375.726"
            x="-1.42383"
            y="-59.9463"
          />
          <rect
            fill="url(#paint12_linear_321_49427)"
            height="0.700982"
            transform="rotate(15 -10.3125 -26.7686)"
            width="375.726"
            x="-10.3125"
            y="-26.7686"
          />
          <rect
            fill="url(#paint13_linear_321_49427)"
            height="0.700982"
            transform="rotate(15 -19.2017 6.40918)"
            width="375.726"
            x="-19.2017"
            y="6.40918"
          />
          <rect
            fill="url(#paint14_linear_321_49427)"
            height="0.700982"
            transform="rotate(15 -28.0938 39.5869)"
            width="375.726"
            x="-28.0938"
            y="39.5869"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_321_49427"
          x1="266"
          x2="-4.16762e-06"
          y1="116"
          y2="9.55678e-06">
          <stop stop-color="#27272A" />
          <stop offset="1" stop-color="#27272A" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_321_49427"
          x1="266"
          x2="-4.16762e-06"
          y1="116"
          y2="9.55678e-06">
          <stop stop-color="#27272A" />
          <stop offset="1" stop-color="#27272A" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_321_49427"
          x1="103.47"
          x2="103.47"
          y1="-58.6924"
          y2="102.533">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.48" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint3_linear_321_49427"
          x1="136.647"
          x2="136.647"
          y1="-49.8027"
          y2="111.423">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.48" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint4_linear_321_49427"
          x1="169.828"
          x2="169.828"
          y1="-40.9121"
          y2="120.314">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.48" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint5_linear_321_49427"
          x1="203.002"
          x2="203.002"
          y1="-32.0225"
          y2="129.203">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.48" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint6_linear_321_49427"
          x1="236.183"
          x2="236.183"
          y1="-23.1328"
          y2="138.093">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.64" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint7_linear_321_49427"
          x1="269.357"
          x2="269.357"
          y1="-14.2432"
          y2="146.983">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.48" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint8_linear_321_49427"
          x1="302.538"
          x2="302.538"
          y1="-5.35254"
          y2="155.873">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.48" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint9_linear_321_49427"
          x1="70.2925"
          x2="70.2925"
          y1="-67.582"
          y2="93.6438">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.48" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint10_linear_321_49427"
          x1="37.1152"
          x2="37.1152"
          y1="-76.4727"
          y2="84.7532">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#CBD5E1" stop-opacity="0.48" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint11_linear_321_49427"
          x1="374.302"
          x2="-1.42383"
          y1="-59.5958"
          y2="-59.5958">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#334155" stop-opacity="0.32" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint12_linear_321_49427"
          x1="365.414"
          x2="-10.3125"
          y1="-26.4181"
          y2="-26.4181">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#334155" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint13_linear_321_49427"
          x1="356.525"
          x2="-19.2017"
          y1="6.75967"
          y2="6.75967">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#334155" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint14_linear_321_49427"
          x1="347.632"
          x2="-28.0938"
          y1="39.9374"
          y2="39.9374">
          <stop stop-color="#334155" stop-opacity="0.01" />
          <stop offset="0.526196" stop-color="#334155" />
          <stop offset="1" stop-color="#334155" stop-opacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );
}
