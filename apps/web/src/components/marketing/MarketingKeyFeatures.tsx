import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import logEvent from '~/logging/logEvent';

import { QuestionCount } from '../questions/listings/QuestionCount';

type Feature = Readonly<{
  gfe: React.ReactNode;
  key: string;
  name: string;
  otherPlatforms: React.ReactNode;
}>;

function useFeatures() {
  const intl = useIntl();
  const features: ReadonlyArray<Feature> = [
    {
      gfe: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="{questionCount}+ commonly asked questions across every interview
            format - <strong>System design, UI, JavaScript, Quizzes</strong>"
              description="Table cell content for large and curated question bank feature comparison in GFE."
              id="8/l1dM"
              values={{
                questionCount: QuestionCount,
                strong: (chunks) => (
                  <strong className="font-medium text-neutral-100">
                    {chunks}
                  </strong>
                ),
              }}
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="<link>View question list <span>→</span></link>"
              description="View question list link"
              id="2XFmzP"
              values={{
                link: (chunks) => (
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
                      logEvent('click', {
                        element: 'Key features list',
                        label: 'View question list',
                      });
                    }}>
                    {chunks}
                  </Anchor>
                ),
                span: (chunks) => (
                  <span className="aria-hidden ml-1">{chunks}</span>
                ),
              }}
            />
          </p>
        </div>
      ),
      key: 'question-bank',
      name: intl.formatMessage({
        defaultMessage: 'Large and curated question bank',
        description:
          'Table row header for large and curated question bank feature',
        id: 'T5ZDDU',
      }),
      otherPlatforms: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="Rarely cover system design or coding questions."
              description="Table cell content for large and curated question bank feature comparison in other platforms."
              id="OX/Imk"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="Often community-sourced."
              description="Table cell content for large and curated question bank feature comparison in other platforms."
              id="T1UibH"
            />
          </p>
        </div>
      ),
    },
    {
      gfe: (
        <div className="space-y-8">
          <FormattedMessage
            defaultMessage="<p>Every question has an in-depth solution with inline explanations.</p>
            <p>Solutions incorporate <strong>scalability, accessibility and performance</strong> considerations.</p>"
            description="Table cell content for quality solutions feature comparison in GFE."
            id="JP4Wie"
            values={{
              p: (chunks) => <p>{chunks}</p>,
              strong: (chunks) => (
                <strong className="font-medium text-neutral-100">
                  {chunks}
                </strong>
              ),
            }}
          />
        </div>
      ),
      key: 'quality-solutions',
      name: intl.formatMessage({
        defaultMessage: 'Quality solutions to learn from',
        description: 'Table row header for quality solutions feature',
        id: 'GP3q80',
      }),
      otherPlatforms: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="Solutions are hard to find or incomplete, usually superficial."
              description="Table cell content for quality solutions feature comparison in other platforms."
              id="JdOpbg"
            />
          </p>
        </div>
      ),
    },
    {
      gfe: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="Only platform with in-depth solutions to the most commonly asked system design questions."
              description="Table cell content for front end system design feature comparison in GFE."
              id="o4toU7"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="Exclusive system design guides, including solution framework, cheatsheet and evaluation axes."
              description="Table cell content for front end system design feature comparison in GFE."
              id="GQhit1"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="<link>View our free system design
              guides<span>→</span></link>"
              description="System design link"
              id="loCbaG"
              values={{
                link: (chunks) => (
                  <Anchor
                    href="/system-design"
                    variant="light"
                    onClick={() => {
                      gtag.event({
                        action: `homepage.key_features.system_design`,
                        category: 'engagement',
                        label: 'View our free system design guides',
                      });
                      logEvent('click', {
                        element: 'Key features list',
                        label: 'View our free system design guides',
                      });
                    }}>
                    {chunks}
                  </Anchor>
                ),
                span: (chunks) => (
                  <span className="aria-hidden ml-1">{chunks}</span>
                ),
              }}
            />
          </p>
        </div>
      ),
      key: 'system-design',
      name: intl.formatMessage({
        defaultMessage: 'Front end system design',
        description: 'Table row header for front end system design feature',
        id: 'XUWY7n',
      }),
      otherPlatforms: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="System design resources are virtually non-existent."
              description="Table cell content for front end system design feature comparison in other platforms."
              id="1IbtLx"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="Not many have experience to write quality guides."
              description="Table cell content for front end system design feature comparison in other platforms."
              id="qzKA9Y"
            />
          </p>
        </div>
      ),
    },
    {
      gfe: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="Proven study plans with the most important questions to practice for various preparation timelines."
              description="Table cell content for study plans feature comparison in GFE."
              id="8k78Jb"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="<link>View study plans <span>→</span></link>"
              description="Study plans link"
              id="wY7F08"
              values={{
                link: (chunks) => (
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
                      logEvent('click', {
                        element: 'Key features list',
                        label: 'View study plans',
                      });
                    }}>
                    {chunks}
                  </Anchor>
                ),
                span: (chunks) => (
                  <span className="aria-hidden ml-1">{chunks}</span>
                ),
              }}
            />
          </p>
        </div>
      ),
      key: 'study-plans',
      name: intl.formatMessage({
        defaultMessage: 'Study plans and Progress tracking',
        description: 'Table row header for study plans feature',
        id: '5QmCPt',
      }),
      otherPlatforms: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="Not available."
              description="Not available."
              id="B9449h"
            />
          </p>
        </div>
      ),
    },
    {
      gfe: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="Practice interview questions asked by
              <strong>Google, Facebook, Amazon, Apple, Airbnb, LinkedIn and more</strong>."
              description="Table cell content for practice questions by companies feature comparison in GFE."
              id="v4Z+0r"
              values={{
                strong: (chunks) => (
                  <strong className="font-medium text-neutral-100">
                    {chunks}
                  </strong>
                ),
              }}
            />
          </p>
        </div>
      ),
      key: 'companies',
      name: intl.formatMessage({
        defaultMessage: 'Practice questions by companies',
        description:
          'Table row header for practice questions by companies feature',
        id: 'kjdLiy',
      }),
      otherPlatforms: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="Not available."
              description="Not available."
              id="B9449h"
            />
          </p>
        </div>
      ),
    },
    {
      gfe: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="In-browser coding workspace with test cases - no need for any setup!"
              description="Table cell content for real interview simulation feature comparison in GFE."
              id="/Q1sUc"
            />
          </p>
        </div>
      ),
      key: 'interview-simulation',
      name: intl.formatMessage({
        defaultMessage: 'Real interview simulation',
        description: 'Table row header for real interview simulation feature',
        id: '+4N+iX',
      }),
      otherPlatforms: (
        <div className="space-y-8">
          <p>
            <FormattedMessage
              defaultMessage="Not available."
              description="Not available."
              id="B9449h"
            />
          </p>
        </div>
      ),
    },
  ];

  return features;
}

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
          'hidden py-8 pr-8 align-top text-base font-semibold text-neutral-100 sm:flex sm:text-lg lg:pb-32 lg:pt-8 lg:text-2xl',
        )}>
        {name}
      </td>
      <td
        className={clsx(
          'w-5/12 py-8 px-4 align-top text-base text-neutral-400 sm:text-lg lg:px-8 lg:pb-32 lg:pt-8 lg:text-xl',
        )}>
        {gfe}
      </td>
      <td
        className={clsx(
          'w-4/12 py-8 px-4 align-top text-base text-neutral-400 sm:text-lg lg:px-8 lg:pb-32 lg:pt-8 lg:text-xl',
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
    <div className="bg-neutral-900">
      <Container>
        <div className="mx-auto max-w-xl py-24 sm:max-w-3xl md:max-w-4xl lg:max-w-5xl lg:py-48">
          <div className="pb-4 sm:pb-16 ">
            <div ref={titleMarkerRef} />
            <div
              className={clsx(
                'relative transition-opacity duration-1000 ease-in-out',
                titleIsInView ? 'opacity-100' : 'opacity-0',
              )}>
              <Heading
                className="my-2 text-center"
                color="light"
                level="heading2">
                <FormattedMessage
                  defaultMessage="<span>All the essentials for front end</span>
                  <inline>interviews <colour>and more</colour></inline>."
                  description="Key features section heading"
                  id="ZLXgL9"
                  values={{
                    colour: (chunks) => (
                      <span className="from-brand-400 bg-gradient-to-l to-pink-500 bg-clip-text text-transparent">
                        {chunks}
                      </span>
                    ),
                    inline: (chunks) => (
                      <span className="inline-block">{chunks}</span>
                    ),
                    span: (chunks) => <span>{chunks}</span>,
                  }}
                />
              </Heading>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg  text-neutral-400 md:text-xl lg:mt-10 ">
                <FormattedMessage
                  defaultMessage="You won't find the same depth and quality elsewhere."
                  description="Key features section subheading"
                  id="eFGHLB"
                />
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
                      'table-fixed divide-y divide-neutral-700 text-base transition-opacity duration-1000 ease-in-out sm:text-lg lg:text-2xl',
                      tableIsInView ? 'opacity-100' : 'opacity-0',
                    )}>
                    <thead
                      className={clsx(
                        'sticky top-14 bg-neutral-900 transition-opacity duration-1000 ease-in-out',
                        tableIsInView ? 'opacity-100' : 'opacity-0',
                      )}>
                      <tr>
                        <th
                          className="hidden py-8 text-left font-semibold text-neutral-100 sm:flex lg:pb-10"
                          scope="col"
                        />
                        <th
                          className="w-1/2 py-8 px-4 text-left font-semibold text-neutral-100 sm:w-5/12 lg:px-8 lg:pb-8"
                          scope="col">
                          <FormattedMessage
                            defaultMessage="GreatFrontEnd"
                            description="Table column header for GFE"
                            id="phh5/0"
                          />
                        </th>
                        <th
                          className="w-1/2 py-8 px-4 text-left font-semibold text-neutral-100 sm:w-4/12 lg:px-8 lg:pb-8"
                          scope="col">
                          <FormattedMessage
                            defaultMessage="Other Platforms"
                            description="Table column header for other platforms"
                            id="UM4r2s"
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-700">
                      {useFeatures().map(({ key, ...others }) => (
                        <TableRow key={key} {...others} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mx-auto mt-12 flex items-center px-6 text-center text-lg sm:mt-24 md:text-xl lg:text-2xl">
                <span className="text-white">
                  <FormattedMessage
                    defaultMessage="Not convinced yet?
                    <link>Try the product (it's free) →</link>"
                    description="Call-to-action"
                    id="IK98yM"
                    values={{
                      link: (chunks) => (
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
                            logEvent('click', {
                              element: 'Key features list',
                              label: "Try the product (it's free)",
                            });
                          }}>
                          {chunks}
                        </Anchor>
                      ),
                      span: (chunks) => (
                        <span className="aria-hidden ml-1">{chunks}</span>
                      ),
                    }}
                  />
                </span>
              </div>
            </div>
          </Section>
        </div>
      </Container>
    </div>
  );
}
