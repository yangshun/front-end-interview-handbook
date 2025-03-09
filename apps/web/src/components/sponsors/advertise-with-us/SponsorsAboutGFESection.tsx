'use client';

import clsx from 'clsx';
import { RiArrowRightUpLine } from 'react-icons/ri';

import { UsersCountAllTime } from '~/data/Stats';

import LogoMark from '~/components/global/logos/LogoMark';
import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import { FormattedMessage, useIntl } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundCardNoAlphaColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

export default function SponsorsAboutGFESection() {
  const intl = useIntl();
  const testimonialsObjects = InterviewsMarketingTestimonialsDict();

  const users = [
    {
      image: testimonialsObjects.yuChienChan.authorThumbnailUrl,
      name: testimonialsObjects.yuChienChan.name,
    },
    {
      image: testimonialsObjects.chenweiZhang.authorThumbnailUrl,
      name: testimonialsObjects.chenweiZhang.name,
    },
    {
      image: testimonialsObjects.anand.authorThumbnailUrl,
      name: testimonialsObjects.anand.name,
    },
    {
      image: testimonialsObjects.shoaibAhmed.authorThumbnailUrl,
      name: testimonialsObjects.shoaibAhmed.name,
    },
    {
      image: testimonialsObjects.luke.authorThumbnailUrl,
      name: testimonialsObjects.luke.name,
    },
  ];

  const companies = [
    {
      logoUrl: '/img/company-logos/amazon-logomark.svg',
      name: 'Amazon',
    },
    {
      logoUrl: '/img/company-logos/meta-logomark.svg',
      name: 'Meta',
    },
    {
      logoUrl: '/img/company-logos/shopify-logomark.svg',
      name: 'Shopify',
    },
    {
      logoUrl: '/img/company-logos/google-logomark.svg',
      name: 'Google',
    },
  ];

  const products = [
    {
      description: intl.formatMessage({
        defaultMessage:
          "The world's leading platform for front end engineers to prepare for technical interviews",
        description: 'Description for interviews product',
        id: 'jYhEuD',
      }),
      href: '/',
      image: {
        srcDark: '/img/sponsors/product-interviews-dark.png',
        srcLight: '/img/sponsors/product-interviews-light.png',
      },
      key: 'interviews',
      title: intl.formatMessage({
        defaultMessage: 'Technical interview preparation platform',
        description: 'Title for interviews product',
        id: '7f9BoF',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'A platform to learn front-end development the practical way—by building real-world projects from beginner to pro.',
        description: 'Description for projects product',
        id: 'TNt++l',
      }),
      href: '/projects',
      image: {
        srcDark: '/img/sponsors/product-projects-dark.png',
        srcLight: '/img/sponsors/product-projects-light.png',
      },
      key: 'projects',
      title: intl.formatMessage({
        defaultMessage: 'Real world projects platform',
        description: 'Title for projects product',
        id: 'XdTpL0',
      }),
    },
  ];

  return (
    <div
      className={clsx('flex flex-col gap-y-12 lg:gap-y-16', 'py-16 sm:py-20')}>
      <div className={clsx('flex flex-col items-center', 'text-center')}>
        <Text color="subtitle" size="body1" weight="medium">
          <FormattedMessage
            defaultMessage="What is GreatFrontEnd"
            description="Label for what is GFE"
            id="TRy1SC"
          />
        </Text>
        <Heading
          className={clsx(
            'max-w-[700px] xl:max-w-[900px]',
            themeGradientHeading,
            'mb-8 mt-4',
          )}
          level="heading2"
          tag="p"
          weight="medium">
          <FormattedMessage
            defaultMessage="A platform built to help front end engineers upskill and advance their careers"
            description="Advertise with us section title"
            id="Xvce0b"
          />
        </Heading>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="whitespace-nowrap">
            {users.map((item, index) => (
              <Avatar
                key={item.name}
                alt={item.name ?? ''}
                className={clsx(
                  'size-6',
                  ['border', 'border-white dark:border-neutral-900'],
                  'relative',
                  index > 0 && '-ml-1',
                )}
                size="custom"
                src={item.image!}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Text color="subtitle" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Used by {count}+ engineers"
                description="Label for used by engineers"
                id="pJ+l2i"
                values={{
                  count: UsersCountAllTime,
                }}
              />
            </Text>
            <Text color="subtitle" size="body2" weight="medium">
              •
            </Text>
            <Text color="subtitle" size="body2" weight="medium">
              <FormattedMessage
                defaultMessage="Built by ex-senior engineers from"
                description="Label for built by"
                id="WClrFo"
              />
            </Text>
          </div>
          <div className="isolate flex">
            {companies.map((company, index) => (
              <Tooltip key={company.name} asChild={true} label={company.name}>
                <div
                  className={clsx(
                    'flex items-center justify-center',
                    'size-6 shrink-0',
                    'rounded-full',
                    'overflow-hidden',
                    'bg-white',
                    'hover:z-[1]',
                    ['border', 'border-neutral-200 dark:border-neutral-900'],
                    index > 0 && '-ml-1.5',
                  )}>
                  <img
                    alt={company.name}
                    className="size-3"
                    decoding="async"
                    loading="lazy"
                    src={company.logoUrl}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
      <div className={clsx('relative', 'flex flex-col gap-6 sm:flex-row')}>
        {products.map((product) => (
          <ProductCard
            key={product.key}
            className="flex-1"
            description={product.description}
            href={product.href}
            image={product.image}
            title={product.title}
          />
        ))}
        <div className="absolute left-[calc(50%-32px)] top-[calc(50%-32px)] sm:top-[25%] lg:top-1/3">
          <LogoCard />
        </div>
      </div>
    </div>
  );
}

type ProductCardProps = Readonly<{
  className?: string;
  description: string;
  href: string;
  image: {
    srcDark: string;
    srcLight: string;
  };
  title: string;
}>;

function ProductCard({
  className,
  title,
  description,
  href,
  image,
}: ProductCardProps) {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'isolate overflow-hidden',
        'rounded-2xl',
        themeBackgroundCardColor,
        [
          themeWhiteGlowCardBackground,
          'before:-left-20 before:-top-20 before:z-[1]',
          'pt-6',
          className,
        ],
      )}>
      <div
        className={clsx(
          '!absolute inset-0 rounded-[inherit] before:m-[-1px]',
          themeGlassyBorder,
        )}
      />
      {/* Light mode image */}
      <img
        alt={title}
        className={clsx('h-auto w-full object-cover', 'block dark:hidden')}
        src={image.srcLight}
      />

      {/* Dark mode image */}
      <img
        alt={title}
        className={clsx('h-auto w-full object-cover', 'hidden dark:block')}
        src={image.srcDark}
      />
      <div className={clsx('flex flex-col', 'relative', 'px-6 pb-4 pt-5')}>
        <Text size="body1" weight="medium">
          {title}
        </Text>
        <Text className="mb-4 mt-3" color="secondary" size="body2">
          {description}
        </Text>
        <Button
          className="w-fit"
          href={href}
          icon={RiArrowRightUpLine}
          label={intl.formatMessage({
            defaultMessage: 'View product',
            description: 'Button label for view product',
            id: 'wXX9A5',
          })}
          size="md"
          variant="secondary"
        />
      </div>
    </div>
  );
}

function LogoCard() {
  return (
    <div
      className={clsx(
        'relative overflow-hidden ',
        'flex items-center justify-center',
        'rounded-xl',
        'shadow-md',
        'size-16',
        themeBackgroundCardNoAlphaColor,
        themeGlassyBorder,
      )}>
      <LogoMark height={26} width={34} />
      <div className="absolute inset-0">
        <div
          className={clsx(
            'absolute -top-[10px] left-1/2 -translate-x-1/2',
            'size-8',
            'bg-white opacity-0 mix-blend-normal blur-[20.25px] dark:bg-neutral-100 dark:opacity-40',
          )}
        />
      </div>
    </div>
  );
}
