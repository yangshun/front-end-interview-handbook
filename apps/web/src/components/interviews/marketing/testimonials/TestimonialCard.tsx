import type { Testimonial } from '~/data/Testimonials';

import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';

export default function TestimonialCard({
  testimonial,
  authorThumbnailUrl,
  authorUrl,
  name,
  title,
  location,
}: Testimonial) {
  return (
    <Card
      className="rounded-2xl p-6 text-sm leading-6"
      padding={false}
      pattern={false}>
      <blockquote>
        <Text size="body2">"{testimonial}"</Text>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-x-4">
        {authorThumbnailUrl && (
          <img
            alt={name}
            className="size-10 rounded-full bg-neutral-50"
            decoding="async"
            loading="lazy"
            src={authorThumbnailUrl}
          />
        )}
        <div>
          {name &&
            (() => {
              const nameEl = (
                <Text size="body2" weight="bold">
                  {name}
                </Text>
              );

              if (authorUrl) {
                return <Anchor href={authorUrl}>{nameEl}</Anchor>;
              }

              return nameEl;
            })()}
          <Text color="secondary" display="block" size="body3">
            {[title, location].filter(Boolean).join(', ')}
          </Text>
        </div>
      </figcaption>
    </Card>
  );
}
