import clsx from 'clsx';
import { RiLinkedinBoxFill } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Card from '~/components/ui/Card';
import Text, { textVariants } from '~/components/ui/Text';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

export type InterviewsMarketingTestimonial = Readonly<{
  anonymous: boolean;
  authorThumbnailUrl?: string | null;
  authorUrl?: string | null;
  companyLogoUrl?: string | null;
  createdAt: string;
  featured?: boolean;
  featuredOffer?: string | null;
  fromCompany?: string | null;
  id: string;
  location?: string | null;
  name?: string | null;
  offers?: ReadonlyArray<string>;
  testimonial: string;
  title?: string | null;
}>;

function formatDate(
  inputDate: string, // YYYY-MM-DD format
) {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  return formatter.format(date);
}

export default function InterviewsMarketingTestimonialCard({
  authorThumbnailUrl,
  authorUrl,
  createdAt,
  testimonial,
  featuredOffer,
  location,
  companyLogoUrl,
  name,
  offers,
  title,
  disableSpotlight = false,
}: InterviewsMarketingTestimonial & Readonly<{ disableSpotlight?: boolean }>) {
  return (
    <Card
      brandColorSpotlight={false}
      className="rounded-2xl p-4 text-sm leading-6"
      disableSpotlight={disableSpotlight}
      padding={false}
      pattern={false}>
      <div className={clsx('flex items-center justify-between', 'mb-3')}>
        {featuredOffer ? (
          <div className={clsx('flex items-center gap-3')}>
            {companyLogoUrl && (
              <div
                className={clsx(
                  'grid place-items-center rounded-full p-2',
                  themeBackgroundEmphasized,
                )}>
                <img
                  alt={featuredOffer}
                  className={clsx('size-4')}
                  src={companyLogoUrl}
                />
              </div>
            )}
            <Text color="secondary" size="body3">
              Offer from{' '}
              <Text color="subtitle" weight="medium">
                {featuredOffer}
              </Text>
            </Text>
          </div>
        ) : (
          <span />
        )}
        <Text color="secondary" size="body3" weight="medium">
          {formatDate(createdAt)}
        </Text>
      </div>
      <blockquote
        className={textVariants({ className: 'leading-6', size: 'body2' })}>
        {testimonial}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-x-4">
        {authorThumbnailUrl && (
          <Avatar
            alt={name ?? ''}
            decoding="async"
            loading="lazy"
            size="lg"
            src={authorThumbnailUrl}
          />
        )}
        <div>
          {name &&
            (() => {
              if (!authorUrl) {
                return (
                  <Text size="body2" weight="bold">
                    {name}
                  </Text>
                );
              }

              return (
                <Anchor
                  className={textVariants({
                    className: 'flex items-center gap-x-1',
                    size: 'body2',
                    weight: 'bold',
                  })}
                  href={authorUrl}
                  variant="flat">
                  {name}
                  <RiLinkedinBoxFill
                    aria-hidden={true}
                    className="size-4 shrink-0"
                  />
                </Anchor>
              );
            })()}
          <Text className="mt-1 block" color="secondary" size="body3">
            {[title, location].filter(Boolean).join(', ')}
          </Text>
          {offers != null && offers.length > 0 && (
            <Text className="block italic" color="secondary" size="body3">
              Other offers: {offers.join(', ')}
            </Text>
          )}
        </div>
      </figcaption>
    </Card>
  );
}
