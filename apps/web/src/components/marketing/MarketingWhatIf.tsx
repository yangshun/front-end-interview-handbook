import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';

export default function MarketingWhatIfNew() {
  const titleMarkerRef = useRef(null);
  const titleIsInView = useInView(titleMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <div className="relative flex min-h-[450px] items-center overflow-hidden bg-white sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
      <img
        alt=""
        aria-hidden={true}
        className="origin=[0_100%] absolute w-full will-change-transform"
        src="/img/marketing/hero.jpg"
        style={{
          height: 400,
          opacity: '20%',
          top: '70%',
          transform: `skewY(15deg) rotate(180deg)`,
        }}
      />
      <Container>
        <div className="mx-auto max-w-xl px-6 py-16 sm:max-w-3xl sm:px-12 md:max-w-4xl md:py-24 lg:max-w-5xl lg:py-32 xl:px-0">
          <div className="lg:pb-12">
            <div ref={titleMarkerRef} />
            <div
              className={clsx(
                'relative transition-opacity duration-[1500ms] ease-in-out',
                titleIsInView ? 'opacity-100' : 'opacity-0',
              )}>
              <Heading className="my-2 mx-auto text-center" level="heading2">
                <FormattedMessage
                  defaultMessage="What if those fundamentals were already abstracted for you?"
                  description="Title of section on Homepage to hook users with an engaging key benefit of the product"
                  id="TeTJmh"
                />
              </Heading>
              <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-500 md:text-xl lg:mt-10 lg:text-2xl ">
                <FormattedMessage
                  defaultMessage="At GreatFrontEnd, we are focused on abstracting front end interviews into repeatable patterns and fundamental concepts. All you need to do is go through our questions and study plans!"
                  description="Description under the title of the section on Homepage to hook users with an engaging key benefit of the product"
                  id="R99Y8S"
                />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
