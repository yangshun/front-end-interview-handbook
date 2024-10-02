'use client';

import clsx from 'clsx';
import { RiArrowRightLine, RiStarFill } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

import { QuestionCountFree } from '../questions/listings/stats/QuestionCount';
import AmazonLogo from '../../icons/AmazonLogo';
import GoogleLogo from '../../icons/GoogleLogo';
import MetaLogo from '../../icons/MetaLogo';

export default function InterviewsMarketingHeroNew() {
  const intl = useIntl();

  return (
    <Container
      className={clsx('px-6 py-20 lg:px-[168px]', 'flex flex-col gap-12')}>
      <div className={clsx('flex flex-col gap-8', 'lg:max-w-[634px]')}>
        <Heading
          className={clsx(themeGradientHeading, 'pb-1')}
          level="heading1"
          weight="medium">
          <FormattedMessage
            defaultMessage="Don't let front end interviews hold you back"
            description="Homepage title"
            id="kKZhDV"
          />
        </Heading>
        <Text
          className="max-w-[483px] text-base lg:text-xl"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Meet the <strong>front end interview prep platform</strong> built to make your interviews much easier. By Big Tech ex-interviewers at"
            description="Subtitle for hero"
            id="Eel+ez"
            values={{
              strong: (chunks) => <Text color="default">{chunks}</Text>,
            }}
          />
          <GoogleLogo
            className="ms-2 inline-flex h-5"
            title={intl.formatMessage({
              defaultMessage: 'Google logo',
              description: 'Google company logo',
              id: 'da4RLj',
            })}
          />
          <AmazonLogo
            className="ms-3 mt-2 inline-flex h-5"
            title={intl.formatMessage({
              defaultMessage: 'Amazon logo',
              description: 'Amazon company logo',
              id: 'nai6YT',
            })}
          />
          <MetaLogo
            className="ms-4 inline-flex h-3.5"
            title={intl.formatMessage({
              defaultMessage: 'Meta logo',
              description: 'Meta company logo',
              id: 'a8ETQr',
            })}
          />
        </Text>
      </div>
      <div className="flex flex-col gap-x-16 gap-y-6 md:flex-row">
        <div className="flex flex-col items-start gap-4">
          <Button
            href="/prepare"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Get started now',
              description:
                'Label for Get Started button in Hero section of HomePage.',
              id: 'U0KCty',
            })}
            size="lg"
            variant="primary"
          />
          <Text color="secondary" size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="{count}+ questions are free to do"
              description="Free questions"
              id="rm432p"
              values={{
                count: QuestionCountFree,
              }}
            />
          </Text>
        </div>
        <div className="flex gap-5 py-0.5">
          <div>
            <Avatar
              alt="Shoaib Ahmed"
              className="size-9 border-2 border-white dark:border-neutral-900"
              size="custom"
              src="/img/testimonials/users/shoaib-ahmed.jpg"
            />
            <Avatar
              alt="Loc Chuong"
              className="size-9 -ml-2 border-2 border-white dark:border-neutral-900"
              size="custom"
              src="/img/testimonials/users/loc-chuong.jpg"
            />
            <Avatar
              alt="Lunghao Lee"
              className="size-9 -ml-2 border-2 border-white dark:border-neutral-900"
              size="custom"
              src="/img/testimonials/users/lunghao-lee.jpg"
            />
            <Avatar
              alt="Luke Fiji"
              className="size-9 -ml-2 border-2 border-white dark:border-neutral-900"
              size="custom"
              src="/img/testimonials/users/luke-fiji.webp"
            />
            <Avatar
              alt="Ryan Van Valkenburg"
              className="size-9 -ml-2 border-2 border-white dark:border-neutral-900"
              size="custom"
              src="/img/testimonials/users/ryanlvv.jpg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <RiStarFill
                aria-hidden={true}
                className="size-4 shrink-0 text-[#dfce36]"
              />
              <RiStarFill
                aria-hidden={true}
                className="size-4 shrink-0 text-[#dfce36]"
              />
              <RiStarFill
                aria-hidden={true}
                className="size-4 shrink-0 text-[#dfce36]"
              />
              <RiStarFill
                aria-hidden={true}
                className="size-4 shrink-0 text-[#dfce36]"
              />
              <RiStarFill
                aria-hidden={true}
                className="size-4 shrink-0 text-[#dfce36]"
              />
            </div>
            <Text color="secondary" size="body3" weight="medium">
              <FormattedMessage
                defaultMessage="{number} engineers have used GreatFrontEnd"
                description="Number of engineers using"
                id="eGc1/r"
                values={{ number: '500k+' }}
              />
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
}
