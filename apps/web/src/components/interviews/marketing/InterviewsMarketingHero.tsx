import clsx from 'clsx';
import { PiPathBold } from 'react-icons/pi';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import MarketingHeroBackground from '~/components/marketing/MarketingHeroBackground';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import AmazonLogo from '../../icons/AmazonLogo';
import FrontEndInterviewHandbookLogo from '../../icons/FrontEndInterviewHandbookLogo';
import GoogleLogo from '../../icons/GoogleLogo';
import MetaLogo from '../../icons/MetaLogo';
import Anchor from '../../ui/Anchor';
import Button from '../../ui/Button';

type MarketingHeroAuthorIntroductionProps = Readonly<{
  icons: React.ReactNode;
  title: string;
}>;

function MarketingHeroAuthorIntroduction({
  title,
  icons,
}: MarketingHeroAuthorIntroductionProps) {
  return (
    <div className="space-y-4 text-xs font-medium sm:text-sm lg:space-y-5 lg:text-sm">
      <Text className="block text-center" size="body2">
        {title}
      </Text>
      <Text
        className="flex items-center justify-center gap-x-6 lg:gap-x-8"
        size="body1">
        {icons}
      </Text>
    </div>
  );
}

function MarketingHeroTextUnderline(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 159 32"
      width="159"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M4.19504 22.3283C18.8792 25.5879 30.9156 27.876 46.2735 27.5981C64.3086 27.2718 83.436 27.8 101.13 23.6778C108.174 22.0369 114.513 21.2012 121.345 18.7409C128.149 16.2905 134.961 13.8002 141.642 11.017C144.951 9.63863 147.967 7.6474 151.263 6.26291C152.352 5.80524 153.647 4.72473 154.796 4.70393"
        stroke="url(#paint0_radial_1164_60765)"
        strokeLinecap="round"
        strokeOpacity="0.6"
        strokeWidth="8"
      />
      <path
        d="M4.19504 22.3283C18.8792 25.5879 30.9156 27.876 46.2735 27.5981C64.3086 27.2718 83.436 27.8 101.13 23.6778C108.174 22.0369 114.513 21.2012 121.345 18.7409C128.149 16.2905 134.961 13.8002 141.642 11.017C144.951 9.63863 147.967 7.6474 151.263 6.26291C152.352 5.80524 153.647 4.72473 154.796 4.70393"
        stroke="url(#paint1_radial_1164_60765)"
        strokeLinecap="round"
        strokeOpacity="0.6"
        strokeWidth="8"
      />
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(-14.0938 5.56197) rotate(6.87605) scale(92.3109 40.9693)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_1164_60765"
          r="1">
          <stop stopColor="#DCC0FF" />
          <stop offset="0.297527" stopColor="#3C3CF2" />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(155.177 25.7001) rotate(-172.353) scale(139.094 37.4795)"
          gradientUnits="userSpaceOnUse"
          id="paint1_radial_1164_60765"
          r="1">
          <stop stopColor="#DCC0FF" />
          <stop offset="0.307292" stopColor="#DBCEFF" />
          <stop offset="1" stopColor="#A18AE0" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function InterviewsMarketingHero() {
  const intl = useIntl();

  return (
    <div className="relative isolate lg:mx-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -mb-28 -mt-28 flex h-[calc(100%_+_112px)] w-full justify-center overflow-hidden rounded-b-3xl lg:rounded-b-[48px]">
        <MarketingHeroBackground className="h-full min-w-[1200px]" />
      </div>
      <div className="relative pb-8 pt-0 sm:pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-24">
          <div className="flex flex-col items-center gap-y-8">
            <div className="flex flex-col items-center gap-y-16">
              <div className="flex flex-col items-center gap-y-6 sm:gap-y-7">
                <Anchor
                  className={clsx(
                    'group relative inline-flex items-center gap-x-1 rounded-full',
                    'px-3 py-0.5',
                    'text-sm font-medium text-neutral-300',
                    'bg-brand/20 hover:bg-brand/30 transition-colors',
                    'shiny shadow-sm',
                  )}
                  href="/interviews/roadmap"
                  prefetch={null}
                  variant="unstyled">
                  <PiPathBold
                    className={clsx(
                      'text-brand size-4 shrink-0',
                      'transition-transform duration-150 ease-in-out group-hover:scale-105',
                    )}
                  />
                  <FormattedMessage
                    defaultMessage="View roadmap"
                    description="Entrypoint for view roadmap on hero section of Interviews"
                    id="3l9u0k"
                  />
                  <RiArrowRightLine
                    className={clsx(
                      'text-brand size-4 shrink-0',
                      'transition-transform duration-150 ease-in-out group-hover:scale-105',
                    )}
                  />
                </Anchor>
                <Heading className="max-w-3xl text-center" level="heading1">
                  <FormattedMessage
                    defaultMessage="The <underline>great</underline> way to prepare for <span>front end</span> interviews"
                    description="Title of Hero section on Homepage. To describe the product in 1 line so that users understand it immediately."
                    id="NMtINV"
                    values={{
                      span: (chunks) => (
                        <span className="whitespace-nowrap">{chunks}</span>
                      ),
                      underline: (chunks) => (
                        <span className="relative">
                          {chunks}
                          <MarketingHeroTextUnderline className="absolute bottom-0 left-0 -z-10 mb-[-12%] ml-[-3%] w-[110%] hue-rotate-180 invert dark:filter-none sm:mb-[-7%]" />
                        </span>
                      ),
                    }}
                  />
                </Heading>
              </div>
              <div className="flex flex-col gap-x-20 gap-y-8 md:flex-row">
                <MarketingHeroAuthorIntroduction
                  icons={
                    <>
                      <GoogleLogo
                        className="h-[1.5rem] text-white lg:h-[2.1rem]"
                        title={intl.formatMessage({
                          defaultMessage: 'Google logo',
                          description: 'Google company logo',
                          id: 'da4RLj',
                        })}
                      />
                      <AmazonLogo
                        className="mt-1 h-6 text-white lg:mt-2 lg:h-7"
                        title={intl.formatMessage({
                          defaultMessage: 'Amazon logo',
                          description: 'Amazon company logo',
                          id: 'nai6YT',
                        })}
                      />
                      <MetaLogo
                        className="h-4 text-white lg:mb-2 lg:h-5"
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
                        className="text-base font-semibold text-white sm:text-2xl"
                        color="inherit"
                        size="inherit"
                        weight="inherit">
                        Blind 75
                      </Text>
                      <div className="flex items-center gap-2">
                        <FrontEndInterviewHandbookLogo className="h-9" />
                        <Text
                          className="text-left font-bold leading-4"
                          size="body2"
                          weight="inherit">
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
            </div>
            <Text
              className="mx-auto block max-w-sm text-center text-base sm:text-base md:max-w-3xl md:text-lg xl:text-xl"
              color="subtitle">
              <FormattedMessage
                defaultMessage="The only end-to-end front end interview preparation platform.{br} Brought to you by big tech Senior / Staff Front End Engineers."
                description="Subtitle for Hero section on Homepage. Explains in more detail what the product does in order to attract the user to read on."
                id="fhTYwQ"
                values={{
                  br: <br className="hidden md:inline" />,
                }}
              />
            </Text>
            <div className="mt-8 flex flex-col gap-x-2 gap-y-4 self-stretch sm:mt-0 sm:flex-row sm:self-auto">
              <div className="flex flex-col items-center gap-2 self-stretch">
                <Button
                  className="self-stretch sm:self-auto"
                  href="/prepare"
                  icon={RiArrowRightLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Get started (free)',
                    description:
                      'Label for Get Started button in Hero section of HomePage.',
                    id: 'RhEhnv',
                  })}
                  prefetch={null}
                  size="lg"
                  variant="primary"
                />
                <Text color="subtitle" size="body3">
                  <FormattedMessage
                    defaultMessage="No sign in required"
                    description="Additional text below Get Start button on Hero section of HomePage. To let users know that they can try the product without signing in."
                    id="PzZtIi"
                  />
                </Text>
              </div>
              <Button
                href="/questions"
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'Try a question',
                  description:
                    'Label for Try a question button in Hero section of HomePage.',
                  id: 'pcKndh',
                })}
                prefetch={null}
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
