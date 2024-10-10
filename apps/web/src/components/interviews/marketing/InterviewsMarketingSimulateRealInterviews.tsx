import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeFillBrandColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

export default function InterviewsMarketingSimulateRealInterviews() {
  const data = [
    {
      image: PreviewSVG,
      key: 'previews',
      label: (
        <FormattedMessage
          defaultMessage="Run your code against tests and instantly preview your output"
          description="Label for item 1 for simulate real interviews section"
          id="7jRY6z"
        />
      ),
    },
    {
      image: WorkspaceSVG,
      key: 'workspace',
      label: (
        <FormattedMessage
          defaultMessage="Resize and customize the workspace as you like"
          description="Label for item 2 for simulate real interviews section"
          id="N+FW6k"
        />
      ),
    },
    {
      image: KeyboardSVG,
      key: 'keyboard',
      label: (
        <FormattedMessage
          defaultMessage="Syntax highlighting, theming and shortcuts"
          description="Label for item 3 for simulate real interviews section"
          id="4KKeKQ"
        />
      ),
    },
  ];

  return (
    <Section>
      <Container className={clsx('flex flex-col gap-12', 'py-20')}>
        <div className={clsx('lg:max-w-[634px]')}>
          <Heading
            className={clsx(themeGradientHeading)}
            level="heading2"
            weight="medium">
            <FormattedMessage
              defaultMessage="Practice in an environment that simulates real interviews"
              description="Title for the simulate real interviews section"
              id="1obIS0"
            />
          </Heading>
          <Text
            className={clsx(
              'mt-6 block',
              'text-base lg:text-lg',
              'lg:font-medium',
              'max-w-md lg:max-w-2xl',
            )}
            color="secondary"
            size="inherit"
            weight="inherit">
            <FormattedMessage
              defaultMessage="Our in-browser coding workspace allows you to simulate a real interview environment with no set up required."
              description="Subtitle for the simulate real interviews section"
              id="VMcSLx"
            />
          </Text>
        </div>
        <ScrollArea scrollbars="horizontal">
          <div className="flex flex-col justify-between gap-x-4 gap-y-6 md:flex-row lg:gap-x-6 ">
            {data.map(({ key, label, image: ImageSVG }) => (
              <div
                key={key}
                className={clsx(
                  'isolate overflow-hidden',
                  'flex-1',
                  'flex flex-col gap-6',
                  'p-6',
                  'rounded-2xl',
                  themeBackgroundCardColor,
                  [
                    themeWhiteGlowCardBackground,
                    'before:-left-[70px] before:-top-10 before:h-[105px] before:w-[176px]',
                  ],
                )}>
                <div
                  className={clsx(
                    'size-full !absolute inset-0 z-[1] rounded-[inherit] before:m-[-1px]',
                    themeGlassyBorder,
                  )}
                />
                <div className="relative z-[1] py-3 lg:h-[180px]">
                  <ImageSVG />
                </div>

                <Text size="body1" weight="medium">
                  {label}
                </Text>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Container>
    </Section>
  );
}

function PreviewSVG() {
  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 302 180"
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        fill="url(#paint0_linear_1027_20368)"
        height="154"
        rx="5.08518"
        width="302"
      />
      <rect
        height="153.152"
        rx="4.66141"
        stroke="url(#paint1_angular_1027_20368)"
        strokeOpacity="0.25"
        strokeWidth="1"
        width="301.152"
        x="0.423765"
        y="0.423765"
      />
      <circle
        className="fill-neutral-400 dark:fill-neutral-600"
        cx="11.3692"
        cy="11.3692"
        r="2.36923"
      />
      <circle
        className="fill-neutral-400 dark:fill-neutral-600"
        cx="20.3692"
        cy="11.3692"
        r="2.36923"
      />
      <circle
        className="fill-neutral-400 dark:fill-neutral-600"
        cx="29.3692"
        cy="11.3692"
        r="2.36923"
      />
      <g opacity="0.26">
        <rect
          className="fill-neutral-400 dark:fill-neutral-600"
          height="10"
          rx="2"
          width="120"
          x="91"
          y="6"
        />
      </g>
      <path
        className="fill-neutral-50 dark:fill-neutral-800"
        d="M8 30C8 28.8954 8.89543 28 10 28H34C35.1046 28 36 28.8954 36 30V132C36 133.105 35.1046 134 34 134H10C8.89543 134 8 133.105 8 132V30Z"
        fillOpacity="0.8"
      />
      <path
        className="fill-neutral-400 dark:fill-neutral-700"
        d="M16 40C16 38.8954 16.8954 38 18 38H26C27.1046 38 28 38.8954 28 40V48C28 49.1046 27.1046 50 26 50H18C16.8954 50 16 49.1046 16 48V40Z"
        opacity="0.5"
      />
      <path
        className="fill-neutral-400 dark:fill-neutral-700"
        d="M16 57C16 55.8954 16.8954 55 18 55H26C27.1046 55 28 55.8954 28 57V65C28 66.1046 27.1046 67 26 67H18C16.8954 67 16 66.1046 16 65V57Z"
        opacity="0.5"
      />
      <path
        className="fill-neutral-400 dark:fill-neutral-700"
        d="M16 74C16 72.8954 16.8954 72 18 72H26C27.1046 72 28 72.8954 28 74V82C28 83.1046 27.1046 84 26 84H18C16.8954 84 16 83.1046 16 82V74Z"
        opacity="0.5"
      />
      <path
        className="fill-neutral-400 dark:fill-neutral-700"
        d="M16 91C16 89.8954 16.8954 89 18 89H26C27.1046 89 28 89.8954 28 91V99C28 100.105 27.1046 101 26 101H18C16.8954 101 16 100.105 16 99V91Z"
        opacity="0.5"
      />
      <path
        className="fill-neutral-400 dark:fill-neutral-700"
        d="M16 108C16 106.895 16.8954 106 18 106H26C27.1046 106 28 106.895 28 108V116C28 117.105 27.1046 118 26 118H18C16.8954 118 16 117.105 16 116V108Z"
        opacity="0.5"
      />
      <path
        className="fill-neutral-50 dark:fill-neutral-800"
        d="M40 36C40 31.5817 43.5817 28 48 28H120C124.418 28 128 31.5817 128 36V126C128 130.418 124.418 134 120 134H48C43.5817 134 40 130.418 40 126V36Z"
        fillOpacity="0.8"
      />
      <g opacity="0.4">
        <rect fill="#71717A" height="4" rx="2" width="15" x="49" y="42" />
        <rect fill="#71717A" height="4" rx="2" width="15" x="49" y="117" />
        <rect fill="#71717A" height="4" rx="2" width="22" x="57" y="51" />
        <rect fill="#71717A" height="4" rx="2" width="22" x="57" y="108" />
        <rect fill="#71717A" height="4" rx="2" width="32" x="57" y="67" />
        <rect fill="#71717A" height="4" rx="2" width="33" x="57" y="59" />
        <rect fill="#71717A" height="4" rx="2" width="41.8329" x="57" y="99" />
        <rect fill="#3F3F46" height="4" rx="2" width="28" x="65" y="75" />
        <rect fill="#3F3F46" height="4" rx="2" width="40" x="65" y="83" />
        <rect fill="#3F3F46" height="4" rx="2" width="22" x="65" y="91" />
      </g>
      <path
        className="fill-neutral-50 dark:fill-neutral-800"
        d="M40 36C40 31.5817 43.5817 28 48 28H120C124.418 28 128 31.5817 128 36V126C128 130.418 124.418 134 120 134H48C43.5817 134 40 130.418 40 126V36Z"
        fillOpacity="0.8"
      />
      <g opacity="0.4">
        <rect fill="#71717A" height="4" rx="2" width="15" x="49" y="42" />
        <rect fill="#71717A" height="4" rx="2" width="15" x="49" y="117" />
        <rect fill="#71717A" height="4" rx="2" width="22" x="57" y="51" />
        <rect fill="#71717A" height="4" rx="2" width="22" x="57" y="108" />
        <rect fill="#71717A" height="4" rx="2" width="32" x="57" y="67" />
        <rect fill="#71717A" height="4" rx="2" width="33" x="57" y="59" />
        <rect fill="#71717A" height="4" rx="2" width="41.8329" x="57" y="99" />
        <rect
          className="fill-neutral-300 dark:fill-neutral-700"
          height="4"
          rx="2"
          width="28"
          x="65"
          y="75"
        />
        <rect
          className="fill-neutral-300 dark:fill-neutral-700"
          height="4"
          rx="2"
          width="40"
          x="65"
          y="83"
        />
        <rect
          className="fill-neutral-300 dark:fill-neutral-700"
          height="4"
          rx="2"
          width="22"
          x="65"
          y="91"
        />
      </g>
      <path
        className="fill-neutral-50 dark:fill-neutral-800"
        d="M132 36C132 31.5817 135.582 28 140 28H287C291.418 28 295 31.5817 295 36V126C295 130.418 291.418 134 287 134H140C135.582 134 132 130.418 132 126V36Z"
        fillOpacity="0.8"
      />
      <path
        className={clsx(
          'fill-white dark:fill-[#1E1E21]',
          'stroke-neutral-300 dark:stroke-neutral-700',
        )}
        d="M136.5 39C136.5 38.1716 137.172 37.5 138 37.5H190C190.828 37.5 191.5 38.1716 191.5 39V105C191.5 105.828 190.828 106.5 190 106.5H138C137.172 106.5 136.5 105.828 136.5 105V39Z"
      />
      <rect fill="#71717A" height="3" rx="1.5" width="15" x="141" y="42" />
      <rect
        className="fill-neutral-300 dark:fill-neutral-700"
        height="3"
        rx="1.5"
        width="28"
        x="141"
        y="48"
      />
      <rect
        className="fill-neutral-300 dark:fill-neutral-700"
        height="2"
        rx="1"
        width="24"
        x="150"
        y="62.5"
      />
      <rect
        className="fill-neutral-300 dark:fill-neutral-700"
        height="2"
        rx="1"
        width="24"
        x="150"
        y="70.5"
      />
      <rect
        className="fill-neutral-300 dark:fill-neutral-700"
        height="2"
        rx="1"
        width="24"
        x="150"
        y="78.5"
      />
      <path
        className="fill-neutral-300 dark:fill-neutral-700"
        d="M141 63C141 61.3431 142.343 60 144 60C145.657 60 147 61.3431 147 63C147 64.6569 145.657 66 144 66C142.343 66 141 64.6569 141 63Z"
        fillOpacity="0.3"
      />
      <path
        d="M141.15 63C141.15 61.426 142.426 60.15 144 60.15C145.574 60.15 146.85 61.426 146.85 63C146.85 64.574 145.574 65.85 144 65.85C142.426 65.85 141.15 64.574 141.15 63Z"
        stroke="#3F3F46"
        strokeOpacity="0.5"
        strokeWidth="0.3"
      />
      <path
        className="fill-neutral-300 dark:fill-neutral-700"
        d="M141 71C141 69.3431 142.343 68 144 68C145.657 68 147 69.3431 147 71C147 72.6569 145.657 74 144 74C142.343 74 141 72.6569 141 71Z"
        fillOpacity="0.3"
      />
      <path
        d="M141.15 71C141.15 69.426 142.426 68.15 144 68.15C145.574 68.15 146.85 69.426 146.85 71C146.85 72.574 145.574 73.85 144 73.85C142.426 73.85 141.15 72.574 141.15 71Z"
        stroke="#3F3F46"
        strokeOpacity="0.5"
        strokeWidth="0.3"
      />
      <path
        className="fill-neutral-300 dark:fill-neutral-700"
        d="M141 79C141 77.3431 142.343 76 144 76C145.657 76 147 77.3431 147 79C147 80.6569 145.657 82 144 82C142.343 82 141 80.6569 141 79Z"
        fillOpacity="0.3"
      />
      <path
        d="M141.15 79C141.15 77.426 142.426 76.15 144 76.15C145.574 76.15 146.85 77.426 146.85 79C146.85 80.574 145.574 81.85 144 81.85C142.426 81.85 141.15 80.574 141.15 79Z"
        stroke="#3F3F46"
        strokeOpacity="0.5"
        strokeWidth="0.3"
      />
      <rect
        className={clsx(
          'fill-neutral-50 dark:fill-neutral-800',
          'stroke-neutral-300 dark:stroke-neutral-700',
        )}
        height="7.5"
        opacity="0.4"
        rx="1.25"
        stroke="#3F3F46"
        strokeWidth="0.5"
        width="20.5"
        x="141.25"
        y="93.25"
      />
      <rect
        className={clsx(
          'fill-neutral-400 dark:fill-[#353539]',
          'stroke-neutral-300 dark:stroke-neutral-700',
        )}
        height="7.5"
        opacity="0.8"
        rx="1.25"
        strokeWidth="0.5"
        width="20.5"
        x="165.25"
        y="93.25"
      />
      <rect
        className={themeFillBrandColor}
        height="10"
        rx="1.5"
        width="26.6667"
        x="268"
        y="139"
      />
      <rect
        fill="black"
        height="1.77778"
        rx="0.888889"
        width="11.7778"
        x="278.008"
        y="143.077"
      />
      <path
        d="M275.095 144.025L272.375 145.971C272.316 146.013 272.237 145.996 272.197 145.933C272.183 145.91 272.176 145.883 272.176 145.856V141.965C272.176 141.889 272.233 141.827 272.304 141.827C272.329 141.827 272.354 141.835 272.375 141.85L275.095 143.796C275.154 143.838 275.17 143.924 275.13 143.987C275.121 144.002 275.109 144.015 275.095 144.025Z"
        fill="black"
      />
      <rect
        className={clsx(
          'fill-neutral-50 dark:fill-neutral-800',
          'stroke-neutral-300 dark:stroke-neutral-700',
        )}
        height="9.5"
        opacity="0.4"
        rx="1.25"
        strokeWidth="0.5"
        width="30.5"
        x="234.25"
        y="139.25"
      />
      <rect
        className={clsx(
          'fill-neutral-50 dark:fill-neutral-800',
          'stroke-neutral-300 dark:stroke-neutral-700',
        )}
        height="9.5"
        opacity="0.4"
        rx="1.25"
        strokeWidth="0.5"
        width="30.5"
        x="200.25"
        y="139.25"
      />
      <rect
        className={clsx(
          'fill-neutral-50 dark:fill-neutral-800',
          'stroke-neutral-300 dark:stroke-neutral-700',
        )}
        height="9.5"
        opacity="0.4"
        rx="1.25"
        strokeWidth="0.5"
        width="30.5"
        x="8.25"
        y="139.25"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1027_20368"
          x1="0"
          x2="21.5"
          y1="0"
          y2="9.5">
          <stop
            className="text-[#E4E4E7] dark:text-[#4C4C50]"
            stopColor="currentColor"
            stopOpacity="0.61"
          />
          <stop
            className="text-[#fff] dark:text-[#27272A]"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(151 77) scale(151 77)"
          gradientUnits="userSpaceOnUse"
          id="paint1_angular_1027_20368"
          r="1">
          <stop
            className="text-[#D4D4D8] dark:text-[#3F3F46]"
            offset="0.471864"
            stopColor="currentColor"
          />
          <stop
            className="text-[#A1A1AA40] dark:text-[#D8D8E1]"
            offset="0.65625"
            stopColor="currentColor"
          />
          <stop
            className="text-[#D4D4D8] dark:text-[#3F3F46]"
            offset="1"
            stopColor="currentColor"
          />
        </radialGradient>
      </defs>
    </svg>
  );
}

function WorkspaceSVG() {
  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 302 180"
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        fill="url(#paint0_linear_1027_20429)"
        height="154"
        rx="5.08518"
        width="302"
      />
      <rect
        height="153.152"
        rx="4.66141"
        stroke="url(#paint1_angular_1027_20429)"
        strokeOpacity="0.25"
        strokeWidth="0.84753"
        width="301.152"
        x="0.423765"
        y="0.423765"
      />
      <circle
        className="fill-neutral-400 dark:fill-neutral-600"
        cx="11.3692"
        cy="11.3692"
        r="2.36923"
      />
      <circle
        className="fill-neutral-400 dark:fill-neutral-600"
        cx="20.3692"
        cy="11.3692"
        r="2.36923"
      />
      <circle
        className="fill-neutral-400 dark:fill-neutral-600"
        cx="29.3692"
        cy="11.3692"
        r="2.36923"
      />
      <g opacity="0.26">
        <rect
          className="fill-neutral-400 dark:fill-neutral-600"
          height="10"
          rx="2"
          width="120"
          x="91"
          y="6"
        />
      </g>
      <path
        className="fill-neutral-50 dark:fill-neutral-800"
        d="M8 36C8 31.5817 11.5817 28 16 28H88C92.4183 28 96 31.5817 96 36V138C96 142.418 92.4183 146 88 146H16C11.5817 146 8 142.418 8 138V36Z"
        fillOpacity="0.8"
      />
      <rect fill="#71717A" height="4" rx="2" width="38" x="21" y="71" />
      <rect fill="#71717A" height="4" rx="2" width="41.8329" x="21" y="98" />
      <rect
        className="fill-neutral-300 dark:fill-neutral-700"
        height="4"
        rx="2"
        width="67"
        x="21"
        y="80"
      />
      <rect
        className="fill-neutral-300 dark:fill-neutral-700"
        height="4"
        rx="2"
        width="28"
        x="21"
        y="89"
      />
      <path
        className="fill-neutral-50 dark:fill-neutral-800"
        d="M107 35C107 30.5817 110.582 27 115 27H187C191.418 27 195 30.5817 195 35V138C195 142.418 191.418 146 187 146H115C110.582 146 107 142.418 107 138V35Z"
        fillOpacity="0.8"
      />
      <path
        className="stroke-neutral-300 dark:stroke-[#3A3A40]"
        d="M206.607 141.062C206.344 140.427 206.16 139.75 206.068 139.045L206.563 138.98C206.522 138.66 206.5 138.332 206.5 138V137.019H206V135.058H206.5V133.096H206V131.135H206.5V129.173H206V127.212H206.5V125.25H206V123.289H206.5V121.327H206V119.365H206.5V117.404H206V115.442H206.5V113.481H206V111.519H206.5V109.558H206V107.596H206.5V105.635H206V103.673H206.5V101.712H206V99.75H206.5V97.7885H206V95.8269H206.5V93.8654H206V91.9039H206.5V89.9423H206V87.9808H206.5V86.0192H206V84.0577H206.5V82.0962H206V80.1346H206.5V78.1731H206V76.2115H206.5V74.25H206V72.2885H206.5V70.3269H206V68.3654H206.5V66.4038H206V64.4423H206.5V62.4808H206V60.5192H206.5V58.5577H206V56.5962H206.5V54.6346H206V52.6731H206.5V50.7115H206V48.75H206.5V46.7885H206V44.8269H206.5V42.8654H206V40.9038H206.5V38.9423H206V36.9808H206.5V36C206.5 35.6675 206.522 35.3404 206.563 35.0198L206.068 34.9551C206.16 34.2496 206.344 33.573 206.607 32.9377L207.069 33.1292C207.322 32.5198 207.653 31.9506 208.049 31.4344L207.653 31.1297C208.079 30.5755 208.576 30.0787 209.13 29.6528L209.434 30.0493C209.951 29.6525 210.52 29.3216 211.129 29.0689L210.938 28.607C211.573 28.3436 212.25 28.1596 212.955 28.0676L213.02 28.5634C213.34 28.5216 213.668 28.5 214 28.5H215V28H217V28.5H219V28H221V28.5H223V28H225V28.5H227V28H229V28.5H231V28H233V28.5H235V28H237V28.5H239V28H241V28.5H243V28H245V28.5H247V28H249V28.5H251V28H253V28.5H255V28H257V28.5H259V28H261V28.5H263V28H265V28.5H267V28H269V28.5H271V28H273V28.5H275V28H277V28.5H279V28H281V28.5H283V28H285V28.5H286C286.332 28.5 286.66 28.5216 286.98 28.5634L287.045 28.0676C287.75 28.1596 288.427 28.3436 289.062 28.607L288.871 29.0689C289.48 29.3216 290.049 29.6525 290.566 30.0493L290.87 29.6528C291.424 30.0787 291.921 30.5755 292.347 31.1297L291.951 31.4344C292.347 31.9506 292.678 32.5198 292.931 33.1292L293.393 32.9377C293.656 33.573 293.84 34.2496 293.932 34.9551L293.437 35.0198C293.478 35.3404 293.5 35.6675 293.5 36V36.9807H294V38.9423H293.5V40.9038H294V42.8653H293.5V44.8269H294V46.7884H293.5V48.75H294V50.7115H293.5V52.673H294V54.6346H293.5V56.5961H294V58.5577H293.5V60.5192H294V62.4807H293.5V64.4423H294V66.4038H293.5V68.3654H294V70.3269H293.5V72.2884H294V74.25H293.5V76.2115H294V78.1731H293.5V80.1346H294V82.0961H293.5V84.0577H294V86.0192H293.5V87.9808H294V89.9423H293.5V91.9038H294V93.8654H293.5V95.8269H294V97.7885H293.5V99.75H294V101.712H293.5V103.673H294V105.635H293.5V107.596H294V109.558H293.5V111.519H294V113.481H293.5V115.442H294V117.404H293.5V119.365H294V121.327H293.5V123.288H294V125.25H293.5V127.212H294V129.173H293.5V131.135H294V133.096H293.5V135.058H294V137.019H293.5V138C293.5 138.332 293.478 138.66 293.437 138.98L293.932 139.045C293.84 139.75 293.656 140.427 293.393 141.062L292.931 140.871C292.678 141.48 292.347 142.049 291.951 142.566L292.347 142.87C291.921 143.424 291.424 143.921 290.87 144.347L290.566 143.951C290.049 144.347 289.48 144.678 288.871 144.931L289.062 145.393C288.427 145.656 287.75 145.84 287.045 145.932L286.98 145.437C286.66 145.478 286.332 145.5 286 145.5H285V146H283V145.5H281V146H279V145.5H277V146H275V145.5H273V146H271V145.5H269V146H267V145.5H265V146H263V145.5H261V146H259V145.5H257V146H255V145.5H253V146H251V145.5H249V146H247V145.5H245V146H243V145.5H241V146H239V145.5H237V146H235V145.5H233V146H231V145.5H229V146H227V145.5H225V146H223V145.5H221V146H219V145.5H217V146H215V145.5H214C213.668 145.5 213.34 145.478 213.02 145.437L212.955 145.932C212.25 145.84 211.573 145.656 210.938 145.393L211.129 144.931C210.52 144.678 209.951 144.347 209.434 143.951L209.13 144.347C208.576 143.921 208.079 143.424 207.653 142.87L208.049 142.566C207.653 142.049 207.322 141.48 207.069 140.871L206.607 141.062Z"
        strokeDasharray="2 2"
      />
      <g filter="url(#filter0_d_1027_20429)">
        <path
          className="fill-neutral-200 dark:fill-[#2B2B2D]"
          d="M133 28C133 23.5817 136.582 20 141 20H213C217.418 20 221 23.5817 221 28V130C221 134.418 217.418 138 213 138H141C136.582 138 133 134.418 133 130V28Z"
        />
      </g>
      <path
        d="M101.067 27.25C101.259 27.5833 101.741 27.5833 101.933 27.25L103.665 24.25C103.858 23.9167 103.617 23.5 103.232 23.5H99.7679C99.383 23.5 99.1425 23.9167 99.3349 24.25L101.067 27.25Z"
        fill="#71717A"
        opacity="0.4"
      />
      <rect
        fill="url(#paint2_linear_1027_20429)"
        height="118"
        rx="0.5"
        width="1"
        x="101"
        y="28"
      />
      <g clipPath="url(#clip0_1027_20429)">
        <mask
          height="20"
          id="mask0_1027_20429"
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'luminance',
          }}
          width="20"
          x="134"
          y="11">
          <path d="M154 11H134V31H154V11Z" fill="white" />
        </mask>
        <g mask="url(#mask0_1027_20429)">
          <path
            d="M141.875 19.125C142.188 19 142.75 19.0625 142.938 19.4375C143.063 19.75 143.188 20.1875 143.188 20.125C143.188 19.875 143.188 19.375 143.25 19.125C143.313 18.9375 143.438 18.75 143.688 18.6875C143.875 18.625 144.062 18.625 144.25 18.625C144.437 18.6875 144.625 18.8125 144.75 18.9375C145 19.3125 145 20.125 145 20.0625C145.063 19.875 145.062 19.3125 145.188 19.0625C145.25 18.9375 145.5 18.8125 145.625 18.75C145.812 18.6875 146.062 18.6875 146.25 18.75C146.375 18.75 146.625 18.9375 146.687 19.0625C146.812 19.25 146.875 19.875 146.938 20.125C146.938 20.1875 147 19.875 147.125 19.6875C147.375 19.3125 148.25 19.1875 148.312 20.0625C148.312 20.5 148.312 20.4375 148.312 20.75C148.312 21.0625 148.312 21.25 148.312 21.5C148.312 21.75 148.25 22.3125 148.188 22.5625C148.125 22.75 147.938 23.1875 147.75 23.4375C147.75 23.4375 147.062 24.1875 147 24.5625C146.937 24.9375 146.938 24.9375 146.938 25.1875C146.938 25.4375 147 25.75 147 25.75C147 25.75 146.5 25.8125 146.25 25.75C146 25.6875 145.688 25.25 145.625 25.0625C145.5 24.875 145.312 24.875 145.188 25.0625C145.062 25.3125 144.75 25.75 144.562 25.75C144.125 25.8125 143.25 25.75 142.625 25.75C142.625 25.75 142.75 25.125 142.5 24.875C142.313 24.6875 142 24.375 141.812 24.1875L141.312 23.625C141.125 23.375 140.688 23.0625 140.562 22.375C140.438 21.8125 140.438 21.5 140.562 21.25C140.688 21 141 20.875 141.125 20.875C141.25 20.875 141.563 20.875 141.688 20.9375C141.813 21 141.875 21.0625 142 21.1875C142.125 21.375 142.188 21.5 142.125 21.25C142.062 21.0625 141.938 20.875 141.875 20.625C141.813 20.375 141.625 20.0625 141.625 19.6875C141.312 19.6875 141.375 19.3125 141.875 19.125Z"
            fill="white"
          />
        </g>
        <mask
          height="20"
          id="mask1_1027_20429"
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'luminance',
          }}
          width="20"
          x="134"
          y="11">
          <path d="M154 11H134V31H154V11Z" fill="white" />
        </mask>
        <g mask="url(#mask1_1027_20429)">
          <path
            d="M141.875 19.125C142.188 19 142.75 19.0625 142.938 19.4375C143.063 19.75 143.187 20.1875 143.187 20.125C143.187 19.875 143.188 19.375 143.25 19.125C143.313 18.9375 143.438 18.75 143.688 18.6875C143.875 18.625 144.062 18.625 144.25 18.625C144.437 18.6875 144.625 18.8125 144.75 18.9375C145 19.3125 145 20.125 145 20.0625C145.063 19.875 145.062 19.3125 145.187 19.0625C145.25 18.9375 145.5 18.8125 145.625 18.75C145.813 18.6875 146.062 18.6875 146.25 18.75C146.375 18.75 146.625 18.9375 146.687 19.0625C146.812 19.25 146.875 19.875 146.938 20.125C146.938 20.1875 147 19.875 147.125 19.6875C147.375 19.3125 148.25 19.1875 148.312 20.0625C148.312 20.5 148.312 20.4375 148.312 20.75C148.312 21.0625 148.312 21.25 148.312 21.5C148.312 21.75 148.25 22.3125 148.188 22.5625C148.125 22.75 147.937 23.1875 147.75 23.4375C147.75 23.4375 147.062 24.1875 147 24.5625C146.937 24.9375 146.938 24.9375 146.938 25.1875C146.938 25.4375 147 25.75 147 25.75C147 25.75 146.5 25.8125 146.25 25.75C146 25.6875 145.688 25.25 145.625 25.0625C145.5 24.875 145.312 24.875 145.187 25.0625C145.062 25.3125 144.75 25.75 144.562 25.75C144.125 25.8125 143.25 25.75 142.625 25.75C142.625 25.75 142.75 25.125 142.5 24.875C142.313 24.6875 142 24.375 141.813 24.1875L141.312 23.625C141.125 23.375 140.688 23.0625 140.563 22.375C140.438 21.8125 140.438 21.5 140.563 21.25C140.688 21 141 20.875 141.125 20.875C141.25 20.875 141.563 20.875 141.688 20.9375C141.813 21 141.875 21.0625 142 21.1875C142.125 21.375 142.188 21.5 142.125 21.25C142.063 21.0625 141.938 20.875 141.875 20.625C141.813 20.375 141.625 20.0625 141.625 19.6875C141.312 19.6875 141.375 19.3125 141.875 19.125Z"
            stroke="black"
            strokeLinejoin="round"
            strokeWidth="0.46875"
          />
        </g>
        <mask
          height="20"
          id="mask2_1027_20429"
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'luminance',
          }}
          width="20"
          x="134"
          y="11">
          <path d="M154 11H134V31H154V11Z" fill="white" />
        </mask>
        <g mask="url(#mask2_1027_20429)">
          <path
            d="M146.25 23.9375V21.8125"
            stroke="black"
            strokeLinecap="round"
            strokeWidth="0.46875"
          />
        </g>
        <mask
          height="20"
          id="mask3_1027_20429"
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'luminance',
          }}
          width="20"
          x="134"
          y="11">
          <path d="M154 11H134V31H154V11Z" fill="white" />
        </mask>
        <g mask="url(#mask3_1027_20429)">
          <path
            d="M145 23.9375L144.938 21.8125"
            stroke="black"
            strokeLinecap="round"
            strokeWidth="0.46875"
          />
        </g>
        <mask
          height="20"
          id="mask4_1027_20429"
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'luminance',
          }}
          width="20"
          x="134"
          y="11">
          <path d="M154 11H134V31H154V11Z" fill="white" />
        </mask>
        <g mask="url(#mask4_1027_20429)">
          <path
            d="M143.75 21.8125V23.9375"
            stroke="black"
            strokeLinecap="round"
            strokeWidth="0.46875"
          />
        </g>
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="133.5"
          id="filter0_d_1027_20429"
          width="99"
          x="127.5"
          y="20">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology
            in="SourceAlpha"
            operator="erode"
            radius="5"
            result="effect1_dropShadow_1027_20429"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="5.25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_1027_20429"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1027_20429"
            mode="normal"
            result="shape"
          />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1027_20429"
          x1="0"
          x2="21.5"
          y1="0"
          y2="9.5">
          <stop
            className="text-[#E4E4E7] dark:text-[#4C4C509C]"
            stopColor="currentColor"
            stopOpacity="0.61"
          />
          <stop
            className="text-[#fff] dark:text-[#27272A]"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(151 77) scale(151 77)"
          gradientUnits="userSpaceOnUse"
          id="paint1_angular_1027_20429"
          r="1">
          <stop
            className="text-[#D4D4D8] dark:text-[#3F3F46]"
            offset="0.471864"
            stopColor="currentColor"
          />
          <stop
            className="text-[#A1A1AA40] dark:text-[#D8D8E1]"
            offset="0.65625"
            stopColor="currentColor"
          />
          <stop
            className="text-[#D4D4D8] dark:text-[#3F3F46]"
            offset="1"
            stopColor="currentColor"
          />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_1027_20429"
          x1="101.5"
          x2="101.5"
          y1="28"
          y2="138.5">
          <stop
            className="text-[#BDBDC2] dark:text-[#71717A]"
            stopColor="currentColor"
            stopOpacity="0.34"
          />
          <stop
            className="text-[#ECECEE] dark:text-[#232325]"
            offset="1"
            stopColor="currentColor"
          />
        </linearGradient>
        <clipPath id="clip0_1027_20429">
          <rect
            fill="white"
            height="20"
            transform="translate(134 11)"
            width="20"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function KeyboardSVG() {
  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 302 180"
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1027_20473)">
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="186.322"
            x="89.9628"
            y="134.255"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="186.322"
            x="89.9628"
            y="134.255"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="3.48626"
            y="134.255"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="3.48626"
            y="134.255"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="22.0157"
            cy="150.416"
            r="2.36923"
          />
        </g>
        <rect
          fill="url(#paint0_linear_1027_20473)"
          height="33.1692"
          rx="5.08518"
          width="37.9077"
          x="45.707"
          y="133.831"
        />
        <rect
          height="32.3217"
          rx="4.66141"
          stroke="url(#paint1_angular_1027_20473)"
          strokeOpacity="0.25"
          strokeWidth="0.84753"
          width="37.0602"
          x="46.1308"
          y="134.255"
        />
        <path
          className="fill-neutral-700 dark:fill-neutral-300"
          d="M61.0714 155.146C60.6414 155.146 60.2489 155.042 59.8939 154.834C59.539 154.623 59.2557 154.339 59.0441 153.984C58.8325 153.626 58.7267 153.233 58.7267 152.807C58.7267 152.373 58.8325 151.979 59.0441 151.624C59.2557 151.269 59.539 150.986 59.8939 150.774C60.2489 150.563 60.6414 150.457 61.0714 150.457H62.1362V148.88H61.0714C60.6414 148.88 60.2489 148.776 59.8939 148.568C59.539 148.356 59.2557 148.075 59.0441 147.723C58.8325 147.368 58.7267 146.974 58.7267 146.541C58.7267 146.111 58.8325 145.718 59.0441 145.363C59.2557 145.008 59.539 144.727 59.8939 144.518C60.2489 144.307 60.6414 144.201 61.0714 144.201C61.5014 144.201 61.8939 144.307 62.2489 144.518C62.6038 144.727 62.8871 145.008 63.0987 145.363C63.3137 145.718 63.4212 146.111 63.4212 146.541V147.6H64.9929V146.541C64.9929 146.111 65.097 145.718 65.3051 145.363C65.5168 145.008 65.8 144.727 66.155 144.518C66.5099 144.307 66.9041 144.201 67.3376 144.201C67.7676 144.201 68.1601 144.307 68.515 144.518C68.87 144.727 69.1515 145.008 69.3597 145.363C69.5713 145.718 69.6771 146.111 69.6771 146.541C69.6771 146.974 69.5713 147.368 69.3597 147.723C69.1481 148.075 68.8649 148.356 68.5099 148.568C68.1584 148.776 67.7676 148.88 67.3376 148.88H66.2778V150.457H67.3376C67.7676 150.457 68.1584 150.563 68.5099 150.774C68.8649 150.986 69.1481 151.269 69.3597 151.624C69.5713 151.979 69.6771 152.373 69.6771 152.807C69.6771 153.233 69.5713 153.626 69.3597 153.984C69.1481 154.339 68.8649 154.623 68.5099 154.834C68.1584 155.042 67.7676 155.146 67.3376 155.146C66.9041 155.146 66.5099 155.042 66.155 154.834C65.8 154.623 65.5168 154.339 65.3051 153.984C65.097 153.626 64.9929 153.233 64.9929 152.807V151.737H63.4212V152.807C63.4212 153.233 63.3137 153.626 63.0987 153.984C62.8871 154.339 62.6038 154.623 62.2489 154.834C61.8939 155.042 61.5014 155.146 61.0714 155.146ZM61.0714 153.867C61.2659 153.867 61.4434 153.819 61.6038 153.723C61.7676 153.628 61.8973 153.5 61.9929 153.339C62.0884 153.179 62.1362 153.001 62.1362 152.807V151.737H61.0714C60.8769 151.737 60.6994 151.786 60.539 151.885C60.3786 151.981 60.2506 152.109 60.155 152.269C60.0595 152.43 60.0117 152.609 60.0117 152.807C60.0117 153.001 60.0577 153.179 60.1499 153.339C60.2455 153.5 60.3734 153.628 60.5339 153.723C60.6977 153.819 60.8769 153.867 61.0714 153.867ZM61.0714 147.6H62.1362V146.541C62.1362 146.343 62.0884 146.165 61.9929 146.008C61.8973 145.848 61.7676 145.72 61.6038 145.624C61.4434 145.529 61.2659 145.481 61.0714 145.481C60.8769 145.481 60.6994 145.529 60.539 145.624C60.3786 145.72 60.2506 145.848 60.155 146.008C60.0595 146.165 60.0117 146.343 60.0117 146.541C60.0117 146.735 60.0577 146.914 60.1499 147.078C60.2455 147.239 60.3734 147.367 60.5339 147.462C60.6977 147.554 60.8769 147.6 61.0714 147.6ZM66.2778 147.6H67.3376C67.5321 147.6 67.7096 147.554 67.87 147.462C68.0304 147.367 68.1567 147.239 68.2488 147.078C68.3444 146.918 68.3922 146.739 68.3922 146.541C68.3922 146.343 68.3444 146.165 68.2488 146.008C68.1567 145.848 68.0304 145.72 67.87 145.624C67.7096 145.529 67.5321 145.481 67.3376 145.481C67.1396 145.481 66.9604 145.529 66.8 145.624C66.6396 145.72 66.5116 145.848 66.4161 146.008C66.3239 146.165 66.2778 146.343 66.2778 146.541V147.6ZM67.3376 153.867C67.5321 153.867 67.7096 153.819 67.87 153.723C68.0304 153.628 68.1567 153.5 68.2488 153.339C68.3444 153.179 68.3922 153.001 68.3922 152.807C68.3922 152.609 68.3444 152.43 68.2488 152.269C68.1567 152.109 68.0304 151.981 67.87 151.885C67.7096 151.786 67.5321 151.737 67.3376 151.737H66.2778V152.807C66.2778 153.001 66.3239 153.179 66.4161 153.339C66.5116 153.5 66.6396 153.628 66.8 153.723C66.9604 153.819 67.1396 153.867 67.3376 153.867ZM63.4212 150.457H64.9929V148.88H63.4212V150.457Z"
        />
        <rect
          fill="url(#paint2_linear_1027_20473)"
          height="33.1692"
          rx="5.08518"
          width="37.9077"
          x="90.7227"
          y="53.2773"
        />
        <rect
          height="32.3217"
          rx="4.66141"
          stroke="url(#paint3_angular_1027_20473)"
          strokeOpacity="0.25"
          strokeWidth="0.84753"
          width="37.0602"
          x="91.1464"
          y="53.7011"
        />
        <path
          className="fill-neutral-700 dark:fill-neutral-300"
          d="M108.763 74.3623H105.21V63.8777H108.834C109.875 63.8777 110.77 64.0876 111.517 64.5074C112.268 64.9238 112.845 65.5228 113.247 66.3043C113.65 67.0859 113.851 68.0211 113.851 69.1098C113.851 70.2019 113.648 71.1405 113.242 71.9255C112.84 72.7104 112.258 73.3128 111.497 73.7326C110.739 74.1524 109.828 74.3623 108.763 74.3623ZM107.109 72.719H108.671C109.401 72.719 110.01 72.5859 110.498 72.3197C110.986 72.05 111.353 71.649 111.599 71.1166C111.845 70.5808 111.968 69.9118 111.968 69.1098C111.968 68.3077 111.845 67.6422 111.599 67.1132C111.353 66.5808 110.99 66.1832 110.509 65.9204C110.031 65.6542 109.437 65.5211 108.727 65.5211H107.109V72.719Z"
        />
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="24.8085"
            y="93.9775"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="24.8085"
            y="93.9775"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="43.338"
            cy="110.139"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="1.11712"
            y="53.7011"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="1.11712"
            y="53.7011"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="19.6466"
            cy="69.8624"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="23.623"
            y="13.4238"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="23.623"
            y="13.4238"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="42.1524"
            cy="29.5851"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="69.8222"
            y="93.9775"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="69.8222"
            y="93.9775"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="88.3517"
            cy="110.139"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="46.1308"
            y="53.7011"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="46.1308"
            y="53.7011"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="64.6602"
            cy="69.8624"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="68.6386"
            y="13.4238"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="68.6386"
            y="13.4238"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="87.1681"
            cy="29.5851"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="114.838"
            y="93.9775"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="114.838"
            y="93.9775"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="133.367"
            cy="110.139"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="113.654"
            y="13.4238"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="113.654"
            y="13.4238"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="132.184"
            cy="29.5851"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="159.855"
            y="93.9775"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="159.855"
            y="93.9775"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="178.385"
            cy="110.139"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="136.162"
            y="53.7011"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="136.162"
            y="53.7011"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="154.691"
            cy="69.8624"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="158.668"
            y="13.4238"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="158.668"
            y="13.4238"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="177.197"
            cy="29.5851"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="204.869"
            y="93.9775"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="204.869"
            y="93.9775"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="223.399"
            cy="110.139"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="181.178"
            y="53.7011"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="181.178"
            y="53.7011"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="199.707"
            cy="69.8624"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="203.687"
            y="13.4238"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="203.687"
            y="13.4238"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="222.217"
            cy="29.5851"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="249.885"
            y="93.9775"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="249.885"
            y="93.9775"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="268.414"
            cy="110.139"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="226.191"
            y="53.7011"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="226.191"
            y="53.7011"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="244.721"
            cy="69.8624"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            className="fill-neutral-200 dark:fill-neutral-800"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="248.701"
            y="13.4238"
          />
          <rect
            className="stroke-neutral-300 dark:stroke-neutral-700"
            height="32.3217"
            rx="4.66141"
            strokeWidth="0.84753"
            width="37.0602"
            x="248.701"
            y="13.4238"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="267.231"
            cy="29.5851"
            r="2.36923"
          />
        </g>
        <g opacity="0.6">
          <rect
            fill="url(#paint4_linear_1027_20473)"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="-21.3926"
            y="13.4238"
          />
          <rect
            height="32.3217"
            rx="4.66141"
            stroke="url(#paint5_linear_1027_20473)"
            strokeWidth="0.84753"
            width="37.0602"
            x="-21.3926"
            y="13.4238"
          />
        </g>
        <g opacity="0.6">
          <rect
            fill="url(#paint6_linear_1027_20473)"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            width="37.0602"
            x="-21.5762"
            y="94.4238"
          />
          <rect
            height="32.3217"
            rx="4.66141"
            stroke="url(#paint7_linear_1027_20473)"
            strokeWidth="0.84753"
            width="37.0602"
            x="-21.5762"
            y="94.4238"
          />
        </g>
        <g opacity="0.6">
          <rect
            fill="url(#paint8_linear_1027_20473)"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            transform="matrix(-1 0 0 1 330.061 94)"
            width="37.0602"
            x="-0.423765"
            y="0.423765"
          />
          <rect
            height="32.3217"
            rx="4.66141"
            stroke="url(#paint9_linear_1027_20473)"
            strokeWidth="0.84753"
            transform="matrix(-1 0 0 1 330.061 94)"
            width="37.0602"
            x="-0.423765"
            y="0.423765"
          />
        </g>
        <g opacity="0.6">
          <rect
            fill="url(#paint10_linear_1027_20473)"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            transform="matrix(-1 0 0 1 308.059 53)"
            width="37.0602"
            x="-0.423765"
            y="0.423765"
          />
          <rect
            height="32.3217"
            rx="4.66141"
            stroke="url(#paint11_linear_1027_20473)"
            strokeWidth="0.84753"
            transform="matrix(-1 0 0 1 308.059 53)"
            width="37.0602"
            x="-0.423765"
            y="0.423765"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="2.36923"
            cy="2.36923"
            r="2.36923"
            transform="matrix(-1 0 0 1 292.322 67.2158)"
          />
        </g>
        <g opacity="0.6">
          <rect
            fill="url(#paint12_linear_1027_20473)"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            transform="matrix(-1 0 0 1 319.059 134)"
            width="37.0602"
            x="-0.423765"
            y="0.423765"
          />
          <rect
            height="32.3217"
            rx="4.66141"
            stroke="url(#paint13_linear_1027_20473)"
            strokeWidth="0.84753"
            transform="matrix(-1 0 0 1 319.059 134)"
            width="37.0602"
            x="-0.423765"
            y="0.423765"
          />
          <circle
            className="fill-neutral-400 dark:fill-neutral-600"
            cx="2.36923"
            cy="2.36923"
            r="2.36923"
            transform="matrix(-1 0 0 1 303.322 148.216)"
          />
        </g>
        <g opacity="0.6">
          <rect
            fill="url(#paint14_linear_1027_20473)"
            fillOpacity="0.4"
            height="32.3217"
            rx="4.66141"
            transform="matrix(-1 0 0 1 329.059 13)"
            width="37.0602"
            x="-0.423765"
            y="0.423765"
          />
          <rect
            height="32.3217"
            rx="4.66141"
            stroke="url(#paint15_linear_1027_20473)"
            strokeWidth="0.84753"
            transform="matrix(-1 0 0 1 329.059 13)"
            width="37.0602"
            x="-0.423765"
            y="0.423765"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1027_20473"
          x1="64.6609"
          x2="64.6609"
          y1="133.831"
          y2="167">
          <stop
            className="text-neutral-300 dark:text-[#4C4C50]"
            stopColor="currentColor"
            stopOpacity="0.61"
          />
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(64.6609 150.416) scale(18.9538 16.5846)"
          gradientUnits="userSpaceOnUse"
          id="paint1_angular_1027_20473"
          r="1">
          <stop offset="0.471864" stopColor="#3F3F46" />
          <stop offset="0.65625" stopColor="#D8D8E1" />
          <stop offset="1" stopColor="#3F3F46" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_1027_20473"
          x1="109.677"
          x2="109.677"
          y1="53.2773"
          y2="86.4466">
          <stop
            className="text-neutral-300 dark:text-[#4C4C50]"
            stopColor="currentColor"
            stopOpacity="0.61"
          />
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(109.677 69.862) scale(18.9538 16.5846)"
          gradientUnits="userSpaceOnUse"
          id="paint3_angular_1027_20473"
          r="1">
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            offset="0.471864"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-[#D8D8E1]"
            offset="0.65625"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            offset="1"
            stopColor="currentColor"
          />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint4_linear_1027_20473"
          x1="16"
          x2="-0.499998"
          y1="30"
          y2="30">
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint5_linear_1027_20473"
          x1="16"
          x2="2.5"
          y1="30"
          y2="30">
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint6_linear_1027_20473"
          x1="15.8164"
          x2="-0.683592"
          y1="111"
          y2="111">
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint7_linear_1027_20473"
          x1="15.8164"
          x2="2.31641"
          y1="111"
          y2="111">
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint8_linear_1027_20473"
          x1="37.8164"
          x2="32.4082"
          y1="17"
          y2="17">
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint9_linear_1027_20473"
          x1="37.8164"
          x2="29.4082"
          y1="17"
          y2="17">
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint10_linear_1027_20473"
          x1="37.8164"
          x2="12.4082"
          y1="17"
          y2="17">
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint11_linear_1027_20473"
          x1="37.8164"
          x2="10.9082"
          y1="17"
          y2="17">
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint12_linear_1027_20473"
          x1="37.8164"
          x2="25.9082"
          y1="17"
          y2="17">
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint13_linear_1027_20473"
          x1="37.8164"
          x2="20.9082"
          y1="17"
          y2="17">
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint14_linear_1027_20473"
          x1="37.8164"
          x2="32.4082"
          y1="17"
          y2="17">
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-50 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint15_linear_1027_20473"
          x1="37.8164"
          x2="29.4082"
          y1="17"
          y2="17">
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-700"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <clipPath id="clip0_1027_20473">
          <rect fill="white" height="180" width="302" />
        </clipPath>
      </defs>
    </svg>
  );
}
