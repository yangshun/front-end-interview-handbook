import { FormattedMessage } from '~/components/intl';

import type { FAQItem } from './FAQs';

export const projectPricingModel: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="Our platform is <strong>primarily free</strong>, allowing users to
        access a large selection of project challenges without the need to
        subscribe. You'd be able to <strong>start building immediately</strong> - we provide everything from production-ready product specs written by
        product managers, designs by high-end designers and API specs for each
        project. You'll also get support from our community, where you can
        discuss project approaches, see how others have built similar projects,
        and get feedback on your code to help you improve."
          description="Answer to 'Is GreatFrontEnd Projects free?' on projects FAQs"
          id="0g+OQ+"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Premium provides additional benefits for <strong>serious learners and builders</strong>. This includes access to underlying Figma files, official guides and solutions, as well as complete access to all nodes on our skill roadmap and all available component tracks."
          description="Answer to 'Is GreatFrontEnd Projects free?' on projects FAQs"
          id="sF+kBL"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </p>
    </>
  ),
  key: 'projects-pricing-model',
  question: (
    <FormattedMessage
      defaultMessage="Is GreatFrontEnd Projects free?"
      description="Question on projects FAQ section - on the pricing model of GreatFrontEnd Projects"
      id="+jq6fA"
    />
  ),
};

export const projectsOffering: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="GreatFrontEnd projects is a platform where you can build real-world
        projects to learn and showcase in your portfolio. You'd be able to start
        <strong> building immediately</strong> - we provide everything from
        production-ready product specs written by product managers, designs by
        high-end designers and API specs for each project."
          description="Answer to 'What does GreatFrontEnd Projects offer?' on projects FAQs"
          id="+Awm01"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage=" For learners, GreatFrontEnd projects allows you to learn front end
        development through <strong>actively constructing real-world projects</strong> instead of
        being stuck in tutorial hell. As you take on each challenge, you'll have
        access to comprehensive <strong>guides, solutions, user-generated references, and community forums</strong>
        , all designed to facilitate your learning and professional growth.
        Additionally, we provide a <strong>structured skills roadmap</strong> that outlines the specific projects to complete to learn core front end
        skills from beginner to advanced proficiency."
          description="Answer to 'What does GreatFrontEnd Projects offer?' on projects FAQs"
          id="PgdEdE"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="For developers seeking to build their portfolios or embark on side
        projects, our platform allows you to build stunning portfolio projects
        that were <strong>professionally designed by high-end designers</strong>
        . Design is hard - and you'd be able to focus solely on the technical
        execution. Furthermore, unlike other challenge platforms, you'd be able
        to easily construct <strong>personalized portfolio projects</strong> instead of building the same thing as everyone else. Each project within
        our platform is made up of reusable components which adhere to the same
        design system, making them inherently modular and compatible with one
        another. This means you can seamlessly combine components from various
        projects to construct unique and customized applications for your
        portfolio. These components cover a diverse range of applications,
        including Marketing, E-Commerce, Web Apps, Games, and even Portfolios,
        which means you'd be able to compose a wide variety of apps from them."
          description="Answer to 'What does GreatFrontEnd Projects offer?' on projects FAQs"
          id="YitCY3"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Additionally, we offer Component Tracks, which are collections of
        projects that form component libraries or design systems. This can leave
        a strong impression on potential employers and recruiters, <strong>showcasing your expertise and versatility</strong> in building a
        variety of components for common use cases, which is much more
        impressive than building individual projects."
          description="Answer to 'What does GreatFrontEnd Projects offer?' on projects FAQs"
          id="QBDWkR"
          values={{
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </p>
    </>
  ),
  key: 'project-offering',
  question: (
    <FormattedMessage
      defaultMessage="What does GreatFrontEnd Projects offer?"
      description="Question on projects FAQ section - on the offerings of GreatFrontEnd Projects"
      id="K0yqDh"
    />
  ),
};

