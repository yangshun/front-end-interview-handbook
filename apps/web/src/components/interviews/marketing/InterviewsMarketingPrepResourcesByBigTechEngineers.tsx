import clsx from 'clsx';
import { RiAmazonLine, RiGoogleLine, RiMetaLine } from 'react-icons/ri';

import DocusaurusLogo from '~/components/icons/DocusaurusLogo';
import FrontEndInterviewHandbookLogo from '~/components/icons/FrontEndInterviewHandbookLogo';
import SvelteLogo from '~/components/icons/SvelteLogo';
import { FormattedMessage } from '~/components/intl';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundCardWhiteOnLightColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeMarketingHeadingSize,
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
          defaultMessage="By Senior to Principal-level Engineers at the world's best companies"
          description="Prep resources companies"
          id="reqKoj"
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
            <FrontEndInterviewHandbookLogo className={className} />
          ),
          name: 'Front End Interview Handbook',
        },
        {
          logo: () => (
            <Text
              className="text-base sm:text-xs md:text-sm lg:text-base"
              size="inherit"
              weight="bold">
              Blind 75
            </Text>
          ),
          name: 'Blind 75',
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
            <SvelteLogo className={className} colorClassName="text-[#585860]" />
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
  ];

  return (
    <Container
      className={clsx('flex flex-col gap-12 lg:gap-16', 'py-16 sm:py-20')}
      tag="section"
      width="marketing">
      <div>
        <Heading className="sr-only" level="custom">
          <FormattedMessage
            defaultMessage="Made by experienced senior engineers"
            description="Marketing section title"
            id="li6epc"
          />
        </Heading>
        <Heading
          className={clsx(
            themeMarketingHeadingSize,
            themeGradientHeading,
            'pb-1 lg:max-w-3xl',
          )}
          level="custom"
          tag="p"
          weight="medium">
          <FormattedMessage
            defaultMessage="Let big tech senior/staff engineers write your prep resources"
            description="Title for the prep resources section"
            id="vSCWmc"
          />
        </Heading>
        <Text
          className={clsx(
            'mt-6 block',
            'text-base lg:text-lg',
            'lg:font-medium',
            'lg:max-w-2xl',
          )}
          color="secondary"
          size="inherit"
          weight="inherit">
          <FormattedMessage
            defaultMessage="Having interviewed hundreds of candidates, we know what to look out for. Learn best practices and techniques gleaned from years of experience."
            description="Subtitle for the prep resources section"
            id="SgdFJp"
          />
        </Text>
      </div>
      <Section>
        <ScrollArea scrollbars="horizontal">
          <CardContainer className="flex flex-col justify-between gap-x-4 gap-y-6 sm:flex-row lg:gap-x-6 ">
            {data.map((item) => (
              <Card
                key={item.key}
                brandColorSpotlight={false}
                className={clsx(
                  'flex flex-col gap-6',
                  'py-6',
                  'rounded-2xl',
                  'group',
                  themeBackgroundCardColor,
                  [
                    themeWhiteGlowCardBackground,
                    'before:-left-[70px] before:-top-10 before:h-[105px] before:w-[176px]',
                  ],
                )}
                classNameOuter="flex-1"
                disableBackground={true}
                padding={false}
                pattern={false}>
                <div
                  className={clsx(
                    'h-[180px] sm:h-[120px] md:h-[180px]',
                    'flex items-center justify-center gap-4 sm:gap-2 md:gap-4 xl:gap-6',
                    'px-6 sm:px-4 md:px-2.5 lg:px-3',
                  )}>
                  {item.logos.map((logoItem) => (
                    <div
                      key={logoItem.name}
                      className={clsx(
                        'rounded-full',
                        themeBackgroundCardWhiteOnLightColor,
                        'size-20 sm:size-14 md:size-16 lg:size-20 shrink-0',
                        'flex items-center justify-center',
                        themeGlassyBorder,
                      )}>
                      <logoItem.logo className="size-10 sm:size-7 md:size-8 lg:size-10" />
                    </div>
                  ))}
                </div>
                <Text
                  className={clsx(
                    'px-6 sm:px-4 lg:px-6',
                    'text-sm lg:text-base',
                  )}
                  size="inherit"
                  weight="medium">
                  {item.label}
                </Text>
              </Card>
            ))}
          </CardContainer>
        </ScrollArea>
      </Section>
    </Container>
  );
}
