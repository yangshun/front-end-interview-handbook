'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  RiArrowRightCircleLine,
  RiArrowRightSLine,
  RiShoppingCart2Line,
} from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeBorderColor, themeDivideColor } from '~/components/ui/theme';

export default function NotFoundPage() {
  // Useful to log the full pathname for a 404.
  const pathname = usePathname();
  const questionFormatLists = useQuestionFormatLists();

  useEffect(() => {
    gtag.event({
      action: '404',
      category: 'engagement',
      label: pathname ?? window.location.pathname,
    });
    gtag.event({
      action: `404.${pathname}`,
      category: 'engagement',
      label: pathname ?? window.location.pathname,
    });
  }, [pathname]);

  const links = [
    {
      description:
        'Not sure where to start? This page introduces you to everything the platform offers',
      href: '/get-started',
      icon: RiArrowRightCircleLine,
      title: 'Get Started',
    },
    {
      description: questionFormatLists.coding.description,
      href: questionFormatLists.coding.href,
      icon: questionFormatLists.coding.icon,
      title: `Prepare for ${questionFormatLists.coding.name} Questions`,
    },
    {
      description: questionFormatLists['system-design'].description,
      href: questionFormatLists['system-design'].href,
      icon: questionFormatLists['system-design'].icon,
      title: `Prepare for ${questionFormatLists['system-design'].name} Questions`,
    },
    {
      description: questionFormatLists.quiz.description,
      href: questionFormatLists.quiz.href,
      icon: questionFormatLists.quiz.icon,
      title: `Prepare for ${questionFormatLists.quiz.name} Questions`,
    },
    {
      description:
        'Join the premium club and get access to all questions and solutions',
      href: '/pricing',
      icon: RiShoppingCart2Line,
      title: 'Products',
    },
  ];

  return (
    <>
      <title>Page Not Found | GreatFrontEnd</title>
      <div>
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl py-12 sm:py-16">
            <Heading className="text-center" level="heading3">
              This page does not exist
            </Heading>
            <Section>
              <div className="mt-12">
                <Heading
                  className="text-base font-semibold text-neutral-500"
                  color="custom"
                  level="custom">
                  You might be interested in
                </Heading>
                <Section>
                  <ul
                    className={clsx(
                      'mt-4 divide-y border-t border-b',
                      themeBorderColor,
                      themeDivideColor,
                    )}
                    role="list">
                    {links.map((link) => (
                      <li
                        key={link.title}
                        className="relative flex items-start space-x-4 py-6">
                        <div className="flex-shrink-0">
                          <span className="bg-brand-lightest flex size-12 items-center justify-center rounded-lg">
                            <link.icon
                              aria-hidden="true"
                              className="text-brand-darker size-6"
                            />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <Heading
                            className="text-base font-medium"
                            level="custom">
                            <span className="focus-within:ring-brand rounded-sm focus-within:ring-2 focus-within:ring-offset-2">
                              <Anchor
                                className="focus:outline-none"
                                href={link.href}
                                variant="unstyled">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {link.title}
                              </Anchor>
                            </span>
                          </Heading>
                          <Section>
                            <p className="text-base text-neutral-500">
                              {link.description}
                            </p>
                          </Section>
                        </div>
                        <div className="flex-shrink-0 self-center">
                          <RiArrowRightSLine
                            aria-hidden="true"
                            className="size-5 text-neutral-400"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Anchor
                      className="text-brand-dark hover:text-brand text-base font-medium"
                      href="/prepare"
                      variant="unstyled">
                      Or go back home<span aria-hidden="true"> &rarr;</span>
                    </Anchor>
                  </div>
                </Section>
              </div>
            </Section>
          </div>
        </main>
      </div>
    </>
  );
}