export const projectsUnique: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="GreatFrontEnd Projects has a unique feature set which stands out in
        important ways"
          description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
          id="N1DHSj"
        />
        :
      </p>
      <ol>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Every project is modular and reusable"
              description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
              id="MMFfyO"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="Unlike other platforms where every challenge is one-off and has a
          different look and feel, all our challenges are constructed out of the
          same design system. This means that you'd never have to waste time
          building one-off challenges - every challenge that you build adds to
          your permanent repertoire of professionally designed, reusable
          components, which you can compose into your future projects. Moreover,
          our components cover a wide variety of the most important uses like
          marketing, e-commerce, and web apps. For portfolio builders, this is
          important as you can use these professionally designed components to
          build a unique app for your portfolio, instead of building the same
          thing as everyone else, which is a problem faced on other portfolio
          platforms."
            description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
            id="lG5qGr"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Guidance from big tech senior engineers"
              description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
              id="7++x1w"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="While other platforms might leave you relying solely on community
          feedback, our premium plan provides you with practical development
          guides and solutions written by experienced senior engineers from top
          tech companies. You'll learn best practices and supercharge your
          learning by referencing professionally-written code derived from years
          of experience."
            description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
            id="fHUHPj"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Structured roadmap for learning"
              description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
              id="Z7vm1S"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="We provide a roadmap of all the core skills needed to be a great front
          end engineer, from beginner to advanced. For each skill, we suggest
          good resources for you to study and projects you can build on our
          platform to learn the skill. This roadmap is curated by senior
          engineers with extensive experience in the industry, ensuring the
          quality and trustworthiness of the content."
            description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
            id="/JUzhw"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Build impressive component kits and design systems"
              description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
              id="zpD+zt"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="Component tracks are collections of components which make up component
          libraries for specific practical use cases e.g. Marketing, E-Commerce,
          or even design systems. Building component tracks can leave a strong
          impression on potential employers and recruiters, showcasing your
          expertise and versatility in building a variety of components for
          common use cases, which is much more impressive than building
          individual projects."
            description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
            id="5G8Oxo"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Gamification and progress tracking"
              description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
              id="2FNNVk"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="Our platform includes a gamification system that encourages you to
          track your progress and take on more challenges. This feature
          motivates you to stay engaged and make steady progress in your
          learning journey."
            description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
            id="JslLVT"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Convenient code reviews"
              description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
              id="JNe0+O"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage=" We make code reviews easy by displaying your code directly on our
          platform, eliminating the need for community members to go elsewhere
          to review your work. This convenience encourages more feedback and
          collaboration, which means you can expect to receive more feedback for
          your work."
            description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
            id="PEPK2l"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Free essentials"
              description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
              id="LKWnEZ"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="We believe in providing the basics for free, including multi-page apps
          and breakpoint management. You won't be charged for essential features
          like taking screenshots. Our premium charges only apply to advanced
          features that go beyond the basics."
            description="Answer to 'What is unique about GreatFrontEnd Projects vs other challenge platforms?' on projects FAQs"
            id="TDRxOj"
          />
        </li>
      </ol>
    </>
  ),
  key: 'projects-unique',
  question: (
    <FormattedMessage
      defaultMessage="What is unique about GreatFrontEnd Projects vs other challenge platforms?"
      description="Question on projects FAQ section - on the unique features of GreatFrontEnd Projects"
      id="b8Et6n"
    />
  ),
};

export const worthBuyingProjects: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="With premium, you get access to some of our most valuable resources
        designed to facilitate your learning and development"
          description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
          id="XIZkef"
        />
        :
      </p>
      <ol>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Access to practical development guides and official solutions"
              description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
              id="OIHF83"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="Each guide and solution was written by big tech senior engineers with
          best practices derived from years of experience, allowing you to learn
          techniques and patterns early on in your learning, setting up for a
          strong foundation."
            description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
            id="kTlghR"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Access to professionally designed figma files"
              description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
              id="ctnT/Z"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="Learning how to use design tools like Figma is an important skill for
          any professional front end developer. Moreover, using the design file
          helps you in building a more precise solution using design details
          like font sizes, spacing and colors, eliminating the time that would
          otherwise be spent on guesswork."
            description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
            id="ADlE7s"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Access to the entire skills roadmap"
              description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
              id="qqoId0"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="Without knowing the domain well, it's hard to know which projects you
          should build in order to train different aspects of a skill. Our
          skills roadmap solves that problem by providing a structured roadmap
          of projects to build to train all the core skills required for front
          end engineers, all the way from beginner to advanced. While the free
          plan lets you access only the foundational skills in the skills
          roadmap, you will get full access to all nodes in the skills roadmap
          once you purchase any premium plan. This helps you learn skills
          efficiently without the guesswork."
            description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
            id="85GzkF"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Access to all component tracks"
              description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
              id="Z6PMaJ"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="Our component tracks are a unique feature where each track is a
          collection of projects that form a component library or even design
          system. By building entire component tracks, you showcase your
          abilities and versatility in building a variety of components for
          common use cases, which is much more impressive than building
          individual projects. Moreover, one of our component tracks is a design
          system, which means you get to build the underlying design system
          behind all of the projects on our platform, serving as a good
          foundation for your toolkit of reusable components."
            description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
            id="qpRTv8"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Access to our most impressive projects"
              description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
              id="JjXEfg"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="Some of our most impressive projects were designed to teach you (and
          allow you to showcase) complex and / or modern techniques like full
          stack or artificial intelligence skills. These are the projects you'd
          want to reference when building your portfolio to stand out from the
          crowd of applications."
            description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
            id="HOI3TB"
          />
        </li>
      </ol>
      <p>
        <FormattedMessage
          defaultMessage="With these premium features, you'll save considerable time and effort
        towards building accurate designs and becoming a highly skilled
        front-end developer."
          description="Answer to 'Why is it worth it to buy Premium?' on projects FAQs"
          id="eYWGwB"
        />
      </p>
    </>
  ),
  key: 'worth-buying-projects',
  question: (
    <FormattedMessage
      defaultMessage="Why is it worth it to buy Premium?"
      description="Question on projects FAQ section - on the worthiness of buying Premium"
      id="m7X1Nu"
    />
  ),
};

