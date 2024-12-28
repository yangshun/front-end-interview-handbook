import { useId } from 'react';

import { fbqGFE } from '~/lib/fbq';
import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

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
          <stop stopColor="var(--brand-gradient-radial-dark)" />
          <stop
            offset="0.223497"
            stopColor="var(--brand-gradient-radial-dark)"
            stopOpacity="0.64"
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
          <stop stopColor="var(--brand-gradient-linear-start)" />
          <stop
            offset="1"
            stopColor="var(--brand-gradient-linear-stop)"
            stopOpacity="0.01"
          />
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
    mutate: signUpForNewsletter,
  } = trpc.emails.signUpForNewsletter.useMutation();

  const content = (
    <div className="relative isolate flex flex-col justify-center gap-y-8 overflow-hidden px-4 py-6 md:gap-y-12 lg:min-h-[400px] lg:rounded-[48px] lg:p-20">
      <Background
        aria-hidden={true}
        className="absolute inset-0 -z-10 hidden h-full lg:block"
      />
      <div className="flex flex-col gap-y-3 sm:text-center md:gap-y-4">
        <Heading className="mx-auto max-w-3xl max-lg:text-xl" level="heading3">
          <FormattedMessage
            defaultMessage="Get notified about new front end resources, interview tips and practice questions"
            description="Title for newsletter sign up section"
            id="ePyk/V"
          />
        </Heading>
        <Text className="text-brand-lightest mx-auto block max-w-3xl text-base lg:text-lg">
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
            fbqGFE('track', 'Lead');

            const data = new FormData(event.target as HTMLFormElement);

            signUpForNewsletter({ email: data.get('email') as string });
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

  return (
    <Container width="6xl">
      <div className="hidden lg:contents">{content}</div>
      <Card
        classNameOuter="lg:hidden"
        disableBackground={true}
        padding={false}
        pattern={false}>
        {content}
      </Card>
    </Container>
  );
}
