import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import AmazonLogo from '../icons/AmazonLogo';
import FrontEndInterviewHandbookLogo from '../icons/FrontEndInterviewHandbookLogo';
import GoogleLogo from '../icons/GoogleLogo';
import MetaLogo from '../icons/MetaLogo';
import Button from '../ui/Button';

type MarketingHeroAuthorIntroductionProps = Readonly<{
  icons: React.ReactNode;
  title: string;
}>;

function MarketingHeroAuthorIntroduction({
  title,
  icons,
}: MarketingHeroAuthorIntroductionProps) {
  return (
    <div className="space-y-4 pb-6 text-xs font-medium sm:text-sm lg:space-y-5 lg:pb-8 lg:text-sm">
      <Text size="body2">{title}</Text>
      <Text className="flex items-center justify-center space-x-6 lg:space-x-8">
        {icons}
      </Text>
    </div>
  );
}

function MarketingHeroBackground(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      preserveAspectRatio="xMinYMin slice"
      viewBox="0 0 1376 718"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M0 0H1376V670C1376 696.51 1354.51 718 1328 718H48C21.4904 718 0 696.51 0 670V0Z"
        fill="url(#paint0_radial_401_76334)"
        opacity="0.5"
      />
      <mask
        height="718"
        id="mask0_401_76334"
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
        width="1376"
        x="0"
        y="0">
        <path
          d="M0 0H1376V670C1376 696.51 1354.51 718 1328 718H48C21.4904 718 0 696.51 0 670V0Z"
          fill="white"
          opacity="0.5"
        />
      </mask>
      <g mask="url(#mask0_401_76334)">
        <circle cx="245" cy="192" fill="#F1F5F9" fill-opacity="0.32" r="2" />
        <circle cx="250" cy="249" fill="#F1F5F9" fill-opacity="0.32" r="2" />
        <circle cx="148" cy="333" fill="#F1F5F9" fill-opacity="0.12" r="3" />
        <circle cx="337" cy="362" fill="#F1F5F9" fill-opacity="0.48" r="2" />
        <circle cx="366" cy="116" fill="#F1F5F9" fill-opacity="0.48" r="2" />
        <circle cx="899" cy="188" fill="#F1F5F9" fill-opacity="0.08" r="2" />
        <circle cx="491" cy="401" fill="#F1F5F9" fill-opacity="0.12" r="2" />
        <circle cx="491" cy="401" fill="#F1F5F9" fill-opacity="0.32" r="2" />
        <circle cx="818" cy="154" fill="#F1F5F9" fill-opacity="0.24" r="2" />
        <circle cx="988" cy="393" fill="#F1F5F9" fill-opacity="0.24" r="2" />
        <circle cx="995" cy="475" fill="#F1F5F9" fill-opacity="0.32" r="1" />
        <circle cx="869" cy="414" fill="#F1F5F9" fill-opacity="0.48" r="2" />
        <circle cx="1088" cy="209" fill="#F1F5F9" fill-opacity="0.48" r="2" />
        <circle cx="975" cy="127" fill="#F1F5F9" fill-opacity="0.32" r="1" />
        <circle cx="1259" cy="339" fill="#F1F5F9" fill-opacity="0.12" r="2" />
        <circle cx="1107" cy="525" fill="#F1F5F9" fill-opacity="0.4" r="1" />
        <circle cx="866" cy="484" fill="#F1F5F9" fill-opacity="0.32" r="1" />
        <circle cx="718" cy="428" fill="#F1F5F9" fill-opacity="0.64" r="1" />
        <circle cx="445" cy="479" fill="#F1F5F9" fill-opacity="0.72" r="1" />
        <circle cx="384" cy="453" fill="#F1F5F9" fill-opacity="0.16" r="2" />
        <circle cx="183" cy="498" fill="#F1F5F9" fill-opacity="0.32" r="1" />
        <circle cx="299" cy="409" fill="#F1F5F9" fill-opacity="0.24" r="1" />
        <g filter="url(#filter0_f_401_76334)">
          <path
            d="M1433.72 442.763C1430.04 439.762 1424.96 439.152 1420.68 441.195C1416.39 443.238 1413.66 447.569 1413.66 452.324V550.894H983.296C976.505 550.894 971 556.41 971 563.215V661.785C971 668.59 976.505 674.106 983.296 674.106H1413.66V772.676C1413.66 777.431 1416.39 781.762 1420.68 783.805C1424.96 785.848 1430.04 785.238 1433.72 782.237L1630.46 622.061C1633.33 619.722 1635 616.209 1635 612.5C1635 608.791 1633.33 605.278 1630.46 602.939L1433.72 442.763Z"
            fill="url(#paint1_linear_401_76334)"
          />
        </g>
        <g filter="url(#filter1_f_401_76334)">
          <path
            clip-rule="evenodd"
            d="M371 -65L832 304L548 362L371 -65Z"
            fill="url(#paint2_linear_401_76334)"
            fill-rule="evenodd"
          />
        </g>
      </g>
      <defs>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="616.828"
          id="filter0_f_401_76334"
          width="935.828"
          x="835.086"
          y="304.086">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_76334"
            stdDeviation="67.957"
          />
        </filter>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="698.828"
          id="filter1_f_401_76334"
          width="732.828"
          x="235.086"
          y="-200.914">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_76334"
            stdDeviation="67.957"
          />
        </filter>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(688 718) rotate(-90) scale(877.183 1681.06)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_401_76334"
          r="1">
          <stop stop-color="#E9D5FF" />
          <stop offset="0.223497" stop-color="#8383FD" />
          <stop offset="1" stop-color="#0F172A" stop-opacity="0.01" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_401_76334"
          x1="974.464"
          x2="986.754"
          y1="494.676"
          y2="790.36">
          <stop stop-color="#A855F7" />
          <stop offset="1" stop-color="#6366F1" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_401_76334"
          x1="264.422"
          x2="386.568"
          y1="61.9859"
          y2="432.799">
          <stop stop-color="#8383FD" />
          <stop offset="1" stop-color="#6366F1" stop-opacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MarketingHeroTextUnderline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      height="29"
      viewBox="0 0 253 29"
      width="253"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M4 24.9273C28.2793 24.9273 52.5586 24.9273 76.8378 24.9273C105.35 24.9273 134.101 25.7391 162.183 21.9377C173.362 20.4244 184.866 19.7659 195.733 17.4295C206.556 15.1027 217.393 12.736 228.032 10.0741C233.3 8.75581 238.123 6.81945 243.372 5.49481C245.107 5.05692 247.183 4 249 4"
        stroke="url(#paint0_radial_530_82356)"
        stroke-linecap="round"
        stroke-opacity="0.6"
        stroke-width="8"
      />
      <path
        d="M4 24.9273C28.2793 24.9273 52.5586 24.9273 76.8378 24.9273C105.35 24.9273 134.101 25.7391 162.183 21.9377C173.362 20.4244 184.866 19.7659 195.733 17.4295C206.556 15.1027 217.393 12.736 228.032 10.0741C233.3 8.75581 238.123 6.81945 243.372 5.49481C245.107 5.05692 247.183 4 249 4"
        stroke="url(#paint1_radial_530_82356)"
        stroke-linecap="round"
        stroke-opacity="0.6"
        stroke-width="8"
      />
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(-17.9378 1.80308) rotate(5.02506) scale(145.079 41.2041)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_530_82356"
          r="1">
          <stop stop-color="#DCC0FF" />
          <stop offset="0.297527" stop-color="#3C3CF2" />
          <stop offset="1" stop-opacity="0" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(249 25) rotate(-174.665) scale(161.465 27.8816)"
          gradientUnits="userSpaceOnUse"
          id="paint1_radial_530_82356"
          r="1">
          <stop stop-color="#DCC0FF" />
          <stop offset="0.307292" stop-color="#DBCEFF" />
          <stop offset="1" stop-color="#A18AE0" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function MarketingHero() {
  const intl = useIntl();

  return (
    <div className="relative rounded-b-[48px] bg-cover lg:mx-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-[-1] -mt-28 -mb-28 h-[calc(100%_+_112px)] w-full overflow-hidden rounded-[inherit]">
        <MarketingHeroBackground className="h-full w-full" />
      </div>
      <div className="relative pt-0 pb-8 sm:pb-16 md:pb-20">
        <div className={clsx('mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-24')}>
          <div className="flex flex-col items-center text-center">
            <Heading className="mx-auto mb-8 max-w-7xl" level="heading1">
              <FormattedMessage
                defaultMessage="The <underline>great</underline> way to prepare for front end interviews"
                description="Title of Hero section on Homepage. To describe the product in 1 line so that users understand it immediately."
                id="M/e+G9"
                values={{
                  underline: (chunks) => (
                    <span className="relative">
                      {chunks}
                      <MarketingHeroTextUnderline className="absolute left-0 bottom-0 z-[-1] ml-[-75%] mb-[-5%] w-[200%] hue-rotate-180 invert dark:filter-none" />
                    </span>
                  ),
                }}
              />
            </Heading>
            <div className="flex flex-col gap-y-2 gap-x-20 md:flex-row">
              <MarketingHeroAuthorIntroduction
                icons={
                  <>
                    <GoogleLogo
                      className="h-[1.5rem] lg:h-[2.1rem]"
                      title={intl.formatMessage({
                        defaultMessage: 'Google logo',
                        description: 'Google company logo',
                        id: 'da4RLj',
                      })}
                    />
                    ,
                    <AmazonLogo
                      className="mt-1 h-6 lg:mt-2 lg:h-7"
                      title={intl.formatMessage({
                        defaultMessage: 'Amazon logo',
                        description: 'Amazon company logo',
                        id: 'nai6YT',
                      })}
                    />
                    ,
                    <MetaLogo
                      className="h-4 lg:mb-2 lg:h-5"
                      title={intl.formatMessage({
                        defaultMessage: 'Meta logo',
                        description: 'Meta company logo',
                        id: 'a8ETQr',
                      })}
                    />
                  </>
                }
                title={intl.formatMessage({
                  defaultMessage: 'By ex-interviewers at',
                  description:
                    'Text above logos on Hero section of HomePage. To let users know that ex-interviewers at the stated companies have contributed expertise to this platform.',
                  id: 'LNz/aW',
                })}
              />
              <MarketingHeroAuthorIntroduction
                icons={
                  <>
                    <Text
                      className="font-semibold"
                      size="custom"
                      weight="custom">
                      Blind 75
                    </Text>
                    <div className="flex items-center gap-2">
                      <FrontEndInterviewHandbookLogo
                        className="h-9"
                        style={{
                          filter:
                            'sepia(90%) hue-rotate(190deg) brightness(90%)',
                        }}
                      />
                      <Text
                        className="text-left font-bold leading-4"
                        size="body2"
                        weight="custom">
                        Front End Interview
                        <br />
                        Handbook
                      </Text>
                    </div>
                  </>
                }
                title={intl.formatMessage({
                  defaultMessage: 'By creators of',
                  description:
                    'Text above logos on Hero section of HomePage. To let users know that the authors of this platform have also created the stated products.',
                  id: 'EM2v4V',
                })}
              />
            </div>
            <Text
              className="mx-auto mt-8 max-w-md text-base sm:text-lg md:mt-12 md:max-w-3xl md:text-xl xl:text-xl"
              color="secondary"
              display="block"
              size="custom">
              <FormattedMessage
                defaultMessage="The only end-to-end front end interview preparation platform.{br}Brought to you by big tech senior / staff front end engineers."
                description="Subtitle for Hero section on Homepage. Explains in more detail what the product does in order to attract the user to read on."
                id="AJhYP1"
                values={{
                  br: <br />,
                }}
              />
            </Text>
            <div className="mt-8 flex flex-col gap-x-2 gap-y-4 sm:flex-row">
              <div className="flex flex-col items-center gap-2">
                <Button
                  icon={RiArrowRightLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Get started (free)',
                    description:
                      'Label for Get Started button in Hero section of HomePage.',
                    id: 'RhEhnv',
                  })}
                  size="lg"
                  variant="primary"
                />
                <Text color="secondary" size="body3">
                  <FormattedMessage
                    defaultMessage="No sign in required"
                    description="Additional text below Get Start button on Hero section of HomePage. To let users know that they can try the product without signing in."
                    id="PzZtIi"
                  />
                </Text>
              </div>
              <Button
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'Try a question',
                  description:
                    'Label for Try a question button in Hero section of HomePage.',
                  id: 'pcKndh',
                })}
                size="lg"
                variant="tertiary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