export const projectsBeginner: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="Absolutely! Our platform is an ideal choice for complete beginners.
        Here's how we support newcomers"
          description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
          id="owD/gH"
        />
        :
      </p>
      <ol>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Beginner-friendly challenges"
              description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
              id="CMq4u3"
            />
          </strong>
          :<br />
          <FormattedMessage
            defaultMessage="We offer a range of starter level challenges that are specifically
          designed for beginners. You can begin with these and gradually
          progress to more advanced challenges as you gain confidence and
          experience."
            description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
            id="g5FqmW"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Structured learning with skills roadmap"
              description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
              id="EM+wT5"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="We also offer a skills roadmap on our platform, which serves as a
          step-by-step guide to acquire all the fundamental skills required for
          front-end development, from the very basics to advanced topics. For
          each skill, it provides you with a list of curated suggested
          resources, as well as a recommended order of projects to build"
            description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
            id="UtyzhD"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Extensive learning resources while building"
              description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
              id="oDrXRD"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="As you embark on each challenge, you'll have access to a wealth of
          resources to support your learning journey. These include detailed
          guides, solutions, references from fellow users, and community forums.
          These resources are carefully curated to assist you in understanding
          and mastering the concepts behind each challenge"
            description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
            id="vxgmoC"
          />
        </li>
        <li>
          <strong>
            <FormattedMessage
              defaultMessage="Feedback and code reviews"
              description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
              id="PRUWqm"
            />
            :
          </strong>
          <br />
          <FormattedMessage
            defaultMessage="After completing a project, you'll have the opportunity to receive
          feedback and code reviews from the community. This feedback is
          invaluable for your growth as it helps you identify areas for
          improvement and refine your coding skills."
            description="Answer to 'I'm a complete beginner. Will this platform be useful for me?' on projects FAQs"
            id="bbW5hi"
          />
        </li>
      </ol>
    </>
  ),
  key: 'projects-beginner',
  question: (
    <FormattedMessage
      defaultMessage="I'm a complete beginner. Will this platform be useful for me?"
      description="Question on projects FAQ section - on the usefulness of the platform for complete beginners"
      id="PepuJK"
    />
  ),
};

export const projectsSenior: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="Certainly! GreatFrontEnd Projects was also designed to accommodate
        experienced developers like you who want to fill skill gaps in modern
        front-end stacks or even branch out into ancillary full-stack or AI
        skills."
          description="Answer to 'I'm a senior engineer trying to learn modern front end stacks. Will this platform be useful?' on projects FAQs"
          id="rA5e0l"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="You can build advanced projects in those skills or use our skills
        roadmap to guide you in picking the right projects to train those
        skills."
          description="Answer to 'I'm a senior engineer trying to learn modern front end stacks. Will this platform be useful?' on projects FAQs"
          id="kjQ3Ap"
        />
      </p>
    </>
  ),
  key: 'projects-senior',
  question: (
    <FormattedMessage
      defaultMessage="I'm a senior engineer trying to learn modern front end stacks. Will this
      platform be useful?"
      description="Question on projects FAQ section - on the usefulness of the platform for senior engineers"
      id="p97qkQ"
    />
  ),
};

