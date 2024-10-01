import clsx from 'clsx';
import Image from 'next/image';

import { FormattedMessage } from '~/components/intl';
import MarketingSectionHeader from '~/components/marketing/MarketingSectionHeader';
import Container from '~/components/ui/Container';
import Marquee from '~/components/ui/Marquee';
import { themeGlassyBorder } from '~/components/ui/theme';

export default function ProjectsMarketingPortfolioMarquee() {
  return (
    <>
      <Container className="py-16 lg:py-[72px]">
        <div
          className={clsx(
            'mx-auto md:max-w-screen-sm lg:max-w-4xl',
            'text-balance',
          )}>
          <MarketingSectionHeader
            heading={
              <FormattedMessage
                defaultMessage="Here are some awesome ideas for your portfolio, imagined for you"
                description="Heading of the 'Here are some awesome ideas for your portfolio, imagined for you' marketing section on Projects home page"
                id="Ue7Ujc"
              />
            }
          />
        </div>
      </Container>
      <Marquee
        maskEdges={false}
        periodSeconds={PORTFOLIOS.length * 10}
        startEndGap={24}>
        <div className="flex gap-x-6">
          {PORTFOLIOS.map(({ src, alt, id }) => (
            <div
              key={id}
              className={clsx(
                'h-[236px] w-[358px] sm:h-[480px] sm:w-[728px]',
                'overflow-clip rounded-lg',
                themeGlassyBorder,
              )}>
              <Image
                alt={alt}
                className="h-full w-full object-cover"
                height={480}
                src={src}
                width={728}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </>
  );
}

const PORTFOLIOS: ReadonlyArray<{
  alt: string;
  id: string;
  src: string;
}> = [
  {
    alt: 'Portfolio for entire design system',
    id: 'portfolio-1',
    src: '/img/marketing/projects/portfolio/portfolio-A.png',
  },
  {
    alt: 'Portfolio for AI Sass Product',
    id: 'portfolio-2',
    src: '/img/marketing/projects/portfolio/portfolio-B.png',
  },
  {
    alt: 'Portfolio of pinterest and unsplash hybrid',
    id: 'portfolio-3',
    src: '/img/marketing/projects/portfolio/portfolio-C.png',
  },
  {
    alt: 'Portfolio of component kit of web application in svelt ',
    id: 'portfolio-4',
    src: '/img/marketing/projects/portfolio/portfolio-D.png',
  },
  {
    alt: 'Portfolio of component kit of web application in svelt ',
    id: 'portfolio-5',
    src: '/img/marketing/projects/portfolio/portfolio-E.png',
  },
];
