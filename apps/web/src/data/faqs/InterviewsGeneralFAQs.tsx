import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';

import type { FAQItem } from './FAQs';

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
    <ul>
      <li>
        <strong>Questions</strong>: There are over {QuestionCount} questions
        across JavaScript coding questions, User Interface coding questions,
        System Design content and quiz questions. For coding questions, you can
        practice within the browser without any installation needed, simulating
        real interview conditions.
      </li>
      <li>
        <strong>Guides</strong>: If you are new to front end interviews, we have
        written in-depth guides to help you tackle front end interviews and
        front end system design rounds, most of which are free.
      </li>
      <li>
        <strong>Study plans</strong>: A list of most important questions to
        practice and study, along with progress tracking.
      </li>
    </ul>
  ),
  key: 'general-buying',
  question: <>What does GreatFrontEnd Interviews offer?</>,
};

export const generalUnique: FAQItem = {
  answer: (
    <>
      Out of the resources in the market for front end interview preparation,
      our platform boasts the largest number of questions with solutions written
      by experienced Senior Front End Engineers previously from FAANG, who were
      also ex-interviewers.
    </>
  ),
  key: 'general-unique',
  question: <>What is unique about GreatFrontEnd Interviews?</>,
};

export const generalWhatsIncluded: FAQItem = {
  answer: (
    <>
      More than half of our practice questions and all the study plans are
      premium, which can be unlocked by purchasing a premium membership.
    </>
  ),
  key: 'general-included',
  question: <>What's included in GreatFrontEnd Interviews premium?</>,
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
      <FormattedMessage
        defaultMessage="Our lifetime access plan costs less than 1 hour of an average Front End Engineer's salary. Meanwhile, the reward for acing your interviews could be an increase in hundreds of thousands of total compensation."
        description="Paragraph 1 answer to 'Is it really worth it to buy GreatFrontEnd?' on Homepage's FAQ sections"
        id="YMfxks"
      />
      <br />
      <br />
      <FormattedMessage
        defaultMessage="Moreover, out of the resources in the market for front end interview preparation, our platform boasts the largest number of questions with solutions written by experienced Senior Front End Engineers previously from FAANG, who were also ex-interviewers."
        description="Paragraph 2 answer to 'Is it really worth it to buy GreatFrontEnd?' on Homepage's FAQ sections"
        id="IuWsYS"
      />
      <br />
      <br />
      <FormattedMessage
        defaultMessage="We are also the only platform offering decent front end system design content."
        description="FAQ answer"
        id="7xuDzw"
      />
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
      defaultMessage="Is GreatFrontEnd Interviews targeted at engineers of specific seniority?"
      description="Question on Homepage's FAQ section - on the seniority level of engineers that GreatFrontEnd targets"
      id="LBnblQ"
    />
  ),
};
