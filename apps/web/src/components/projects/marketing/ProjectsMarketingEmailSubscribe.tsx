import clsx from 'clsx';
import { useId } from 'react';
import { RiArrowRightLine, RiDiscordLine } from 'react-icons/ri';

import { fbqGFE } from '~/lib/fbq';
import { trpc } from '~/hooks/trpc';

import { SocialLinks } from '~/data/SocialLinks';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import {
  themeBorderEmphasizeColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

function Background(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="none"
      height="522"
      preserveAspectRatio="none"
      viewBox="0 0 1104 522"
      width="1104"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <rect
        fill="url(#paint0_radial_8335_5217)"
        height="522"
        rx="48"
        width="1104"
      />
      <mask
        height="522"
        id="mask0_8335_5217"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
        width="1104"
        x="0"
        y="0">
        <rect fill="white" height="522" rx="48" width="1104" />
      </mask>
      <g mask="url(#mask0_8335_5217)">
        <g filter="url(#filter0_f_8335_5217)">
          <path
            clipRule="evenodd"
            d="M91.1194 469.338C71.9102 515.061 126.202 556.337 165.122 525.6L398.649 341.171C430.741 315.826 418.469 264.525 378.381 256.447L234.516 227.458C212.113 222.944 189.634 234.851 180.782 255.921L91.1194 469.338Z"
            fill="url(#paint1_linear_8335_5217)"
            fillRule="evenodd"
          />
        </g>
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="581.539"
          id="filter0_f_8335_5217"
          width="601.641"
          x="-48.7891"
          y="90.5937">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_8335_5217"
            stdDeviation="67.957"
          />
        </filter>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(552) rotate(90) scale(557.238 1178.53)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_8335_5217"
          r="1">
          <stop stopColor="hsl(var(--brand-default))" />
          <stop
            offset="0.223497"
            stopColor="hsl(var(--brand-dark))"
            stopOpacity="0.70"
          />
          <stop offset="1" stopColor="white" stopOpacity="0.01" />
        </radialGradient>
        {/* Triangle */}
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_8335_5217"
          x1="-87.5784"
          x2="31.6394"
          y1="515.708"
          y2="148.891">
          <stop stopColor="hsl(var(--brand-light))" />
          <stop
            offset="1"
            stopColor="hsl(var(--brand-dark))"
            stopOpacity="0.01"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ProjectsMarketingEmailSubscribe() {
  const emailId = useId();
  const intl = useIntl();

  const {
    data: submitMessage,
    isLoading,
    failureReason,
    mutate: signUpWithEmail,
  } = trpc.marketing.signUpWithEmail.useMutation();

  const content = (
    <div className=" relative isolate flex flex-col justify-center gap-y-8 overflow-hidden rounded-[48px]  px-4 py-16 lg:min-h-[400px] lg:gap-y-8 lg:p-20">
      <Background
        aria-hidden={true}
        className="absolute inset-0 -z-10  h-full w-full"
      />
      <div className="text-balance flex flex-col gap-y-3 sm:text-center md:gap-y-4">
        <Heading className="mx-auto max-w-3xl text-center" level="heading2">
          <FormattedMessage
            defaultMessage="Join our vibrant community of builders"
            description="Title for Projects newsletter sign up section"
            id="PI4FQX"
          />
        </Heading>
        <Text
          className="mx-auto block max-w-3xl text-center"
          color="subtitle"
          size="body1">
          <FormattedMessage
            defaultMessage="Connect with like-minded individuals in the community and get useful tips about
building projects - no spam!"
            description="Subtitle for Projects newsletter sign up section"
            id="gCKB+U"
          />
        </Text>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <Button
          href={SocialLinks.discord.href}
          icon={RiDiscordLine}
          label={intl.formatMessage({
            defaultMessage: 'Join Discord',
            description: 'Link to the Discord server',
            id: 'kdO5C4',
          })}
          size="lg"
          tooltip={intl.formatMessage({
            defaultMessage: 'Join Discord',
            description: 'Link to the Discord server',
            id: 'kdO5C4',
          })}
          variant="secondary"
        />
        <div
          className={clsx(
            'flex items-center gap-4 self-stretch',
            themeTextSecondaryColor,
          )}>
          <div
            className={clsx('h-px flex-1 border-t', themeBorderEmphasizeColor)}
          />
          <FormattedMessage
            defaultMessage="and"
            description="Label in divider between Join Discord and Sign Up in Projects Newsletter section"
            id="dg2G3r"
          />
          <div
            className={clsx('h-px flex-1 border-t', themeBorderEmphasizeColor)}
          />
        </div>
        <form
          className="flex w-full flex-col gap-x-2 gap-y-6 sm:max-w-lg sm:flex-row sm:items-center"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            fbqGFE('track', 'Lead');

            const data = new FormData(event.target as HTMLFormElement);

            signUpWithEmail({ email: data.get('email') as string });
          }}>
          <div className="min-w-0 grow">
            <TextInput
              autoComplete="email"
              errorMessage={failureReason?.message}
              id={emailId}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Email address',
                description: 'Label for email address input field',
                id: 'zyPeie',
              })}
              name="email"
              placeholder={intl.formatMessage({
                defaultMessage: 'Enter your email',
                description: 'Placeholder text for email input field',
                id: 'JKBRGr',
              })}
              type="email"
            />
          </div>
          <Button
            icon={RiArrowRightLine}
            isDisabled={isLoading}
            isLoading={isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Sign up',
              description: 'Button label for a newsletter subscription section',
              id: 'Id0zS8',
            })}
            size="md"
            type="submit"
            variant="primary"
          />
        </form>
        {submitMessage && (
          <Text
            className="block text-center"
            color="success"
            size="body2"
            weight="medium">
            {submitMessage}
          </Text>
        )}
      </div>
    </div>
  );

  return <div className={clsx('isolate')}>{content}</div>;
}
