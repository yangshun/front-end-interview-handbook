'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import { trpc } from '~/hooks/trpc';

import AngularLogo from '~/components/icons/AngularLogo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import ReactLogo from '~/components/icons/ReactLogo';
import { FormattedMessage, useIntl } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBackgroundCardColor,
  themeBackgroundLayerEmphasized,
  themeBackgroundSuccessColor,
  themeBorderColor,
  themeBorderElementColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { sponsorsDateFormatter } from '../SponsorsDatesUtils';

export default function SponsorsHeroSection() {
  const intl = useIntl();

  const { data } = trpc.sponsors.firstAvailabilityAcrossFormats.useQuery();

  return (
    <div className="flex flex-col gap-x-4 gap-y-12 py-20 lg:flex-row xl:gap-x-6">
      <div className="flex flex-1 flex-col gap-8 lg:min-w-[500px]">
        <Heading
          className={clsx(
            'pb-1',
            themeGradientHeading,
            '-tracking-4 text-5xl md:text-6xl md:leading-[4rem]',
          )}
          level="custom"
          weight="medium">
          <FormattedMessage
            defaultMessage="Reach {engineersCount}+ front end engineers per week for just ~${price} CPM"
            description="Title of advertise with us page"
            id="3Hh9Vd"
            values={{
              engineersCount: '20,000',
              price: 12,
            }}
          />
        </Heading>
        <Text
          className="lg:max-w-md"
          color="secondary"
          size="body0"
          weight="medium">
          <FormattedMessage
            defaultMessage="Advertise to a <bold>highly engaged audience</bold>. Publicize your products, tools, courses, articles, videos, conferences, and more!"
            description="Description for advertise hero section"
            id="nQCwrP"
            values={{
              bold: (chunks) => (
                <Text color="default" size="inherit" weight="inherit">
                  {chunks}
                </Text>
              ),
            }}
          />
        </Text>
        <div className="flex flex-wrap gap-x-4 gap-y-4 sm:gap-x-6">
          <div className="flex flex-col items-center gap-3">
            <Button
              href="/advertise-with-us/request"
              label={intl.formatMessage({
                defaultMessage: 'Schedule your slots',
                description: 'Book advertising slots',
                id: 'Y/+dNC',
              })}
              size="md"
              variant="primary"
            />
            {data != null && (
              <Text color="secondary" size="body3">
                <FormattedMessage
                  defaultMessage="Next slot: {date}"
                  description="Next slot date"
                  id="dAesjD"
                  values={{
                    date: sponsorsDateFormatter.format(new Date(data.start)),
                  }}
                />
              </Text>
            )}
          </div>
          <Button
            href="#pricing-and-availability"
            label={intl.formatMessage({
              defaultMessage: 'Pricing and availability',
              description: 'Button label for pricing & availability',
              id: 'zfkiwP',
            })}
            size="md"
            variant="secondary"
          />
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-1 items-center justify-center lg:justify-end',
          'px-2 sm:px-8 lg:pl-0 lg:pr-8 min-[1260px]:pr-0 xl:px-0',
        )}>
        <Asset />
      </div>
    </div>
  );
}

function Asset() {
  return (
    <div
      // So that focus cannot go into the card, which is not meant to be used.
      className={clsx(
        'relative',
        'w-full sm:max-w-[642px] lg:max-w-[483px]',
        'lg:h-[356px] xl:h-auto',
        'px-3 py-5 sm:px-4 sm:py-6',
        'rounded-2xl',
        themeBackgroundLayerEmphasized,
        themeGlassyBorder,
      )}
      inert="">
      <div
        className={clsx(
          'gap flex items-center gap-3 sm:gap-4 lg:gap-6',
          'px-3.5 py-2.5 xl:px-4 xl:py-3',
          'max-w-xs',
          themeBackgroundCardColor,
          'rounded-md',
          ['border', themeBorderElementColor],
        )}>
        {[
          {
            key: 'engagement-rate',
            label: (
              <FormattedMessage
                defaultMessage="Engagement rate"
                description="Label for engagement rate"
                id="se7YSg"
              />
            ),
            value: '85%',
          },
          {
            key: 'page-per-user',
            label: (
              <FormattedMessage
                defaultMessage="Pages per user"
                description="Label for pages per user"
                id="Y1uNFE"
              />
            ),
            value: '18',
          },
        ].map((item) => (
          <div key={item.key}>
            <Heading className="font-semibold" level="heading6">
              {item.value}
            </Heading>
            <Text
              className="block text-[10px] sm:text-xs xl:text-sm"
              color="subtitle"
              size="inherit">
              {item.label}
            </Text>
          </div>
        ))}
      </div>
      <div className={clsx('flex  items-center gap-3', 'mb-4 mt-6')}>
        {[
          {
            label: (
              <FormattedMessage
                defaultMessage="Views"
                description="Label for views"
                id="tYSCae"
              />
            ),
            value: 'view',
          },
          {
            label: (
              <FormattedMessage
                defaultMessage="Events"
                description="Label for events"
                id="1FyNUM"
              />
            ),
            value: 'event',
          },
        ].map((item) => (
          <div key={item.value} className="flex items-center gap-1.5">
            <div
              className={clsx(
                'xl:size-2 size-[7px] shrink-0 rounded-full',
                item.value === 'view'
                  ? themeBackgroundBrandColor
                  : themeBackgroundSuccessColor,
              )}
            />
            <Text
              className="text-[10px] xl:text-xs"
              color="subtle"
              size="inherit">
              {item.label}
            </Text>
          </div>
        ))}
      </div>
      <div className="h-auto lg:h-[200px] xl:h-auto">
        <GraphAsset />
      </div>
      <div className="absolute -left-4 bottom-[20%] sm:-left-8 lg:bottom-[25%] xl:bottom-[20%]">
        <FocusOnPlatformAsset />
      </div>
      <div className="absolute -right-4 -top-8 sm:-right-8">
        <SessionDurationAsset />
      </div>
      <div className="absolute -right-4 bottom-1 sm:-right-8 lg:-bottom-5 xl:bottom-1">
        <SoftwareEngineersAsset />
      </div>
    </div>
  );
}

