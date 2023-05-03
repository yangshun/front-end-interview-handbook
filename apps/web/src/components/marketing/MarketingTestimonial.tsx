import type { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Testimonial = Readonly<{
  authorThumbnailUrl?: string;
  authorUrl?: string;
  key: string;
  name?: string;
  testimonial: ReactNode;
  title: string;
}>;

function useTestimonials() {
  const intl = useIntl();
  const TESTIMONIALS: ReadonlyArray<Testimonial> = [
    {
      authorThumbnailUrl: '/img/testimonials/larry.jpg',
      authorUrl: 'https://www.linkedin.com/in/larrydalmeida/',
      key: 'larry',
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
            id="s0GXXm"
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
        defaultMessage:
          'Senior Software Engineer — Front End, Zalando, Berlin, Germany',
        description: "Larry Almeida's job title",
        id: 'mVXHy8',
      }),
    },
    {
      key: 'india',
      testimonial: (
        <FormattedMessage
          defaultMessage="Amazing to see such a comprehensive resource for front end dev interviews. Coming from a more traditional backend role I found this website to be a treasure trove of knowledge and it really takes you from a beginner to advanced level."
          description="Anonymous Front End Engineer's testimonial"
          id="q4xRCW"
        />
      ),
      title: intl.formatMessage({
        defaultMessage: 'Front End Engineer, India',
        description: "Anonymous Front End Engineer's job title",
        id: 'B7d1jK',
      }),
    },
    {
      authorUrl: 'https://www.linkedin.com/in/ananddharne/',
      key: 'anand',
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
        defaultMessage: 'Software Engineer — Front End, Perch, USA',
        description: "Anand Dharne's job title",
        id: 'ZpZ8tp',
      }),
    },

    {
      key: 'delhi',
      testimonial: (
        <FormattedMessage
          defaultMessage="As someone who has given as well as taken a lot of interviews, I can say GreatFrontEnd is a f'king goldmine. I would highly recommend GreatFrontEnd to anyone who is preparing for front end interviews or anyone who just wants to learn some new concepts. The content is well-organized, has some great practical coding challenges, and the system design part is just amazing!!!"
          description="Anonymous Front End Engineer's testimonial"
          id="fSn4nv"
        />
      ),
      title: intl.formatMessage({
        defaultMessage: 'Front End Engineer, Delhi, India',
        description: "Anonymous Front End Engineer's job title",
        id: 'SO8lrv',
      }),
    },
    {
      authorThumbnailUrl: '/img/testimonials/ryanlvv.jpg',
      authorUrl: 'https://www.linkedin.com/in/ryanlvv/',
      key: 'ryanlvv',
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
        defaultMessage: 'Senior Software Engineer, Seattle, WA, USA',
        description: "Ryan Van Valkenburg's job title",
        id: 'Vqt5YP',
      }),
    },
    {
      authorUrl: 'https://www.linkedin.com/in/gouse-basha-7a0902191/',
      key: 'india-2',
      name: 'Gouse Basha',
      testimonial: (
        <FormattedMessage
          defaultMessage="If you are looking for front end interviews, GreatFrontEnd is for you. It has a wide variety of coding questions ranging from HTML, CSS, JavaScript, to React. It also covers formats like functions, algorithms, user interface, quiz etc. If you want to get into top tech companies for front end roles, GreatFrontEnd is best for you."
          description="Gouse Basha's testimonial"
          id="DCBQiM"
        />
      ),
      title: intl.formatMessage({
        defaultMessage: 'Software Engineer, Chennai, India',
        description: "Gouse Basha's job title",
        id: '+7Wuw5',
      }),
    },
    {
      key: 'vietnam',
      testimonial: (
        <FormattedMessage
          defaultMessage="You are doing great things for the Front End community. Especially for those who are Junior engineers like me, advanced solutions covering various aspects of front end development help a lot. Thank you to the team."
          description="Anonymous Software Engineer's testimonial"
          id="3HUfI+"
        />
      ),
      title: intl.formatMessage({
        defaultMessage: 'Software Engineer, Vietnam',
        description: "Anonymous Software Engineer's job title",
        id: 'd1vCxb',
      }),
    },
  ];

  return TESTIMONIALS;
}

export default function MarketingTestimonial() {
  const testimonials = useTestimonials();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Heading className="sr-only">Testimonials</Heading>
          <p className="text-center text-3xl font-bold leading-8 tracking-tight text-slate-900 sm:text-4xl md:text-4xl lg:text-5xl">
            <FormattedMessage
              defaultMessage="We have helped thousands of Software Engineers"
              description="Testimonial section subtitle"
              id="mST7/q"
            />
          </p>
        </div>
        <Section>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="pt-6 sm:inline-block sm:w-full sm:px-3">
                  <figure className="rounded-2xl border border-slate-200 p-6 text-sm leading-6">
                    <blockquote className="text-slate-900">
                      {testimonial.testimonial}
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-x-4">
                      {testimonial.authorThumbnailUrl && (
                        <img
                          alt=""
                          className="h-10 w-10 rounded-full bg-slate-50"
                          src={testimonial.authorThumbnailUrl}
                        />
                      )}
                      <div>
                        {testimonial.name &&
                          (() => {
                            const nameEl = (
                              <span className="font-semibold text-slate-900">
                                {testimonial.name}
                              </span>
                            );

                            if (testimonial.authorUrl) {
                              return (
                                <Anchor href={testimonial.authorUrl}>
                                  {nameEl}
                                </Anchor>
                              );
                            }

                            return nameEl;
                          })()}
                        <div className="text-xs text-slate-600">
                          {testimonial.title}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
