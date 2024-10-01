import type { FAQItem, FAQItems } from '~/data/faqs/FAQs';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

const projectsPreparation: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage='Nothing at all! Just click "Start project", and we will take care of everything else and guide you along the way.'
        description="FAQ answer for projects platform"
        id="rzu02O"
      />
    </p>
  ),
  key: 'preparation',
  question: (
    <FormattedMessage
      defaultMessage="What do I need to prepare before starting a challenge?"
      description="FAQ question for projects platform"
      id="i1Qhhq"
    />
  ),
};

const projectsCode: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage="You will have to use your own IDE, just as any developer should for a real project. If you're a complete beginner and are not sure what an IDE is, we will have a basic guide within Step 3's tab teaching you how to download and set-up an IDE for the first time."
        description="FAQ answer for projects platform"
        id="wrdmxS"
      />
    </p>
  ),
  key: 'code',
  question: (
    <FormattedMessage
      defaultMessage="Will I have to code within the platform, or use my own IDE?"
      description="FAQ question for projects platform"
      id="7fCoNs"
    />
  ),
};

const projectsTimed: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage="We will keep track of when you start the project, for your personal reference on the time you take building it."
        description="FAQ answer for projects platform"
        id="termd9"
      />
    </p>
  ),
  key: 'timed',
  question: (
    <FormattedMessage
      defaultMessage="Will this be a timed challenge?"
      description="FAQ question for projects platform"
      id="fO8U+i"
    />
  ),
};

const projectsStuck: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage="If you're stuck, clarify any doubts within the discussion forums in Step 3's. If you need answers urgently for a critical issue, email as at <link>support@greatfrontend.com</link>."
        description="FAQ answer for projects platform"
        id="fxfae3"
        values={{
          link: (chunks) => (
            <Anchor href="mailto:support@greatfrontend.com">{chunks}</Anchor>
          ),
        }}
      />
    </p>
  ),
  key: 'stuck',
  question: (
    <FormattedMessage
      defaultMessage="What if I get stuck in a challenge?"
      description="FAQ question for projects platform"
      id="ez3Cqu"
    />
  ),
};

const projectsGuidance: FAQItem = {
  answer: (
    <div>
      <p>
        <FormattedMessage
          defaultMessage="We offer a few guidance options"
          description="FAQ answer for projects platform"
          id="0K1Xot"
        />
      </p>
      <ul className="list-outside list-decimal">
        <li>
          <FormattedMessage
            defaultMessage="Basic general development guides, such as how to download and use an IDE, how to use tools like GitHub and Figma."
            description="FAQ answer for projects platform"
            id="2eIa8j"
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Curated, external resources that could be helpful."
            description="FAQ answer for projects platform"
            id="rUiB1g"
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Official solutions from senior engineers, possibly using different stacks."
            description="FAQ answer for projects platform"
            id="LF10F3"
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Step-by-step guides on how to approach the challenge."
            description="FAQ answer for projects platform"
            id="E63Iix"
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Recommended user submissions you can reference."
            description="FAQ answer for projects platform"
            id="ELcn8L"
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="A forum where you can clarify doubts."
            description="FAQ answer for projects platform"
            id="I9lFwb"
          />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Deployment and submission checklist and guide."
            description="FAQ answer for projects platform"
            id="hbgKC2"
          />
        </li>
      </ul>
    </div>
  ),
  key: 'guidance',
  question: (
    <FormattedMessage
      defaultMessage="What kind of guidance will this platform provide me?"
      description="FAQ question for projects platform"
      id="eucnNd"
    />
  ),
};

const projectsDoneCoding: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage="Once you're done, host your project with <tooltip>our recommended hosts</tooltip> and submit your project URL for code reviews."
        description="FAQ answer for projects platform"
        id="5gYLMr"
        values={{
          tooltip: (chunks) => (
            <Tooltip
              label={
                <div>
                  <FormattedMessage
                    defaultMessage="There are many ways to host your site. Our recommended hosts are:"
                    description="Description for recommended hosts in project challenge FAQs"
                    id="cvjpKx"
                  />
                  <Prose textSize="sm">
                    <ul>
                      <li>
                        <Anchor href="https://docs.github.com/en/pages/quickstart">
                          GitHub Pages
                        </Anchor>
                      </li>
                      <li>
                        <Anchor href="https://vercel.com/docs/getting-started-with-vercel/projects-deployments">
                          Vercel
                        </Anchor>
                      </li>
                      <li>
                        <Anchor href="https://docs.netlify.com/get-started/">
                          Netlify
                        </Anchor>
                      </li>
                    </ul>
                  </Prose>
                </div>
              }>
              <Text className="items-center" color="active" size="body1">
                {chunks}
              </Text>
            </Tooltip>
          ),
        }}
      />
    </p>
  ),
  key: 'done-coding',
  question: (
    <FormattedMessage
      defaultMessage="What do I do once I'm done coding?"
      description="FAQ question for projects platform"
      id="zGTH+Q"
    />
  ),
};

const projectsStop: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage='Yes. Every challenge you start creates a "session" of the challenge, which you can end. You can start a new session anytime.'
        description="FAQ answer for projects platform"
        id="ZfPNnW"
      />
    </p>
  ),
  key: 'stop',
  question: (
    <FormattedMessage
      defaultMessage="Can I stop a challenge once I start it?"
      description="FAQ question for projects platform"
      id="PeCsAb"
    />
  ),
};

const projectsSkills: FAQItem = {
  answer: (
    <div>
      <p>
        <FormattedMessage
          defaultMessage="Yes of course! You are encouraged to use your own customized stack to build the challenges and share your implementation and approach."
          description="FAQ answer for projects platform"
          id="56Mzxg"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="You will be able to modify the skills and tech stack used once you start the project."
          description="FAQ answer for projects platform"
          id="bJ3A5y"
        />
      </p>
    </div>
  ),
  key: 'skills',
  question: (
    <FormattedMessage
      defaultMessage="I want to use React for this challenge, but it's not listed as one of the skills. Can I still use it?"
      description="FAQ question for projects platform"
      id="WiZAwx"
    />
  ),
};

export const projectsFAQs: FAQItems = [
  projectsPreparation,
  projectsCode,
  projectsTimed,
  projectsStuck,
  projectsGuidance,
  projectsDoneCoding,
  projectsStop,
  projectsSkills,
];
