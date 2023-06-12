import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function MarketingBecause() {
  const titleMarkerRef = useRef(null);
  const titleIsInView = useInView(titleMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <div className="min-h-[450px] bg-neutral-50 sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      <Container>
        <div className="mx-auto max-w-xl px-6 py-16 sm:max-w-3xl sm:px-12 md:max-w-4xl md:py-24 lg:max-w-5xl lg:py-32 xl:px-0">
          <div ref={titleMarkerRef} />
          <div
            className={clsx(
              'relative transition-opacity duration-[1500ms] ease-in-out',
              titleIsInView ? 'opacity-100' : 'opacity-0',
            )}>
            <Heading
              className="my-2 mx-auto space-y-2 text-center"
              level="heading2">
              <FormattedMessage
                defaultMessage="Because front end interviews are about <span>fundamentals</span>."
                description="Title of Second section on homepage - serving to hook users with identification of their pain points"
                id="L0IePi"
                values={{
                  span: (chunks) => (
                    <span className="from-brand-dark bg-gradient-to-l to-pink-500 bg-clip-text text-transparent">
                      {chunks}
                    </span>
                  ),
                }}
              />
            </Heading>
            <Section>
              <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-neutral-500 md:text-xl lg:mt-10 lg:text-2xl">
                <FormattedMessage
                  defaultMessage="Front end interviews come in so many formats. You could be asked to write JavaScript functions, build a UI, design a system, or even solve LeetCode-style algorithm questions."
                  description="Subtitle of Second section on homepage - first paragraph"
                  id="6e1+nl"
                />
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-neutral-500 md:text-xl lg:mt-10 lg:text-2xl">
                <FormattedMessage
                  defaultMessage="Building your fundamentals is the only way to rock the interview every single time."
                  description="Subtitle of Second section on homepage - second paragraph"
                  id="TAajQb"
                />
              </p>
            </Section>
          </div>
        </div>
      </Container>
    </div>
  );
}
