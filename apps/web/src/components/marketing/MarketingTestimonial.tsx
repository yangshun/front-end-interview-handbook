import type { ReactNode } from 'react';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

type Testimonial = Readonly<{
  authorThumbnailUrl?: string;
  authorUrl?: string;
  name?: string;
  testimonial: ReactNode;
  title: string;
}>;

type TestimonialItem = Readonly<{ key: string; position: 'left' | 'right' }> &
  Testimonial;

const TESTIMONIALS: ReadonlyArray<TestimonialItem> = [
  {
    authorUrl: 'https://www.linkedin.com/in/ananddharne/',
    key: 'anand',
    name: 'Anand Dharne',
    position: 'right',
    testimonial: (
      <>
        GreatFrontEnd has been a great help to me for prepping front end
        focussed interviews. Lot of focus on JavaScript utility and
        React/Vanilla implementations. The system design questions asked in
        interviews are slightly different in front end interviews and
        GreatFrontEnd really shines here. I will continue to use this amazing
        platform!
      </>
    ),
    title: 'Software Engineer — Front End, Perch, USA',
  },
  {
    authorThumbnailUrl: '/img/testimonials/larry.png',
    authorUrl: 'https://www.linkedin.com/in/larrydalmeida/',
    key: 'larry',
    name: 'Larry Almeida',
    position: 'left',
    testimonial: (
      <>
        I got an opportunity to interview for a dream role with a critical
        frontend team of an online retail giant with over 50m customers and &gt;
        5 billion renders per day. A great opportunity to take my career to the
        next level. The problem — I wasn't ready to interview!
        <br />
        <br />I could have spent my time scouring the internet for resources.
        Instead I choose to invest my money wisely. GreatFrontEnd turned out to
        be a fantastic resource with its curated Study Plans, interactive
        Practice Questions and Guides that cover all your typical big tech
        interview needs. Their quiz questions helped me to recap my knowledge on
        the days before my interview. I especially appreciated the System Design
        Guide with solutions that cover a range of front end design problems
        along with frameworks that are easy to remember and apply to any problem
        type.
        <br />
        <br />I got the job and a great ROI!
      </>
    ),
    title: 'Senior Software Engineer — Front End, Zalando, Berlin, Germany',
  },
  {
    key: 'india',
    position: 'right',
    testimonial: (
      <>
        As someone who has given as well as taken a lot of interviews, I can say
        GreatFrontEnd is a f'king goldmine. I would highly recommend
        GreatFrontEnd to anyone who is preparing for front end interviews or
        anyone who just wants to learn some new concepts. The content is
        well-organized, has some great practical coding challenges, and the
        system design part is just amazing!!!
      </>
    ),
    title: 'Front End Engineer, Delhi, India',
  },
  {
    key: 'india',
    position: 'left',
    testimonial: (
      <>
        Amazing to see such a comprehensive resource for front end dev
        interviews. Coming from a more traditional backend role I found this
        website to be a treasure trove of knowledge and it really takes you from
        a beginner to advanced level.
      </>
    ),
    title: 'Front End Engineer, India',
  },
  {
    key: 'vietnam',
    position: 'left',
    testimonial: (
      <>
        You are doing great things for the Front End community. Especially for
        those who are Junior engineers like me, advanced solutions covering
        various aspects of front end development help a lot. Thank you to the
        team.
      </>
    ),
    title: 'Software Engineer, Vietnam',
  },
  {
    authorUrl: 'https://www.linkedin.com/in/gouse-basha-7a0902191/',
    key: 'india-2',
    name: 'Gouse Basha',
    position: 'right',
    testimonial: (
      <>
        If you are looking for front end interviews, GreatFrontEnd is for you.
        It has a wide variety of coding questions ranging from HTML, CSS,
        JavaScript, to React. It also covers formats like functions, algorithms,
        user interface, quiz etc. If you want to get into top tech companies for
        front end roles, GreatFrontEnd is best for you.
      </>
    ),
    title: 'Software Engineer, Chennai, India',
  },
];

function Testimonial({
  authorUrl,
  authorThumbnailUrl,
  name,
  testimonial,
  title,
}: Testimonial) {
  return (
    <blockquote>
      <div className="relative text-base font-medium text-white md:flex-grow md:text-lg">
        <svg
          aria-hidden="true"
          className="text-brand-600 absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform"
          fill="currentColor"
          viewBox="0 0 32 32">
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="relative">{testimonial}</p>
      </div>
      <footer className="mt-4">
        <div className="flex items-start">
          {authorThumbnailUrl && (
            <div className="mr-4 inline-flex flex-shrink-0 rounded-full border-2 border-white">
              <img
                alt={name}
                className="h-12 w-12 rounded-full"
                src={authorThumbnailUrl}
              />
            </div>
          )}
          <div>
            {name &&
              (() => {
                const nameEl = (
                  <span className="text-base font-medium text-white">
                    {name}
                  </span>
                );

                if (authorUrl) {
                  return <Anchor href={authorUrl}>{nameEl}</Anchor>;
                }

                return nameEl;
              })()}
            <div className="text-brand-200 text-base font-medium">{title}</div>
          </div>
        </div>
      </footer>
    </blockquote>
  );
}

export default function MarketingTestimonial() {
  return (
    <section className="bg-brand-700">
      <Heading className="sr-only">Testimonials</Heading>
      <Section>
        <Container variant="narrow">
          <div className="grid grid-cols-1 gap-x-24 gap-y-16 py-16 px-4 md:grid-cols-2 md:py-24 md:px-0">
            <div className="flex flex-col gap-y-16">
              {TESTIMONIALS.filter(({ position }) => position === 'left').map(
                ({ key, ...testimonial }) => (
                  <Testimonial key={key} {...testimonial} />
                ),
              )}
            </div>
            <div className="flex flex-col gap-y-24">
              {TESTIMONIALS.filter(({ position }) => position === 'right').map(
                ({ key, ...testimonial }) => (
                  <Testimonial key={key} {...testimonial} />
                ),
              )}
            </div>
          </div>
        </Container>
      </Section>
    </section>
  );
}