export const projectUsefulness: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage="Even if you're not focused on learning a specific skill, our platform has
      plenty to offer. You can use the professionally designed components and
      projects you create to enhance your portfolio or contribute to your side
      projects. It's a valuable resource for building and showcasing your work."
        description="Answer to 'I'm not trying to learn any particular skill. How will this platform be useful to me?' on projects FAQs"
        id="RwXzSa"
      />
    </p>
  ),
  key: 'projects-usefulness',
  question: (
    <FormattedMessage
      defaultMessage="I'm not trying to learn any particular skill. How will this platform be
      useful to me?"
      description="Question on projects FAQ section - on the usefulness of the platform for those not focused on learning a specific skill"
      id="WbuLAv"
    />
  ),
};

export const projectModular: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage='Our projects are "modular," meaning that each project within our platform
      is made up of reusable components which adhere to the same design system,
      making them inherently modular and compatible with one another. This means
      you can seamlessly combine components from various projects to construct
      unique and customized applications for your portfolio.'
        description={`Answer to 'What do you mean when you say your projects are "modular"?' on projects FAQs`}
        id="cvJ+qb"
      />
    </p>
  ),
  key: 'projects-modular',
  question: (
    <FormattedMessage
      defaultMessage='What do you mean when you say your projects are "modular"?'
      description="Question on projects FAQ section - on the modularity of projects"
      id="7vhGuK"
    />
  ),
};

export const projectPortfolio: FAQItem = {
  answer: (
    <p>
      <FormattedMessage
        defaultMessage="Absolutely! We encourage you to showcase the projects you build on our
      platform in your portfolio. It's an excellent way to demonstrate your
      skills to potential employers or clients and highlight the diversity of
      your work."
        description="Answer to 'Can I use the projects I build in my portfolio?' on projects FAQs"
        id="r6ulGL"
      />
    </p>
  ),
  key: 'projects-portfolio',
  question: (
    <FormattedMessage
      defaultMessage="Can I use the projects I build in my portfolio?"
      description="Question on projects FAQ section - on the usage of projects in portfolios"
      id="qdZOmb"
    />
  ),
};

export const projectComponentUsage: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="Indeed, the components you craft on our platform are designed with
        reusability in mind. You're encouraged to integrate them into your
        personal projects. This practice not only simplifies your development
        process but also enhances the quality and sophistication of your
        projects."
          description="Answer to 'Can I use the components I build in my side projects?' on projects FAQs"
          id="JkoTGu"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="However, it's crucial to be aware of certain restrictions specified in
        our terms of service. For instance, our designs should not be employed
        in the creation of templates, content management platforms, or shared
        for external use beyond your own projects. We recommend a thorough
        review of our terms of service to ensure full compliance and prevent any
        inadvertent violations while utilizing our platform."
          description="Answer to 'Can I use the components I build in my side projects?' on projects FAQs"
          id="UoQm4H"
        />
      </p>
    </>
  ),
  key: 'projects-component-usage',
  question: (
    <FormattedMessage
      defaultMessage="Can I use the components I build in my side projects?"
      description="Question on projects FAQ section - on the usage of components in side projects"
      id="napWnv"
    />
  ),
};

export const projectSupport: FAQItem = {
  answer: (
    <>
      <p>
        <FormattedMessage
          defaultMessage="We provide multiple avenues for support. You can join our community
        discussions and forums, where you can seek help from fellow members and
        receive feedback on your work. You can also explore User Submissions
        related to the same challenge to learn from their approaches and code."
          description="Answer to 'How do I get support when I'm stuck on a challenge?' on projects FAQs"
          id="lN1wl5"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="If you prefer real-time communication and interaction, we also have a
        Discord channel available for your convenience. You can engage with the
        community, ask questions, and share your experiences."
          description="Answer to 'How do I get support when I'm stuck on a challenge?' on projects FAQs"
          id="34f5c1"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Additionally, our Premium plan offers priority support, access to
        practical development guides, official solutions, and even
        professionally designed Figma files, all of which can assist you in
        overcoming challenges efficiently."
          description="Answer to 'How do I get support when I'm stuck on a challenge?' on projects FAQs"
          id="IQy519"
        />
      </p>
    </>
  ),
  key: 'projects-support',
  question: (
    <FormattedMessage
      defaultMessage="How do I get support when I'm stuck on a challenge?"
      description="Question on projects FAQ section - on the support available when stuck on a challenge"
      id="NMHMq3"
    />
  ),
};
