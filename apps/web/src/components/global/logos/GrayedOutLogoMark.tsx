import React, { useId } from 'react';
type Props = Readonly<{
  className?: string;
  height?: number;
  width?: number;
}>;

function GrayedOutLogoMark({ className, height = 20, width = 26 }: Props) {
  const linearGradientId1 = useId();
  const linearGradientId2 = useId();
  const linearGradientId3 = useId();

  return (
    <svg
      aria-label="GreatFrontEnd"
      className={className}
      fill="none"
      height={height}
      viewBox="0 0 314 240"
      width={width}
      xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.4">
        <path
          d="M117.513 0L156.684 40.048L78.3421 119.852L156.684 199.655L117.513 239.703L0 119.852L117.513 0Z"
          fill={`url(#${linearGradientId1})`}
        />
        <path
          d="M195.573 159.904L156.402 199.952L195.573 240L234.744 199.952L195.573 159.904Z"
          fill={`url(#${linearGradientId2})`}
        />
        <path
          d="M313.086 119.848L273.915 159.896L234.744 119.848L195.573 159.896L156.402 119.848L234.744 40.044L313.086 119.848Z"
          fill={`url(#${linearGradientId3})`}
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={linearGradientId1}
          x1="157"
          x2="157"
          y1="29.5"
          y2="186.5">
          <stop stopColor="#585858" />
          <stop offset="1" stopColor="#737381" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={linearGradientId2}
          x1="157"
          x2="157"
          y1="29.5"
          y2="186.5">
          <stop stopColor="#585858" />
          <stop offset="1" stopColor="#737381" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={linearGradientId3}
          x1="157"
          x2="157"
          y1="29.5"
          y2="186.5">
          <stop stopColor="#585858" />
          <stop offset="1" stopColor="#737381" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GrayedOutLogoMark;
