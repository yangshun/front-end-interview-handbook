import type { ReactNode } from 'react';
import url from 'url';

import { SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION } from '~/hooks/useScrollToHash';

import {
  QuestionCount,
  QuestionCountFree,
} from '~/components/interviews/questions/listings/stats/QuestionCount';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';

import type { FAQItem } from './FAQs';

const bold = (chunks: Array<ReactNode>) => (
  <strong className="font-medium">{chunks}</strong>
);

export const generalTarget: FAQItem = {
  answer: (
    <>
      <p>
        GreatFrontEnd Interviews is excellent for engineers who are preparing
        for front end-focused interviews. Front end interviews have a different
        focus from traditional software engineering interviews as there is more
        emphasis on front end technologies, such as browser technologies,
        solving JavaScript-specific coding problems, building user interfaces
        using frameworks like React, Vue, and Angular, and front end client
        architecture.
      </p>
      <p>
        That said, even if you are not interviewing, or not officially a Front
        End Engineer, software engineers who develop for the web will still
        benefit from the high quality content and questions authored by our
        senior team of ex-FAANG engineers and interviewers.
      </p>
    </>
  ),
  key: 'general-target',
  question: <>Who is GreatFrontEnd Interviews for?</>,
};

export const generalBuying: FAQItem = {
  answer: (
    <>
      <p>
        <strong>
          <FormattedMessage
            defaultMessage="Large base of {questionCount}+ practice questions"
            description='Paragraph 1 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
            id="y0DBMD"
            values={{
              questionCount: QuestionCount,
            }}
          />
        </strong>
        <ul>
          <li>
            <FormattedMessage
              defaultMessage="Each question is paired with detailed solutions and comprehensive
            test cases."
              description='Paragraph 1 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
              id="B6CHW7"
            />
          </li>
          <li>
            <FormattedMessage
              defaultMessage="Covers every essential language and framework: {JavaScript}, {React},
          {TypeScript}, {Angular}, {Vue}, {Svelte}, {HTML}, and {CSS}."
              description='Paragraph 1 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
              id="J0I9im"
              values={{
                Angular: <Anchor href="/questions/react">Angular</Anchor>,
                CSS: <Anchor href="/questions/react">CSS</Anchor>,
                HTML: <Anchor href="/questions/react">HTML</Anchor>,
                JavaScript: <Anchor href="/questions/js">JavaScript</Anchor>,
                React: <Anchor href="/questions/react">React</Anchor>,
                Svelte: <Anchor href="/questions/react">Svelte</Anchor>,
                TypeScript: <Anchor href="/questions/ts">TypeScript</Anchor>,
                Vue: <Anchor href="/questions/react">Vue</Anchor>,
              }}
            />
          </li>
          <li>
            <FormattedMessage
              defaultMessage="Includes every possible question format you'll encounter: <jsCodingAnchor>JavaScript
          coding questions</jsCodingAnchor>, <uiAnchor>UI coding questions</uiAnchor>, <algoCodingAnchor>Algo coding questions</algoCodingAnchor>, <systemDesignAnchor>System
          design</systemDesignAnchor>, and <quizAnchor>Quiz-style questions</quizAnchor>."
              description='Paragraph 1 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
              id="zOaxDi"
              values={{
                algoCodingAnchor: (chunks) => (
                  <Anchor href="/questions/algo">{chunks}</Anchor>
                ),
                jsCodingAnchor: (chunks) => (
                  <Anchor href="/questions/javascript">{chunks}</Anchor>
                ),
                quizAnchor: (chunks) => (
                  <Anchor href="/questions/quiz">{chunks}</Anchor>
                ),
                systemDesignAnchor: (chunks) => (
                  <Anchor href="/questions/system-design">{chunks}</Anchor>
                ),
                uiAnchor: (chunks) => (
                  <Anchor href="/questions/user-interface">{chunks}</Anchor>
                ),
              }}
            />
          </li>
        </ul>
      </p>
      <p>
        <strong>
          <FormattedMessage
            defaultMessage="Recommended prep plan"
            description='Paragraph 2 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
            id="rj0mJw"
          />
        </strong>
        <div>
          <FormattedMessage
            defaultMessage="The <anchor>recommended prep plan</anchor> is a straightforward strategy designed to
          help most users efficiently prepare for front-end interviews. It
          covers critical areas to ensure you are ready for the majority of
          challenges you'll face:"
            description='Paragraph 2 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
            id="O2mFmn"
            values={{
              anchor: (chunks) => (
                <Anchor
                  href={url.format({
                    hash: SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION,
                    pathname: '/interviews/dashboard',
                  })}>
                  {chunks}
                </Anchor>
              ),
            }}
          />
        </div>
        <ul>
          <li>
            <FormattedMessage
              defaultMessage="{Title}: A curated list of the 75 most important front-end interview questions. This list focuses on key topics, patterns, and formats commonly tested in interviews, giving you the foundational knowledge required to excel."
              description='Paragraph 2 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
              id="72crs8"
              values={{
                Title: <Anchor href="/interviews/gfe75">GFE 75</Anchor>,
              }}
            />
          </li>
          <li>
            <FormattedMessage
              defaultMessage="{Title}: A list of the top 75 data structures and algorithms questions, adapted and solved in JavaScript and TypeScript to make them more accessible for front-end engineers. This ensures you're prepared for DSA questions, which are often a requirement at FAANG and similar companies."
              description='Paragraph 2 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
              id="zl/anP"
              values={{
                Title: <Anchor href="/interviews/blind75">Blind 75</Anchor>,
              }}
            />
          </li>
          <li>
            <FormattedMessage
              defaultMessage="{Title}: A comprehensive resource that covers front-end system design interviews. It includes strategies, evaluation criteria, and solutions to common system design questions, such as designing a social media feed or autocomplete component. This guide is invaluable, as high-quality front-end system design materials are hard to find."
              description='Paragraph 2 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
              id="ZG5bD2"
              values={{
                Title: (
                  <Anchor href="/front-end-system-design-playbook">
                    Front-End System Design Playbook
                  </Anchor>
                ),
              }}
            />
          </li>
        </ul>
      </p>
      <p>
        <strong>
          <FormattedMessage
            defaultMessage="Time-Saving Lists"
            description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
            id="ltgSBa"
          />
        </strong>
        <div>
          <FormattedMessage
            defaultMessage="These resources help you prepare effectively while saving time by focusing on high-impact areas:"
            description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
            id="3I6rHR"
          />
        </div>
        <ul>
          <li>
            <strong>
              <FormattedMessage
                defaultMessage="Study Plans:"
                description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
                id="e0jJyT"
              />
            </strong>
            <ul>
              <li>
                <FormattedMessage
                  defaultMessage="{Title}: Optimized for those with limited time, focusing on the most important concepts through coding and quiz-style questions."
                  description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
                  id="8SsXE6"
                  values={{
                    Title: (
                      <Anchor href="/interviews/study-plans/one-week">
                        1-Week Plan
                      </Anchor>
                    ),
                  }}
                />
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="{Title}: A balanced plan to enhance both coding and system design skills, preparing you thoroughly in a month."
                  description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
                  id="wPCPuk"
                  values={{
                    Title: (
                      <Anchor href="/interviews/study-plans/one-month">
                        1-Month Plan
                      </Anchor>
                    ),
                  }}
                />
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="{Title}: The complete all-in-one preparation roadmap, covering over 140 questions for deep and comprehensive preparation."
                  description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
                  id="xJ0BqY"
                  values={{
                    Title: (
                      <Anchor href="/interviews/study-plans/three-months">
                        3-Month Plan
                      </Anchor>
                    ),
                  }}
                />
              </li>
            </ul>
          </li>
          <li>
            <strong>
              <FormattedMessage
                defaultMessage="Company Guides:"
                description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
                id="QrCyaP"
              />
            </strong>
            <ul>
              <li>
                <FormattedMessage
                  defaultMessage="Company-specific preparation for interviews at top companies like <bold>Google</bold>, <bold>Amazon</bold>, <bold>Microsoft</bold>, <bold>TikTok</bold>, <bold>Apple</bold>, and <bold>more</bold>. These guides include insider tips and practice questions tailored to the company's interview style."
                  description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
                  id="ladXww"
                  values={{ bold }}
                />
              </li>
            </ul>
          </li>
          <li>
            <strong>
              <FormattedMessage
                defaultMessage="Focus Areas:"
                description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
                id="EI/M2R"
              />
            </strong>
            <ul>
              <li>
                <FormattedMessage
                  defaultMessage="Specialized questions covering critical front-end topics such as:"
                  description='Paragraph 3 for "What does GreatFrontEnd Interviews offer exactly?" on Homepage FAQ sections'
                  id="EbMRMy"
                />
                <ul>
                  {[
                    {
                      href: '/interviews/focus-areas/accessibility',
                      name: 'Accessibility',
                    },
                    {
                      href: '/interviews/focus-areas/async-operations',
                      name: 'Async operations',
                    },
                    {
                      href: '/interviews/focus-areas/dom-manipulation',
                      name: 'DOM manipulation',
                    },
                    {
                      href: '/interviews/focus-areas/forms',
                      name: 'Forms',
                    },
                    {
                      href: '/interviews/focus-areas/design-system-components',
                      name: 'Design system components',
                    },
                    {
                      href: '/interviews/focus-areas/javascript-polyfills',
                      name: 'JavaScript polyfills',
                    },
                    {
                      href: '/interviews/focus-areas/lodash',
                      name: 'Lodash functions',
                    },
                    {
                      href: '/interviews/focus-areas/state-management',
                      name: 'State management',
                    },
                    {
                      href: '/interviews/focus-areas/data-structures-algorithms',
                      name: 'Data structures and algorithms',
                    },
                  ].map(({ name, href }) => (
                    <li key={name}>
                      <Anchor href={href}>{name}</Anchor>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </p>
    </>
  ),
  key: 'general-buying',
  question: <>What does GreatFrontEnd Interviews offer exactly?</>,
};

export const generalUnique: FAQItem = {
  answer: (
    <>
      <ol>
        <li>
          <FormattedMessage
            defaultMessage="<strong>Created by Ex-interviewers:</strong> Every question, solution,
        test case, and curated question list or prep strategy on our platform
        has been carefully created by senior / staff engineers who have
        extensive experience conducting interviews at top tech companies. We
        guarantee trustworthy, high-quality content aligned with current market
        demands."
            description="Point 1 answer to 'What is unique about GreatFrontEnd Interviews?' on Homepage's FAQ sections"
            id="7O4ntB"
            values={{ strong: (chunks) => <strong>{chunks}</strong> }}
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="<strong>Comprehensive solutions and tests:</strong> We provide official
        solutions and test cases for every question, crafted by ex-FAANG
        engineers. Our solutions are in-depth and provide explanations of the
        approach, not just the code."
            description="Point 2 answer to 'What is unique about GreatFrontEnd Interviews?' on Homepage's FAQ sections"
            id="8MF8Uf"
            values={{ strong: (chunks) => <strong>{chunks}</strong> }}
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="<strong>A simple roadmap to follow:</strong> If you don't know where to
        start, we provide a <anchor>carefully vetted roadmap</anchor> that guides you
        through preparing efficiently for the majority of the most common
        challenges you might encounter."
            description="Point 3 answer to 'What is unique about GreatFrontEnd Interviews?' on Homepage's FAQ sections"
            id="fcFBen"
            values={{
              anchor: (chunks) => (
                <Anchor
                  href={url.format({
                    hash: SCROLL_HASH_INTERVIEWS_DASHBOARD_RECOMMENDED_PREPARATION,
                    pathname: '/interviews/dashboard',
                  })}>
                  {chunks}
                </Anchor>
              ),
              strong: (chunks) => <strong>{chunks}</strong>,
            }}
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="<strong>Demonstrated success:</strong> We've over 500,000 active users
        over our lifetime, and have accumulated a strong track record of helping
        users land offers at FAANG and other FAANG adjacent companies. Many
        users have reported encountering questions directly sourced from our
        question base."
            description="Point 4 answer to 'What is unique about GreatFrontEnd Interviews?' on Homepage's FAQ sections"
            id="vy8Wbl"
            values={{ strong: (chunks) => <strong>{chunks}</strong> }}
          />
        </li>
      </ol>
      <p>
        <FormattedMessage
          defaultMessage="We are also the only platform offering decent front end system design content."
          description="FAQ answer"
          id="7xuDzw"
        />
      </p>
    </>
  ),
  key: 'general-unique',
  question: <>What is unique about GreatFrontEnd Interviews?</>,
};

export const generalWhatsIncluded: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="While over {freeQuestionCount} practice questions are available for free, the premium plan unlocks access to <bold>approximately half of our curated question bank</bold>, including exclusive questions not available in the free version. Additionally, the <bold>majority of our official solutions</bold>, written by ex-FAANG interviewers, are only accessible through a premium subscription."
          description="Paragraph 1 answer to 'What is included in the premium plan?' on Homepage's FAQ sections"
          id="U9yPZC"
          values={{
            bold,
            freeQuestionCount: QuestionCountFree,
          }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Premium users also gain access to <bold>company tags</bold>, enabling them to filter questions by specific companies known to ask them, making it easier to tailor their preparation."
          description="Paragraph 2 answer to 'What is included in the premium plan?' on Homepage's FAQ sections"
          id="UPf7Yu"
          values={{ bold }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Finally, premium features include access to time-saving resources such as <bold>curated question lists</bold>, including study plans, focus areas, and company guides, designed to streamline your preparation process and maximize efficiency."
          description="Paragraph 3 answer to 'What is included in the premium plan?' on Homepage's FAQ sections"
          id="2eN4S3"
          values={{ bold }}
        />
      </p>
    </>
  ),
  key: 'general-included',
  question: <>What is included in the premium plan?</>,
};

export const generalFreeUpdates: FAQItem = {
  answer: (
    <>
      With a premium membership, you will get access to every new question and
      any guide we add in future. As new technologies and trends emerge, we
      update our questions and potentially add new questions/formats to keep up
      with the trends and you will get access to all of them.
    </>
  ),
  key: 'general-free-updates',
  question: <>What does "free updates" for GreatFrontEnd Interviews include?</>,
};

export const generalWorthIt: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="Our plans cost <bold>less than the equivalent of one hour</bold> of an average Front End Engineer's salary. In contrast, a strong interview performance can lead to securing a competitive offer with a total compensation <bold>increase of hundreds of thousands of dollars</bold>. It's widely known that many companies structure their offers based on interview performance, and excelling in interviews can even result in being <bold>upleveled into a higher role</bold>, further increasing your earning potential."
          description="Paragraph 1 answer to 'Is it really worth it to buy GreatFrontEnd?' on Homepage's FAQ sections"
          id="mKaP8w"
          values={{
            bold,
          }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="With over 500,000 engineers using our platform, there is a high likelihood that candidates <bold>competing for the same roles</bold> are already leveraging our resources. Additionally, countless users have reported encountering <bold>questions from our platform in their actual interviews</bold>, making the practice you gain on the platform directly relevant to the challenges you'll face in actual interviews."
          description="Paragraph 2 answer to 'Is it really worth it to buy GreatFrontEnd?' on Homepage's FAQ sections"
          id="WjGVYh"
          values={{ bold }}
        />
      </p>
    </>
  ),
  key: 'general-worth-it',
  question: (
    <FormattedMessage
      defaultMessage="Is it really worth it to buy GreatFrontEnd Interviews?"
      description="Question on Homepage's FAQ section - on the worthiness of purchasing the product"
      id="kJOJ4u"
    />
  ),
};

export const generalSeniority: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="There is something to learn from GreatFrontEnd for engineers of all seniority levels. Junior engineers will be able to solidify their fundamentals and learn techniques they never knew about. Mid-level engineers will benefit from more advanced concepts like internationalization, accessibility, and performance. Senior engineers will benefit most from the system design questions which impart architectural concepts."
          description="Answer to 'Is GreatFrontEnd targeted at engineers of specific seniority?' on Homepage's FAQ sections"
          id="TQLJ/G"
        />
      </p>
      <p>
        It's never too early to start. Many of our users are students who have
        leveraged our ongoing{' '}
        <Anchor href="/promotions">student discount</Anchor> for the annual
        plan.
      </p>
    </>
  ),
  key: 'general-seniority',
  question: (
    <FormattedMessage
      defaultMessage="Is GreatFrontEnd Interviews targeted at engineers of specific seniorities?"
      description="Question on Homepage's FAQ section - on the seniority level of engineers that GreatFrontEnd targets"
      id="9CZ7bS"
    />
  ),
};
