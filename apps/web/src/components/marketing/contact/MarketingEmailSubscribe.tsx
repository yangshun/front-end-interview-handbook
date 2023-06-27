import type { SVGProps } from 'react';
import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import fbq from '~/lib/fbq';
import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

function Background(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 1104 368"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <rect
        fill="url(#paint0_radial_1280_65051)"
        height="368"
        rx="48"
        width="1104"
      />
      <mask
        height="368"
        id="mask0_1280_65051"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
        width="1104"
        x="0"
        y="0">
        <rect fill="white" height="368" rx="48" width="1104" />
      </mask>
      <g mask="url(#mask0_1280_65051)">
        <g filter="url(#filter0_f_1280_65051)">
          <path
            clip-rule="evenodd"
            d="M73.1423 450.414C53.5705 495.9 107.331 537.635 146.545 507.398L377.138 329.588C409.811 304.394 397.576 252.444 357.093 244.479L215.036 216.531C192.845 212.165 170.617 223.881 161.678 244.656L73.1423 450.414Z"
            fill="url(#paint1_linear_1280_65051)"
            fill-rule="evenodd"
          />
        </g>
      </g>
      <defs>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="573.882"
          id="filter0_f_1280_65051"
          width="598.705"
          x="-66.9278"
          y="79.709">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_1280_65051"
            stdDeviation="67.957"
          />
        </filter>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(552) rotate(90) scale(392.842 1178.53)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_1280_65051"
          r="1">
          <stop stop-color="#8383FD" />
          <stop offset="0.223497" stop-color="#8383FD" stop-opacity="0.64" />
          <stop offset="1" stop-color="#0F172A" stop-opacity="0.01" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_1280_65051"
          x1="-106.578"
          x2="7.58278"
          y1="498.066"
          y2="138.31">
          <stop stop-color="#A855F7" />
          <stop offset="1" stop-color="#6366F1" stop-opacity="0.01" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function MarketingEmailSubscribe() {
  const emailId = useId();
  const intl = useIntl();

  const {
    data: submitMessage,
    isLoading,
    failureReason,
    mutate: signUpWithEmail,
  } = trpc.marketing.signUpWithEmail.useMutation();

  return (
    <div className="relative flex flex-col justify-center gap-y-8 overflow-hidden md:gap-y-12 md:p-16 lg:min-h-[400px] lg:rounded-[48px] lg:p-20">
      <Background
        aria-hidden={true}
        className="absolute inset-0 -z-10 hidden h-full lg:block"
      />
      <div className="flex flex-col gap-y-3 sm:text-center md:gap-y-4">
        <Heading className="mx-auto max-w-3xl" level="heading3">
          <FormattedMessage
            defaultMessage="Get notified about new front end resources, interview tips and practice questions"
            description="Title for newsletter sign up section"
            id="ePyk/V"
          />
        </Heading>
        <Text
          className="text-brand-lightest mx-auto max-w-3xl text-base lg:text-lg"
          display="block">
          <FormattedMessage
            defaultMessage="Sign up for our newsletter and join our community of passionate <span>Front End Engineers</span>."
            description="Subtitle text for newsletter sign up section"
            id="+pieds"
            values={{
              span: (chunks) => (
                <span className="whitespace-nowrap">{chunks}</span>
              ),
            }}
          />
        </Text>
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <form
          className="flex w-full flex-col gap-x-2 gap-y-4 sm:max-w-lg sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            fbq.track('Lead');

            const data = new FormData(event.target as HTMLFormElement);

            signUpWithEmail({ email: data.get('email') as string });
          }}>
          <div className="min-w-0 grow">
            <TextInput
              autoComplete="email"
              className="grow bg-white !text-neutral-800 !ring-transparent placeholder:text-neutral-400"
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
            isDisabled={isLoading}
            isLoading={isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Notify Me',
              description: 'Button label for a newsletter subscription section',
              id: 'ryCcOP',
            })}
            size="md"
            type="submit"
            variant="primary"
          />
        </form>
        {submitMessage && (
          <Text
            className="text-center"
            color="success"
            display="block"
            size="body2"
            weight="medium">
            {submitMessage}
          </Text>
        )}
      </div>
    </div>
  );
}
