import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import * as gtag from '~/lib/gtag';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import { QuestionCount } from '../questions/listings/QuestionCount';

type Feature = Readonly<{
  gfe: React.ReactNode;
  key: string;
  name: string;
  otherPlatforms: React.ReactNode;
}>;

const features: ReadonlyArray<Feature> = [
  {
    gfe: (
      <div className="space-y-8">
        <p>
          {QuestionCount}+ commonly asked questions across every interview
          format -{' '}
          <strong className="font-medium text-slate-100">
            System design, UI, JavaScript, Quizzes
          </strong>
          .
        </p>
        <p>
          <Anchor
            className="flex items-center"
            href="/prepare"
            variant="light"
            onClick={() => {
              gtag.event({
                action: `homepage.key_features.questions`,
                category: 'engagement',
                label: 'View question list',
              });
            }}>
            View question list <span className="aria-hidden ml-1">→</span>
          </Anchor>
        </p>
      </div>
    ),
    key: 'question-bank',
    name: 'Large and curated question bank',
    otherPlatforms: (
      <div className="space-y-8">
        <p>Rarely cover system design or coding questions.</p>
        <p>Often community-sourced.</p>
      </div>
    ),
  },
  {
    gfe: (
      <div className="space-y-8">
        <p>
          Every question has an in-depth solution with inline explanations.{' '}
        </p>{' '}
        <p>
          Solutions incorporate{' '}
          <strong className="font-medium text-slate-100">
            scalability, accessibility and performance
          </strong>{' '}
          considerations.
        </p>
      </div>
    ),
    key: 'quality-solutions',
    name: 'Quality solutions to learn from',
    otherPlatforms: (
      <div className="space-y-8">
        <p>Solutions are hard to find or incomplete, usually superficial.</p>
      </div>
    ),
  },
  {
    gfe: (
      <div className="space-y-8">
        <p>
          Only platform with in-depth solutions to the most commonly asked
          system design questions.
        </p>
        <p>
          Exclusive system design guides, including solution framework,
          cheatsheet and evaluation axes.
        </p>
        <p>
          <Anchor
            href="/system-design"
            variant="light"
            onClick={() => {
              gtag.event({
                action: `homepage.key_features.system_design`,
                category: 'engagement',
                label: 'View our free system design guides',
              });
            }}>
            View our free system design
            <br />
            guides<span className="aria-hidden ml-1">→</span>
          </Anchor>
        </p>
      </div>
    ),
    key: 'system-design',
    name: 'Front end system design',
    otherPlatforms: (
      <div className="space-y-8">
        <p>System design resources are virtually non-existent.</p>
        <p>Not many have experience to write quality guides.</p>
      </div>
    ),
  },
  {
    gfe: (
      <div className="space-y-8">
        <p>
          Proven study plans with the most important questions to practice for
          various preparation timelines.
        </p>
        <p>
          <Anchor
            className="flex items-center"
            href="/get-started"
            variant="light"
            onClick={() => {
              gtag.event({
                action: `homepage.key_features.study_plans`,
                category: 'engagement',
                label: 'View study plans',
              });
            }}>
            View study plans <span className="aria-hidden ml-1">→</span>
          </Anchor>
        </p>
      </div>
    ),
    key: 'study-plans',
    name: 'Study plans and Progress tracking',
    otherPlatforms: (
      <div className="space-y-8">
        <p>Not available.</p>
      </div>
    ),
  },
  {
    gfe: (
      <div className="space-y-8">
        <p>
          Practice interview questions asked by{' '}
          <strong className="font-medium text-slate-100">
            Google, Facebook, Amazon, Apple, Airbnb, LinkedIn and more
          </strong>
          .
        </p>
      </div>
    ),
    key: 'companies',
    name: 'Practice questions by companies',
    otherPlatforms: (
      <div className="space-y-8">
        <p>Not available.</p>
      </div>
    ),
  },
  {
    gfe: (
      <div className="space-y-8">
        <p>
          In-browser coding workspace with test cases - no need for any setup!
        </p>
      </div>
    ),
    key: 'interview-simulation',
    name: 'Real interview simulation',
    otherPlatforms: (
      <div className="space-y-8">
        <p>Not available.</p>
      </div>
    ),
  },
];

