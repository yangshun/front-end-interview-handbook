import type { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export type Testimonial = Readonly<{
  authorThumbnailUrl?: string;
  authorUrl?: string;
  id: string;
  location: string;
  name?: string;
  testimonial: ReactNode;
  title?: string;
}>;

export function useTestimonials() {
  const intl = useIntl();
  const luke = {
    authorThumbnailUrl: '/img/testimonials/luke-fiji.jpg',
    authorUrl: 'https://www.linkedin.com/in/lukefiji/',
    id: 'luke-fiji',
    location: intl.formatMessage({
      defaultMessage: 'Seattle, WA, USA',
      description: 'Seattle in USA',
      id: 'AJSVim',
    }),
    name: 'Luke Fiji',
    testimonial: (
      <FormattedMessage
        defaultMessage="I'm always on the lookout for resources that can help me level up my skills as a frontend engineer, and I can confidently say that GreatFrontEnd delivers in that regard. It is by far the most comprehensive frontend-focused interview prep platform I have come across. They've helped strengthen my fundamentals and given me the confidence I need to succeed in my job search. Additionally, the people behind the platform have been incredibly approachable and responsive to feedback - and I can't thank them enough!"
        description="Luke Fiji's testimonial"
        id="OQHvfy"
      />
    ),
  };
  const alan = {
    id: 'alan',
    location: 'Mountain View, CA, USA',
    name: 'Alan',
    testimonial:
      "Just want to say THANK YOU! I was laid off from Google and my interviews were really different from previous interview cycles in that they tested heavy frontend knowledge as opposed to typical LeetCode like I was used to. This platform provided a comprehensive way for me to study all the basics and really solidify my frontend fundamentals. I found the system design questions especially helpful, as I wasn't able to find any other front end system design resources anywhere near the quality provided on this platform. I was able to land a front end engineering role at TikTok thanks in huge part to this platform. I am really glad I decided to pay for this platform.",
    title: 'Software Engineer, TikTok',
  };
  const larry = {
    authorThumbnailUrl: '/img/testimonials/larry-almeida.jpg',
    authorUrl: 'https://www.linkedin.com/in/larrydalmeida/',
    id: 'larry-almedia',
    location: intl.formatMessage({
      defaultMessage: 'Zalando, Berlin, Germany',
      description: "Larry Almeida's location",
      id: 'p0uvxa',
    }),
    name: 'Larry Almeida',
    testimonial: (
      <>
        <FormattedMessage
          defaultMessage="I could have spent my time scouring the internet for resources.
          Instead I choose to invest my money wisely. GreatFrontEnd turned out
          to be a fantastic resource with its curated Study Plans, interactive
          Practice Questions and Guides that cover all your typical big tech
          interview needs. Their quiz questions helped me to recap my knowledge
          on the days before my interview. I especially appreciated the System
          Design Guide with solutions that cover a range of front end design
          problems along with frameworks that are easy to remember and apply to
          any problem type."
          description="Larry Almeida's testimonial"
          id="nJYzIr"
        />
        <br />
        <br />
        <FormattedMessage
          defaultMessage="I got the job and a great ROI!"
          description="Larry Almeida's testimonial"
          id="kHB06P"
        />
      </>
    ),
    title: intl.formatMessage({
      defaultMessage: 'Senior Software Engineer — Front End',
      description: "Larry Almeida's job title",
      id: 'nwtLb2',
    }),
  };
  const nafis = {
    authorThumbnailUrl: '/img/testimonials/nafis-hasnain.jpg',
    authorUrl: 'https://www.linkedin.com/in/nhasnain/',
    id: 'nafis-hasnain',
    location: intl.formatMessage({
      defaultMessage: 'Ontario, Canada',
      description: "Nafis Hasnain's location",
      id: '2Zjh+z',
    }),
    name: 'Nafis Hasnain',
    testimonial: (
      <FormattedMessage
        defaultMessage="GreatFrontEnd has really helped prepare me for many of my frontend internship interviews - their front end system design guidebook is stellar and it helped boost my confidence to write front end components faster during time paced interviews. Thank you, GFE!"
        description="Nafis Hasnain's testimonial"
        id="fYyYBk"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Software Developer Intern, Vidyard',
      description: "Nafis Hasnain's job title",
      id: 'qyEq1P',
    }),
  };
  const delhi = {
    id: 'delhi',
    location: intl.formatMessage({
      defaultMessage: 'Delhi, India',
      description: "Anonymous Front End Engineer's location",
      id: 'cicVHX',
    }),
    testimonial: (
      <FormattedMessage
        defaultMessage="As someone who has given as well as taken a lot of interviews, I can say GreatFrontEnd is a f'king goldmine. I would highly recommend GreatFrontEnd to anyone who is preparing for front end interviews or anyone who just wants to learn some new concepts. The content is well-organized, has some great practical coding challenges, and the system design part is just amazing!!!"
        description="Anonymous Front End Engineer's testimonial"
        id="fSn4nv"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Front End Engineer',
      description: "Anonymous Front End Engineer's job title",
      id: 'lztLqo',
    }),
  };
  const jacky = {
    authorThumbnailUrl: '/img/testimonials/jacky-liang.jpg',
    authorUrl: 'https://www.linkedin.com/in/mrjackyliang/',
    id: 'jacky-liang',
    location: intl.formatMessage({
      defaultMessage: 'New York, NY, USA',
      description: "Jacky Liang's location",
      id: 'iLr1LJ',
    }),
    name: 'Jacky Liang',
    testimonial: (
      <FormattedMessage
        defaultMessage="If you are a developer or engineer looking to excel in the front-end world, GreatFrontEnd is an excellent resource to have. It's very common to practice LeetCode style questions in the world of engineering, but rarely does anyone talk about system designs and behavioral questions. This is one of the biggest reasons why I joined! It's challenging, fun, and there's also a community that looks out for you!"
        description="Jacky Liang's testimonial"
        id="WWRfWH"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Software Engineer',
      description: "Jacky Liang's job title",
      id: 'LAWtL6',
    }),
  };
  const anand = {
    authorUrl: 'https://www.linkedin.com/in/ananddharne/',
    id: 'anand-dharne',
    location: intl.formatMessage({
      defaultMessage: 'USA',
      description: "Anand Dharne's location",
      id: 'p42Bxa',
    }),
    name: 'Anand Dharne',
    testimonial: (
      <FormattedMessage
        defaultMessage="GreatFrontEnd has been a great help to me for prepping front end
          focussed interviews. Lot of focus on JavaScript utility and
          React/Vanilla implementations. The system design questions asked in
          interviews are slightly different in front end interviews and
          GreatFrontEnd really shines here. I will continue to use this amazing
          platform!"
        description="Anand Dharne's testimonial"
        id="3iv+7q"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Software Engineer — Front End, Perch',
      description: "Anand Dharne's job title",
      id: 'jLTDtP',
    }),
  };
  const vietnam = {
    id: 'vietnam',
    location: intl.formatMessage({
      defaultMessage: 'Vietnam',
      description: 'Vietnam country',
      id: 'v4Ssos',
    }),
    testimonial: (
      <FormattedMessage
        defaultMessage="You are doing great things for the Front End community. Especially for those who are Junior engineers like me, advanced solutions covering various aspects of front end development help a lot. Thank you to the team."
        description="Anonymous Software Engineer's testimonial"
        id="3HUfI+"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Software Engineer',
      description: "Anonymous Software Engineer's job title",
      id: 'gwrYNC',
    }),
  };
  const ryan = {
    authorThumbnailUrl: '/img/testimonials/ryanlvv.jpg',
    authorUrl: 'https://www.linkedin.com/in/ryanlvv/',
    id: 'ryanlvv',
    location: intl.formatMessage({
      defaultMessage: 'Seattle, WA, USA',
      description: 'Seattle location',
      id: 'l+OESW',
    }),
    name: 'Ryan Van Valkenburg',
    testimonial: (
      <FormattedMessage
        defaultMessage="GreatFrontEnd has been a great resource for preparing and continuing
          in the ever-shifting front-end world. Allowing me to brush up on
          fundamentals, hone new concepts and practices to put my best foot
          forward in technical ability and confidence to be able to get
          interviews AND offers."
        description="Ryan Van Valkenburg's testimonial"
        id="bGwCko"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Senior Software Engineer',
      description: "Ryan Van Valkenburg's job title",
      id: 'Tvr6Mn',
    }),
  };
  const prashanth = {
    authorThumbnailUrl: '/img/testimonials/prashanth-reddy.jpg',
    authorUrl: 'https://www.linkedin.com/in/prshnthrddy/',
    id: 'prashanth-reddy',
    location: intl.formatMessage({
      defaultMessage: 'Toronto, Canada',
      description: "Prashanth Reddy's location",
      id: '+IQinv',
    }),
    name: 'Prashanth Reddy',
    testimonial: (
      <FormattedMessage
        defaultMessage="As a Frontend Engineer I had a hard time finding resources that focused specifically on Frontend interview questions, Data Structures & Algorithms etc., After I found GreatFrontEnd it made my life very easy because I found answers to all my questions. The program and questions are structured and categorized meticulously. If you are looking to improve your frontend interview skills I highly recommend their premium feature as it gives you access to not only data structures & algo questions but also front end system design questions with detailed answers. Not only that, they also have a vibrant and helpful Discord community. It's totally worth it."
        description="Prashanth Reddy's testimonial"
        id="U3qfpb"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Senior Software Engineer — Front End, UserTesting',
      description: "Prashanth Reddy's job title",
      id: 'usTItb',
    }),
  };
  const gouse = {
    authorUrl: 'https://www.linkedin.com/in/gouse-basha-7a0902191/',
    id: 'gouse-basha',
    location: intl.formatMessage({
      defaultMessage: 'Chennai, India',
      description: 'Chennai in India',
      id: 'd7gVP2',
    }),
    name: 'Gouse Basha',
    testimonial: (
      <FormattedMessage
        defaultMessage="If you are looking for front end interviews, GreatFrontEnd is for you. It has a wide variety of coding questions ranging from HTML, CSS, JavaScript, to React. It also covers formats like functions, algorithms, user interface, quiz etc. If you want to get into top tech companies for front end roles, GreatFrontEnd is best for you."
        description="Gouse Basha's testimonial"
        id="DCBQiM"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Software Engineer',
      description: "Gouse Basha's job title",
      id: 'obU6+a',
    }),
  };
  const india = {
    id: 'india',
    location: intl.formatMessage({
      defaultMessage: 'India',
      description: 'India country',
      id: 'UXNTcT',
    }),
    testimonial: (
      <FormattedMessage
        defaultMessage="Amazing to see such a comprehensive resource for front end dev interviews. Coming from a more traditional backend role I found this website to be a treasure trove of knowledge and it really takes you from a beginner to advanced level."
        description="Anonymous Front End Engineer's testimonial"
        id="q4xRCW"
      />
    ),
    title: intl.formatMessage({
      defaultMessage: 'Front End Engineer',
      description: "Anonymous Front End Engineer's job title",
      id: 'lztLqo',
    }),
  };
  const zhenchao = {
    id: 'zhenchao',
    location: 'USA',
    name: 'Zhenchao',
    testimonial:
      'I wish GreatFrontEnd existed earlier in my career when I was preparing for interviews. It has made the process of interview preparation significantly less painful and more efficient. The platform is a game-changer for anyone seeking to enhance their frontend development skills and succeed in interviews.',
    title: 'Software Engineer',
  };

  return {
    alan,
    anand,
    delhi,
    gouse,
    india,
    jacky,
    larry,
    luke,
    nafis,
    prashanth,
    ryan,
    vietnam,
    zhenchao,
  };
}
