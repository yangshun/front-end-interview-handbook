import clsx from 'clsx';
import { RiAmazonLine, RiGoogleLine, RiMetaLine } from 'react-icons/ri';

import DocusaurusLogo from '~/components/icons/DocusaurusLogo';
import FrontEndInterviewHandbookLogo from '~/components/icons/FrontEndInterviewHandbookLogo';
import SvelteLogo from '~/components/icons/SvelteLogo';
import { FormattedMessage } from '~/components/intl';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

type LogoProps = Readonly<{
  className: string;
}>;

export default function InterviewsMarketingPrepResourcesByBigTechEngineers() {
  const data = [
    {
      key: 'companies',
      label: (
        <FormattedMessage
          defaultMessage="Seniors to Principals at the world's best companies"
          description="Prep resources companies"
          id="+IgJAp"
        />
      ),
      logos: [
        {
          logo: ({ className }: LogoProps) => (
            <RiGoogleLine className={className} />
          ),
          name: 'Google',
        },
        {
          logo: ({ className }: LogoProps) => (
            <RiMetaLine className={className} />
          ),
          name: 'Meta',
        },
        {
          logo: ({ className }: LogoProps) => (
            <RiAmazonLine className={className} />
          ),
          name: 'Amazon',
        },
      ],
    },
    {
      key: 'widely-used',
      label: (
        <FormattedMessage
          defaultMessage="Creators of widely-used interview materials"
          description="Prep resources interview materials"
          id="z5iOkW"
        />
      ),
      logos: [
        {
          logo: ({ className }: LogoProps) => (
            <SvelteLogo className={clsx('text-[#585860]', className)} />
          ),
          name: 'Svelte',
        },
        {
          logo: ({ className }: LogoProps) => (
            <DocusaurusLogo className={clsx('text-[#585860]', className)} />
          ),
          name: 'Docusaurus',
        },
      ],
    },
    {
      key: 'feih',
      label: (
        <FormattedMessage
          defaultMessage="Core maintainers of well-known open source projects"
          description="Prep resources open source projects"
          id="5fJI7m"
        />
      ),
      logos: [
        {
          logo: ({ className }: LogoProps) => (
            <FrontEndInterviewHandbookLogo className={className} />
          ),
          name: 'Front End Interview Handbook',
        },
        {
          logo: () => (
            <Text
              className="text-base md:text-sm lg:text-base"
              size="inherit"
              weight="bold">
              Blind75
            </Text>
          ),
          name: 'Blind75',
        },
      ],
    },
  ];

  return (
    <Container className={clsx('flex flex-col gap-12', 'py-20')}>
      <div className="flex flex-col gap-6">
        <Heading
          className={clsx(
            themeGradientHeading,
            'max-w-xl lg:max-w-3xl',
            'pb-1',
          )}
          level="heading2"
          weight="medium">
          <FormattedMessage
            defaultMessage="Let big tech senior/staff engineers write your prep resources"
            description="Title for the prep resources section"
            id="vSCWmc"
          />
        </Heading>
        <Text
          className="max-w-2xl text-base lg:text-lg"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Having interviewed hundreds of candidates, we know what to look out for. Learn best practices and techniques gleaned from years of experience."
            description="Subtitle for the prep resources section"
            id="SgdFJp"
          />
        </Text>
      </div>
      <Section>
        <ScrollArea scrollbars="horizontal">
          <div className="flex flex-col justify-between gap-x-4 gap-y-6 md:flex-row lg:gap-x-6 ">
            {data.map((item) => (
              <div
                key={item.key}
                className={clsx(
                  'isolate overflow-hidden',
                  'flex-1 md:min-w-[260px] lg:min-w-[293px]',
                  'flex flex-col gap-6',
                  'py-6',
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
                <div
                  className={clsx(
                    'relative z-[1]',
                    'h-[180px]',
                    'flex items-center justify-center gap-4 xl:gap-6',
                    'px-6 md:px-4 lg:px-2.5',
                  )}>
                  {item.logos.map((logoItem) => (
                    <div
                      key={logoItem.name}
                      className={clsx(
                        'rounded-full',
                        'bg-neutral-200/40 dark:bg-neutral-800/40',
                        'size-20 md:size-16 lg:size-20 shrink-0',
                        'flex items-center justify-center',
                        themeGlassyBorder,
                      )}>
                      <logoItem.logo className="size-10 md:size-8 lg:size-10" />
                    </div>
                  ))}
                </div>
                <Text
                  className="px-6 md:px-4 lg:px-6"
                  size="body1"
                  weight="medium">
                  {item.label}
                </Text>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Section>
    </Container>
  );
}