function TableRow({ gfe, name, otherPlatforms }: Feature) {
  const rowMarkerRef = useRef<HTMLTableRowElement | null>(null);
  const rowInView = useInView(rowMarkerRef, {
    amount: 'all',
    once: true,
  });

  return (
    <tr
      ref={rowMarkerRef}
      className={clsx(
        'transition-opacity duration-1000 ease-in-out',
        rowInView ? 'opacity-100' : 'opacity-0',
      )}>
      <td
        className={clsx(
          'hidden py-8 pr-8 align-top text-base font-semibold text-slate-100 sm:flex sm:text-lg lg:pb-32 lg:pt-8 lg:text-2xl',
        )}>
        {name}
      </td>
      <td
        className={clsx(
          'w-5/12 py-8 px-4 align-top text-base text-slate-400 sm:text-lg lg:px-8 lg:pb-32 lg:pt-8 lg:text-xl',
        )}>
        {gfe}
      </td>
      <td
        className={clsx(
          'w-4/12 py-8 px-4 align-top text-base text-slate-400 sm:text-lg lg:px-8 lg:pb-32 lg:pt-8 lg:text-xl',
        )}>
        {otherPlatforms}
      </td>
    </tr>
  );
}

export default function MarketingKeyFeaturesNew() {
  const titleMarkerRef = useRef(null);
  const titleIsInView = useInView(titleMarkerRef, {
    amount: 'all',
    once: true,
  });

  const tableMarkerRef = useRef(null);
  const tableIsInView = useInView(tableMarkerRef, {
    once: true,
  });

  return (
    <div className="bg-slate-900">
      <Container>
        <div className="mx-auto max-w-xl py-24 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl lg:py-48">
          <div className="pb-4 sm:pb-16 ">
            <div ref={titleMarkerRef} />
            <div
              className={clsx(
                'relative transition-opacity duration-1000 ease-in-out',
                titleIsInView ? 'opacity-100' : 'opacity-0',
              )}>
              <Heading className="my-2 text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl md:text-4xl lg:text-5xl">
                <span>All the essentials for front end</span>{' '}
                <span className="inline-block">
                  interviews{' '}
                  <span className="from-brand-400 bg-gradient-to-l to-pink-500 bg-clip-text text-transparent">
                    and more
                  </span>
                </span>
                .
              </Heading>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg  text-slate-400 md:text-xl lg:mt-10 ">
                You won't find the same depth and quality elsewhere.
              </p>
            </div>
          </div>
          <Section>
            <div className="flex flex-col">
              <div className="-my-2">
                <div className="inline-block py-2 align-middle">
                  <table
                    ref={tableMarkerRef}
                    className={clsx(
                      'table-fixed divide-y divide-slate-700 text-base transition-opacity duration-1000 ease-in-out sm:text-lg lg:text-2xl',
                      tableIsInView ? 'opacity-100' : 'opacity-0',
                    )}>
                    <thead
                      className={clsx(
                        'sticky top-14 bg-slate-900 transition-opacity duration-1000 ease-in-out',
                        tableIsInView ? 'opacity-100' : 'opacity-0',
                      )}>
                      <tr>
                        <th
                          className="hidden py-8 text-left font-semibold text-slate-100 sm:flex lg:pb-10"
                          scope="col"
                        />
                        <th
                          className="w-1/2 py-8 px-4 text-left font-semibold text-slate-100 sm:w-5/12 lg:px-8 lg:pb-8"
                          scope="col">
                          GreatFrontEnd
                        </th>
                        <th
                          className="w-1/2 py-8 px-4 text-left font-semibold text-slate-100 sm:w-4/12 lg:px-8 lg:pb-8"
                          scope="col">
                          Other Platforms
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {features.map(({ key, ...others }) => (
                        <TableRow key={key} {...others} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mx-auto mt-12 flex items-center px-6 text-center text-lg sm:mt-24 md:text-xl lg:text-2xl">
                <span className="text-white">
                  Not convinced yet?{' '}
                  <Anchor
                    className="text-brand-400 hover:text-brand-500 ml-2 flex items-center font-semibold"
                    href="/prepare"
                    variant="unstyled"
                    onClick={() => {
                      gtag.event({
                        action: `homepage.key_features.try_product`,
                        category: 'engagement',
                        label: "Try the product (it's free)",
                      });
                    }}>
                    Try the product (it's free) →
                  </Anchor>
                </span>
              </div>
            </div>
          </Section>
        </div>
      </Container>
    </div>
  );
}