function GraphAsset() {
  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 453 177"
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        className="stroke-neutral-300 dark:stroke-neutral-700"
        height="0.5"
        opacity="0.4"
        stroke="currentColor"
        strokeWidth="0.5"
        width="415.5"
        x="6.25"
        y="4.75"
      />
      <path
        className={themeTextSecondaryColor}
        d="M433.459 1.72727V9H432.358V2.82812H432.315L430.575 3.96449V2.91335L432.39 1.72727H433.459ZM435.72 9.06747C435.526 9.06747 435.359 8.99882 435.219 8.86151C435.08 8.72183 435.01 8.55374 435.01 8.35724C435.01 8.16312 435.08 7.9974 435.219 7.86009C435.359 7.72041 435.526 7.65057 435.72 7.65057C435.914 7.65057 436.081 7.72041 436.221 7.86009C436.36 7.9974 436.43 8.16312 436.43 8.35724C436.43 8.48745 436.397 8.60701 436.331 8.71591C436.267 8.82244 436.182 8.90767 436.075 8.97159C435.969 9.03551 435.85 9.06747 435.72 9.06747ZM440.051 9.09943C439.542 9.09943 439.093 9.01184 438.702 8.83665C438.314 8.66146 438.01 8.41998 437.789 8.11222C437.569 7.80445 437.46 7.45407 437.463 7.06108C437.46 6.75331 437.523 6.47041 437.651 6.21236C437.781 5.95194 437.958 5.73532 438.18 5.5625C438.403 5.38731 438.651 5.27604 438.926 5.22869V5.18608C438.564 5.09848 438.274 4.90436 438.056 4.60369C437.838 4.30303 437.73 3.95739 437.733 3.56676C437.73 3.19508 437.828 2.86364 438.027 2.57244C438.229 2.27888 438.504 2.04806 438.855 1.87997C439.205 1.71188 439.604 1.62784 440.051 1.62784C440.494 1.62784 440.89 1.71307 441.238 1.88352C441.588 2.05161 441.864 2.28243 442.065 2.57599C442.266 2.86719 442.368 3.19744 442.37 3.56676C442.368 3.95739 442.257 4.30303 442.037 4.60369C441.816 4.90436 441.53 5.09848 441.177 5.18608V5.22869C441.449 5.27604 441.694 5.38731 441.912 5.5625C442.132 5.73532 442.308 5.95194 442.438 6.21236C442.57 6.47041 442.638 6.75331 442.64 7.06108C442.638 7.45407 442.527 7.80445 442.306 8.11222C442.086 8.41998 441.781 8.66146 441.39 8.83665C441.002 9.01184 440.556 9.09943 440.051 9.09943ZM440.051 8.20099C440.352 8.20099 440.613 8.15128 440.833 8.05185C441.053 7.95005 441.223 7.80919 441.344 7.62926C441.465 7.44697 441.526 7.2339 441.529 6.99006C441.526 6.73674 441.46 6.51302 441.33 6.31889C441.202 6.12476 441.028 5.97206 440.808 5.8608C440.588 5.74953 440.336 5.69389 440.051 5.69389C439.765 5.69389 439.511 5.74953 439.288 5.8608C439.065 5.97206 438.89 6.12476 438.762 6.31889C438.635 6.51302 438.572 6.73674 438.574 6.99006C438.572 7.2339 438.63 7.44697 438.748 7.62926C438.869 7.80919 439.041 7.95005 439.263 8.05185C439.486 8.15128 439.748 8.20099 440.051 8.20099ZM440.051 4.81676C440.293 4.81676 440.507 4.76823 440.694 4.67116C440.881 4.5741 441.028 4.43916 441.135 4.26634C441.243 4.09351 441.299 3.8911 441.301 3.65909C441.299 3.43182 441.245 3.23295 441.138 3.0625C441.034 2.89205 440.888 2.76065 440.701 2.66832C440.514 2.57363 440.298 2.52628 440.051 2.52628C439.801 2.52628 439.58 2.57363 439.391 2.66832C439.204 2.76065 439.058 2.89205 438.954 3.0625C438.85 3.23295 438.799 3.43182 438.801 3.65909C438.799 3.8911 438.851 4.09351 438.958 4.26634C439.064 4.43916 439.211 4.5741 439.398 4.67116C439.587 4.76823 439.805 4.81676 440.051 4.81676ZM444.012 1.72727H445.344L447.659 7.38068H447.744L450.059 1.72727H451.391V9H450.347V3.73722H450.28L448.135 8.98935H447.268L445.123 3.73366H445.056V9H444.012V1.72727Z"
        fill="currentColor"
      />
      <rect
        className="stroke-neutral-300 dark:stroke-neutral-700"
        height="0.5"
        opacity="0.4"
        stroke="currentColor"
        strokeWidth="0.5"
        width="415.5"
        x="6.25"
        y="38.75"
      />
      <path
        className={themeTextSecondaryColor}
        d="M433.459 35.7273V43H432.358V36.8281H432.315L430.575 37.9645V36.9134L432.39 35.7273H433.459ZM435.72 43.0675C435.526 43.0675 435.359 42.9988 435.219 42.8615C435.08 42.7218 435.01 42.5537 435.01 42.3572C435.01 42.1631 435.08 41.9974 435.219 41.8601C435.359 41.7204 435.526 41.6506 435.72 41.6506C435.914 41.6506 436.081 41.7204 436.221 41.8601C436.36 41.9974 436.43 42.1631 436.43 42.3572C436.43 42.4875 436.397 42.607 436.331 42.7159C436.267 42.8224 436.182 42.9077 436.075 42.9716C435.969 43.0355 435.85 43.0675 435.72 43.0675ZM440.114 43.0994C439.789 43.0947 439.47 43.0355 439.155 42.9219C438.842 42.8082 438.558 42.6188 438.303 42.3537C438.047 42.0885 437.842 41.7322 437.688 41.2848C437.537 40.8374 437.461 40.2786 437.461 39.6087C437.461 38.9742 437.524 38.4107 437.649 37.9183C437.777 37.4259 437.96 37.0104 438.2 36.6719C438.439 36.331 438.728 36.0717 439.066 35.8942C439.405 35.7166 439.785 35.6278 440.206 35.6278C440.639 35.6278 441.024 35.7131 441.36 35.8835C441.696 36.054 441.969 36.2895 442.177 36.5902C442.388 36.8909 442.521 37.233 442.578 37.6165H441.495C441.422 37.3134 441.276 37.0661 441.058 36.8743C440.84 36.6825 440.556 36.5866 440.206 36.5866C439.673 36.5866 439.258 36.8187 438.96 37.2827C438.664 37.7467 438.514 38.3918 438.512 39.218H438.565C438.691 39.0121 438.845 38.8369 439.027 38.6925C439.212 38.5457 439.418 38.4332 439.645 38.3551C439.875 38.2746 440.116 38.2344 440.369 38.2344C440.791 38.2344 441.172 38.3374 441.513 38.5433C441.856 38.7469 442.129 39.0286 442.333 39.3885C442.537 39.7483 442.638 40.1603 442.638 40.6243C442.638 41.0883 442.533 41.5085 442.322 41.8849C442.114 42.2614 441.821 42.5597 441.442 42.7798C441.063 42.9976 440.62 43.1042 440.114 43.0994ZM440.11 42.1761C440.389 42.1761 440.639 42.1075 440.859 41.9702C441.08 41.8329 441.254 41.6482 441.381 41.4162C441.509 41.1842 441.573 40.925 441.573 40.6385C441.573 40.3591 441.51 40.1046 441.385 39.875C441.262 39.6454 441.091 39.4631 440.874 39.3281C440.658 39.1932 440.412 39.1257 440.135 39.1257C439.924 39.1257 439.729 39.166 439.549 39.2464C439.371 39.3269 439.215 39.4382 439.08 39.5803C438.945 39.7223 438.839 39.8857 438.761 40.0703C438.685 40.2526 438.647 40.4455 438.647 40.6491C438.647 40.9214 438.71 41.1735 438.835 41.4055C438.963 41.6375 439.137 41.8246 439.357 41.9666C439.58 42.1063 439.831 42.1761 440.11 42.1761ZM444.031 35.7273H445.363L447.678 41.3807H447.764L450.079 35.7273H451.411V43H450.367V37.7372H450.299L448.154 42.9893H447.288L445.143 37.7337H445.075V43H444.031V35.7273Z"
        fill="currentColor"
      />
      <rect
        className="stroke-neutral-300 dark:stroke-neutral-700"
        height="0.5"
        opacity="0.4"
        stroke="currentColor"
        strokeWidth="0.5"
        width="415.5"
        x="6.25"
        y="72.75"
      />
      <path
        className={themeTextSecondaryColor}
        d="M433.459 69.7273V77H432.358V70.8281H432.315L430.575 71.9645V70.9134L432.39 69.7273H433.459ZM435.72 77.0675C435.526 77.0675 435.359 76.9988 435.219 76.8615C435.08 76.7218 435.01 76.5537 435.01 76.3572C435.01 76.1631 435.08 75.9974 435.219 75.8601C435.359 75.7204 435.526 75.6506 435.72 75.6506C435.914 75.6506 436.081 75.7204 436.221 75.8601C436.36 75.9974 436.43 76.1631 436.43 76.3572C436.43 76.4875 436.397 76.607 436.331 76.7159C436.267 76.8224 436.182 76.9077 436.075 76.9716C435.969 77.0355 435.85 77.0675 435.72 77.0675ZM437.686 75.5795V74.6918L440.828 69.7273H441.528V71.0341H441.084L438.836 74.5923V74.6491H443.144V75.5795H437.686ZM441.134 77V75.3097L441.141 74.9048V69.7273H442.181V77H441.134ZM444.481 69.7273H445.812L448.128 75.3807H448.213L450.528 69.7273H451.86V77H450.816V71.7372H450.748L448.604 76.9893H447.737L445.592 71.7337H445.525V77H444.481V69.7273Z"
        fill="currentColor"
      />
      <rect
        className="stroke-neutral-300 dark:stroke-neutral-700"
        height="0.5"
        opacity="0.4"
        stroke="currentColor"
        strokeWidth="0.5"
        width="415.5"
        x="6.25"
        y="106.75"
      />
      <path
        className={themeTextSecondaryColor}
        d="M433.459 103.727V111H432.358V104.828H432.315L430.575 105.964V104.913L432.39 103.727H433.459ZM435.72 111.067C435.526 111.067 435.359 110.999 435.219 110.862C435.08 110.722 435.01 110.554 435.01 110.357C435.01 110.163 435.08 109.997 435.219 109.86C435.359 109.72 435.526 109.651 435.72 109.651C435.914 109.651 436.081 109.72 436.221 109.86C436.36 109.997 436.43 110.163 436.43 110.357C436.43 110.487 436.397 110.607 436.331 110.716C436.267 110.822 436.182 110.908 436.075 110.972C435.969 111.036 435.85 111.067 435.72 111.067ZM440.107 111.099C439.619 111.099 439.183 111.015 438.8 110.847C438.419 110.679 438.117 110.446 437.894 110.148C437.674 109.847 437.556 109.499 437.539 109.104H438.654C438.668 109.319 438.741 109.506 438.871 109.665C439.003 109.821 439.176 109.942 439.389 110.027C439.602 110.112 439.839 110.155 440.099 110.155C440.386 110.155 440.639 110.105 440.859 110.006C441.082 109.906 441.256 109.768 441.381 109.59C441.507 109.41 441.57 109.203 441.57 108.969C441.57 108.725 441.507 108.511 441.381 108.326C441.258 108.139 441.077 107.992 440.838 107.886C440.601 107.779 440.315 107.726 439.979 107.726H439.364V106.831H439.979C440.249 106.831 440.485 106.782 440.689 106.685C440.895 106.588 441.056 106.453 441.172 106.281C441.288 106.105 441.346 105.901 441.346 105.666C441.346 105.441 441.295 105.246 441.193 105.08C441.094 104.912 440.952 104.781 440.767 104.686C440.585 104.591 440.369 104.544 440.121 104.544C439.884 104.544 439.663 104.588 439.457 104.675C439.253 104.761 439.087 104.884 438.96 105.045C438.832 105.203 438.763 105.394 438.754 105.616H437.692C437.704 105.223 437.82 104.878 438.04 104.58C438.262 104.281 438.556 104.048 438.92 103.88C439.285 103.712 439.69 103.628 440.135 103.628C440.601 103.628 441.004 103.719 441.342 103.901C441.683 104.081 441.946 104.321 442.131 104.622C442.318 104.923 442.41 105.252 442.408 105.609C442.41 106.017 442.296 106.362 442.067 106.646C441.839 106.93 441.536 107.121 441.158 107.218V107.275C441.641 107.348 442.015 107.54 442.28 107.85C442.547 108.16 442.68 108.545 442.678 109.004C442.68 109.404 442.569 109.763 442.344 110.08C442.121 110.397 441.817 110.647 441.431 110.83C441.045 111.009 440.604 111.099 440.107 111.099ZM444.119 103.727H445.451L447.766 109.381H447.852L450.167 103.727H451.499V111H450.455V105.737H450.387L448.242 110.989H447.376L445.231 105.734H445.163V111H444.119V103.727Z"
        fill="currentColor"
      />
      <rect
        className="stroke-neutral-300 dark:stroke-neutral-700"
        height="0.5"
        opacity="0.4"
        stroke="currentColor"
        strokeWidth="0.5"
        width="415.5"
        x="6.25"
        y="140.75"
      />
      <path
        className={themeTextSecondaryColor}
        d="M433.459 137.727V145H432.358V138.828H432.315L430.575 139.964V138.913L432.39 137.727H433.459ZM435.72 145.067C435.526 145.067 435.359 144.999 435.219 144.862C435.08 144.722 435.01 144.554 435.01 144.357C435.01 144.163 435.08 143.997 435.219 143.86C435.359 143.72 435.526 143.651 435.72 143.651C435.914 143.651 436.081 143.72 436.221 143.86C436.36 143.997 436.43 144.163 436.43 144.357C436.43 144.487 436.397 144.607 436.331 144.716C436.267 144.822 436.182 144.908 436.075 144.972C435.969 145.036 435.85 145.067 435.72 145.067ZM437.838 145V144.205L440.299 141.655C440.562 141.378 440.779 141.135 440.949 140.927C441.122 140.716 441.251 140.516 441.336 140.327C441.421 140.137 441.464 139.936 441.464 139.723C441.464 139.482 441.407 139.273 441.294 139.098C441.18 138.92 441.025 138.784 440.828 138.69C440.632 138.593 440.41 138.544 440.164 138.544C439.904 138.544 439.677 138.597 439.482 138.704C439.288 138.81 439.139 138.961 439.035 139.155C438.931 139.349 438.879 139.576 438.879 139.837H437.831C437.831 139.394 437.933 139.007 438.137 138.675C438.34 138.344 438.619 138.087 438.975 137.905C439.33 137.72 439.733 137.628 440.186 137.628C440.642 137.628 441.045 137.719 441.393 137.901C441.743 138.081 442.017 138.327 442.213 138.64C442.41 138.95 442.508 139.3 442.508 139.691C442.508 139.961 442.457 140.225 442.355 140.483C442.256 140.741 442.082 141.029 441.833 141.346C441.585 141.661 441.239 142.043 440.796 142.493L439.351 144.006V144.059H442.625V145H437.838ZM444.07 137.727H445.402L447.718 143.381H447.803L450.118 137.727H451.45V145H450.406V139.737H450.338L448.193 144.989H447.327L445.182 139.734H445.115V145H444.07V137.727Z"
        fill="currentColor"
      />
      <rect
        className="stroke-neutral-300 dark:stroke-neutral-700"
        height="0.5"
        opacity="0.4"
        stroke="currentColor"
        strokeWidth="0.5"
        width="420.5"
        x="6.25"
        y="172.75"
      />
      <path
        className={themeTextSecondaryColor}
        d="M437.5 176.08C437.072 176.08 436.707 175.963 436.406 175.73C436.105 175.495 435.875 175.155 435.716 174.71C435.557 174.263 435.477 173.723 435.477 173.091C435.477 172.462 435.557 171.925 435.716 171.48C435.877 171.033 436.108 170.692 436.409 170.457C436.712 170.221 437.076 170.102 437.5 170.102C437.924 170.102 438.287 170.221 438.588 170.457C438.891 170.692 439.122 171.033 439.281 171.48C439.442 171.925 439.523 172.462 439.523 173.091C439.523 173.723 439.443 174.263 439.284 174.71C439.125 175.155 438.895 175.495 438.594 175.73C438.293 175.963 437.928 176.08 437.5 176.08ZM437.5 175.455C437.924 175.455 438.254 175.25 438.489 174.841C438.723 174.432 438.841 173.848 438.841 173.091C438.841 172.587 438.787 172.158 438.679 171.804C438.573 171.45 438.42 171.18 438.219 170.994C438.02 170.809 437.78 170.716 437.5 170.716C437.08 170.716 436.751 170.923 436.514 171.338C436.277 171.751 436.159 172.335 436.159 173.091C436.159 173.595 436.212 174.023 436.318 174.375C436.424 174.727 436.577 174.995 436.776 175.179C436.976 175.363 437.218 175.455 437.5 175.455Z"
        fill="currentColor"
      />
      <path
        d="M35.8363 126.808L1 157L205.457 135.244L422 104.698V5L330.092 21L253.007 53L163.322 67L94.3908 109L35.8363 126.808Z"
        fill="url(#paint0_linear_0_1)"
        fillOpacity="0.4"
      />
      <path
        d="M417.851 5C417.851 6.47276 419.045 7.66667 420.518 7.66667C421.99 7.66667 423.184 6.47276 423.184 5C423.184 3.52724 421.99 2.33333 420.518 2.33333C419.045 2.33333 417.851 3.52724 417.851 5ZM319.536 25.7632L319.759 26.2107L319.536 25.7632ZM246.354 55.7073L246.315 55.2088L246.354 55.7073ZM275.857 47.5414L275.634 47.094L275.857 47.5414ZM183.087 60.6199L183.048 60.1214L183.087 60.6199ZM78.2552 115.359L78.1528 114.87L78.2552 115.359ZM1.4187 158.273L3.29858 155.393L2.46118 154.847L0.581302 157.727L1.4187 158.273ZM53.5845 121.034L78.3577 115.849L78.1528 114.87L53.3797 120.055L53.5845 121.034ZM111.662 100.307L140.103 77.9151L139.485 77.1294L111.043 99.5208L111.662 100.307ZM183.126 61.1184L246.392 56.2058L246.315 55.2088L183.048 60.1214L183.126 61.1184ZM276.081 47.9889L319.759 26.2107L319.313 25.3157L275.634 47.094L276.081 47.9889ZM341.802 19.0001L420.602 5.49281L420.433 4.50719L341.633 18.0144L341.802 19.0001ZM319.759 26.2107C326.714 22.7425 334.141 20.3132 341.802 19.0001L341.633 18.0144C333.876 19.344 326.356 21.804 319.313 25.3157L319.759 26.2107ZM246.392 56.2058C256.725 55.4035 266.806 52.6134 276.081 47.9889L275.634 47.094C266.475 51.661 256.519 54.4164 246.315 55.2088L246.392 56.2058ZM140.103 77.9151C152.466 68.1821 167.439 62.3365 183.126 61.1184L183.048 60.1214C167.164 61.3549 152.003 67.274 139.485 77.1294L140.103 77.9151ZM78.3577 115.849C90.5089 113.305 101.907 107.986 111.662 100.307L111.043 99.5208C101.41 107.105 90.1531 112.358 78.1528 114.87L78.3577 115.849ZM3.29858 155.393C14.8351 137.719 32.9262 125.358 53.5845 121.034L53.3797 120.055C32.4614 124.433 14.1428 136.95 2.46118 154.847L3.29858 155.393Z"
        fill="url(#paint1_linear_0_1)"
      />
      <path
        d="M77.1576 153L1 157H420.976V97L363.303 109L301.194 134.5L205.812 138L128.915 147.5L77.1576 153Z"
        fill="url(#paint2_linear_0_1)"
        fillOpacity="0.4"
      />
      <path
        d="M77.8967 152L77.9199 152.499L77.9403 152.499L77.9606 152.496L77.8967 152ZM140.006 144L139.968 143.501L139.955 143.502L139.942 143.504L140.006 144ZM219.121 138L219.088 137.501L219.083 137.501L219.121 138ZM418.309 97C418.309 98.4728 419.503 99.6667 420.975 99.6667C422.448 99.6667 423.642 98.4728 423.642 97C423.642 95.5272 422.448 94.3333 420.975 94.3333C419.503 94.3333 418.309 95.5272 418.309 97ZM359.513 108.473L359.296 108.023L359.513 108.473ZM306.142 132.305L306.11 131.806L306.142 132.305ZM315.014 129.967L314.796 129.517L315.014 129.967ZM2.50169 155.999L77.9199 152.499L77.8735 151.501L2.45534 155.001L2.50169 155.999ZM77.9606 152.496L140.07 144.496L139.942 143.504L77.8328 151.504L77.9606 152.496ZM140.044 144.499L219.159 138.499L219.083 137.501L139.968 143.501L140.044 144.499ZM219.154 138.499L306.175 132.804L306.11 131.806L219.088 137.501L219.154 138.499ZM315.231 130.418L359.731 108.923L359.296 108.023L314.796 129.517L315.231 130.418ZM365.986 106.921L421.06 97.4928L420.891 96.5072L365.818 105.936L365.986 106.921ZM359.731 108.923C361.712 107.967 363.818 107.293 365.986 106.921L365.818 105.936C363.557 106.323 361.361 107.025 359.296 108.023L359.731 108.923ZM306.175 132.804C309.319 132.598 312.394 131.788 315.231 130.418L314.796 129.517C312.075 130.832 309.126 131.609 306.11 131.806L306.175 132.804Z"
        fill="url(#paint3_linear_0_1)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_0_1"
          x1="336.725"
          x2="282.305"
          y1="21.5628"
          y2="204.609">
          <stop
            className="text-[#F9FFD4] dark:text-[#394302]"
            stopColor="currentColor"
          />
          <stop
            className="text-white dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_0_1"
          x1="213.591"
          x2="-8.31934"
          y1="41.2432"
          y2="136.227">
          <stop stopColor="#EBFE7D" />
          <stop offset="1" stopColor="#8D984B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_0_1"
          x1="403.23"
          x2="192.645"
          y1="97"
          y2="322.702">
          <stop
            className="text-[#B9FFC0] dark:text-[#023E08]"
            stopColor="currentColor"
          />
          <stop
            className="text-white dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint3_linear_0_1"
          x1="409.884"
          x2="216.332"
          y1="97"
          y2="330.933">
          <stop stopColor="#39EA4A" />
          <stop offset="1" stopColor="#4A9C51" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FocusOnPlatformAsset() {
  const items = [
    {
      bgColor: themeBackgroundBrandColor,
      key: 'solving-questions',
      label: (
        <FormattedMessage
          defaultMessage="Solving questions"
          description="Label for solving questions"
          id="vzta63"
        />
      ),
      value: '60%',
    },
    {
      bgColor: themeBackgroundSuccessColor,
      key: 'guides',
      label: (
        <FormattedMessage
          defaultMessage="Guides"
          description="Label for guides"
          id="Vmkov5"
        />
      ),
      value: '30%',
    },
    {
      bgColor: 'bg-neutral-300',
      key: 'browsing',
      label: (
        <FormattedMessage
          defaultMessage="Browsing"
          description="Label for browsing"
          id="PomxMS"
        />
      ),
      value: '10%',
    },
  ];

  return (
    <div
      className={clsx(
        'w-[201px] sm:w-[276px]',
        'p-2 sm:p-3.5 xl:p-4',
        'rounded-md',
        ['border', themeBorderElementColor],
        themeBackgroundLayerEmphasized,
      )}>
      <Text
        className="text-[10px] sm:text-xs xl:text-sm"
        color="secondary"
        size="inherit">
        <FormattedMessage
          defaultMessage="Focus on platform"
          description="Focus on platform"
          id="rXZQEC"
        />
      </Text>
      <div className="mt-2.5 flex w-[95%] xl:mt-3">
        {items.map((item) => (
          <div
            key={item.value}
            className={clsx(
              'flex items-center justify-center',
              'h-5 xl:h-[22px]',
              item.bgColor,
              item.key === 'solving-questions'
                ? 'w-[60%]'
                : item.key === 'guides'
                  ? 'w-[25%]'
                  : 'w-[15%]',
            )}>
            <Text
              className="text-[8px] sm:text-[10px] xl:text-xs"
              color="dark"
              size="inherit"
              weight="bold">
              {item.value}
            </Text>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-2 xl:mt-3 xl:gap-2">
        {items.map((item) => (
          <div key={item.value} className="flex items-center gap-1">
            <div
              className={clsx(
                'xl:size-[5px] size-[4px] shrink-0 rounded-full',
                item.bgColor,
              )}
            />
            <Text
              className="text-[8px] xl:text-[10px]"
              color="secondary"
              size="inherit">
              {item.label}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionDurationAsset() {
  return (
    <div
      className={clsx(
        'relative overflow-hidden',
        'h-[87px] w-[133px] sm:h-[120px] sm:w-[183px]',
        'p-3.5 xl:p-4',
        'rounded-md',
        ['border', themeBorderElementColor],
        themeBackgroundLayerEmphasized,
      )}>
      <div className="size-[105%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <svg
          fill="none"
          height="100%"
          viewBox="0 0 183 120"
          width="100%"
          xmlns="http://www.w3.org/2000/svg">
          <circle
            className="stroke-neutral-300 dark:stroke-neutral-700"
            cx="91.3636"
            cy="60.0004"
            opacity="0.1"
            r="90.8416"
            stroke="currentColor"
            strokeWidth="1.04416"
          />
        </svg>
      </div>
      <div className="size-[100%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="size-full relative">
          <svg
            fill="none"
            height="100%"
            viewBox="0 0 147 120"
            width="100%"
            xmlns="http://www.w3.org/2000/svg">
            <path
              className="stroke-neutral-300 dark:stroke-neutral-700"
              d="M146.478 60C146.478 100.584 113.801 133.478 73.5 133.478C33.1987 133.478 0.522078 100.584 0.522078 60C0.522078 19.4159 33.1987 -13.4779 73.5 -13.4779C113.801 -13.4779 146.478 19.4159 146.478 60Z"
              opacity="0.2"
              stroke="currentColor"
              strokeWidth="1.04416"
            />
          </svg>
          <Avatar
            alt="Chenwei zhang's image"
            className={clsx(
              'absolute bottom-1/4 left-[5%]',
              'size-4 rounded-full',
            )}
            size="custom"
            src="/img/testimonials/users/chenwei-zhang.jpg"
          />
          <Avatar
            alt="Loc chuong's image"
            className={clsx(
              'absolute bottom-1/3 right-[5%]',
              'size-4 rounded-full',
            )}
            size="custom"
            src="/img/testimonials/users/loc-chuong.jpg"
          />
        </div>
      </div>
      <div className="size-[90%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="size-full relative">
          <svg
            fill="none"
            height="100%"
            viewBox="0 0 105 106"
            width="100%"
            xmlns="http://www.w3.org/2000/svg">
            <path
              className="stroke-neutral-300 dark:stroke-neutral-700"
              d="M104.478 53C104.478 81.9874 81.202 105.478 52.5 105.478C23.798 105.478 0.522078 81.9874 0.522078 53C0.522078 24.0126 23.798 0.522078 52.5 0.522078C81.202 0.522078 104.478 24.0126 104.478 53Z"
              opacity="0.4"
              stroke="currentColor"
              strokeWidth="1.04416"
            />
          </svg>
          <Avatar
            alt="Yugant joshi's image"
            className={clsx(
              'absolute left-[16%] top-[15%]',
              'size-4 rounded-full',
            )}
            size="custom"
            src="/img/testimonials/users/yugant-joshi.jpg"
          />
          <Avatar
            alt="Ed wang's image"
            className={clsx(
              'absolute right-[20%] top-[10%]',
              'size-4 rounded-full',
            )}
            size="custom"
            src="/img/testimonials/users/ed-wang.jpg"
          />
        </div>
      </div>
      <div
        className={clsx(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform',
          'size-10',
          themeBackgroundBrandColor,
          'opacity-50',
          'blur-[30px]',
        )}
      />
      <div className="relative mt-4 flex w-full justify-center sm:mt-6">
        <div className="max-w-[121px] text-center">
          <Text
            className={clsx(
              themeTextBrandColor,
              'text-[10px] sm:text-xs lg:text-sm',
            )}
            color="inherit"
            size="inherit"
            weight="bold">
            <FormattedMessage
              defaultMessage="<bold>{duration}</bold> minutes"
              description="Label for session duration"
              id="xRyx1X"
              values={{
                bold: (chunk) => (
                  <Text
                    className="text-base sm:text-2xl"
                    color="inherit"
                    weight="inherit">
                    {chunk}
                  </Text>
                ),
                duration: 13,
              }}
            />
          </Text>
          <Text
            className="block text-[8px] sm:text-[10px] lg:text-xs"
            size="inherit">
            <FormattedMessage
              defaultMessage="Avg. session duration across all users"
              description="Label for average session duration"
              id="gKCetv"
            />
          </Text>
        </div>
      </div>
    </div>
  );
}

function SoftwareEngineersAsset() {
  return (
    <div
      className={clsx(
        'relative overflow-hidden',
        'h-[62px] w-[175px] sm:h-[84px] sm:w-[241px]',
        'p-[10px] xl:p-4',
        'rounded-md',
        'shadow-sm',
        ['border', themeBorderElementColor],
        themeBackgroundLayerEmphasized,
      )}>
      <div className="size-[100%] absolute -right-[36%] top-1/2 -translate-y-1/2 transform">
        <div className="size-full relative">
          <svg
            fill="none"
            height="100%"
            viewBox="0 0 75 84"
            width="100%"
            xmlns="http://www.w3.org/2000/svg">
            <circle
              className="stroke-neutral-300 dark:stroke-neutral-700"
              cx="72.3473"
              cy="43.006"
              opacity="0.5"
              r="70.9706"
              stroke="currentColor"
              strokeWidth="0.894118"
            />
          </svg>
          <SkillAsset
            className="absolute right-[60%] top-[45%]"
            logo={<ReactLogo style={{ fill: 'rgb(20, 158, 202)' }} />}
          />
        </div>
      </div>
      <div className="size-[100%] absolute -right-[40%] top-1/2 -translate-y-1/2 transform">
        <div className="size-full relative">
          <svg
            fill="none"
            height="100%"
            viewBox="0 0 39 84"
            width="100%"
            xmlns="http://www.w3.org/2000/svg">
            <circle
              className="stroke-neutral-300 dark:stroke-neutral-700"
              cx="48.1382"
              cy="43.0054"
              opacity="0.5"
              r="47.3201"
              stroke="currentColor"
              strokeWidth="0.894118"
            />
          </svg>
          <SkillAsset
            className="absolute right-[50%] top-[10%]"
            logo={<JavaScriptLogo className="size-4 sm:size-3" />}
          />
          <SkillAsset
            className="absolute bottom-[10%] right-[50%]"
            logo={<AngularLogo />}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Text
          className="text-[10px] sm:text-sm"
          color="secondary"
          size="inherit">
          <FormattedMessage
            defaultMessage="Software engineers"
            description="Label for software engineers"
            id="5kQQs5"
          />
        </Text>
        <div className="mt-1">
          {[
            {
              image: '/img/testimonials/users/chenwei-zhang.jpg',
              name: 'Chenwei Zhang',
            },
            {
              image: '/img/testimonials/users/loc-chuong.jpg',
              name: 'Loc Chuong',
            },
            {
              image: '/img/testimonials/users/yugant-joshi.jpg',
              name: 'Yugant Joshi',
            },
          ].map((item, index) => (
            <Avatar
              key={item.name}
              alt={item.name}
              className={clsx(
                'size-5 sm:size-[28px]',
                ['border-[1px] sm:border-2', themeBorderColor],
                'relative',
                index > 0 && '-ml-1 sm:-ml-2',
              )}
              size="custom"
              src={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillAsset({
  className,
  logo,
}: {
  className?: string;
  logo: ReactNode;
}) {
  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'rounded-full shadow-sm',
          'size-[18px] sm:size-6 p-[3px] sm:p-1',
          themeBackgroundLayerEmphasized,
          themeGlassyBorder,
        )}>
        {logo}
      </div>
    </div>
  );
}
