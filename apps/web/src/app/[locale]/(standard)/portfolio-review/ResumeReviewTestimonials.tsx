'use client';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';

const testimonials = [
  {
    id: 'chaitanya',
    location: <>Dubai, United Arab Emirates</>,
    logo: (
      <img
        alt="BharatX logo mark"
        className="size-8 flex-none rounded-full object-cover"
        src="/img/company-logos/bharatx-logomark.png"
      />
    ),
    name: (
      <Anchor href="https://www.linkedin.com/in/chaitannah/">
        Chaitanya Mittal
      </Anchor>
    ),
    quote: (
      <FormattedMessage
        defaultMessage="GFE helped me take my resume from good to great. Improvements that could
        make the difference between a shortlist or otherwise were brought to my
        notice. The thing I loved the most, was the active effort they took to
        understand my professional experience and goals and tailor my resume
        accordingly. Highly recommended."
        description="Testimonial from a user for resume review"
        id="sOuiCb"
      />
    ),
    title: <>Now Software Engineer Intern at BharatX</>,
  },
  {
    id: 'bryant-chan',
    location: <>Auckland, New Zealand</>,
    logo: (
      <img
        alt="Koda Web logo mark"
        className="size-8 flex-none rounded-full object-cover"
        src="/img/company-logos/kodaweb-logomark.jpeg"
      />
    ),
    name: (
      <Anchor href="https://www.linkedin.com/in/bryantandk/">
        Bryant Chan
      </Anchor>
    ),
    quote: (
      <FormattedMessage
        defaultMessage="I learnt a lot while revising my resume and I now have a more explicit
        goal for my career and what I should do to get there. I will recommend
        this service to my friends!"
        description="Testimonial from a user for resume review"
        id="M1DMl/"
      />
    ),
    title: <>Now Senior Front End Engineer at Koda Web</>,
  },
  {
    id: 'dallas-tx',
    location: <>Dallas, Texas</>,
    logo: (
      <img
        alt="Microsoft logo mark"
        className="size-8 flex-none rounded-full object-cover"
        src="/img/company-logos/microsoft-logomark.svg"
      />
    ),
    quote: (
      <FormattedMessage
        defaultMessage="I enjoyed working with GFE to give my resume the boost it desperately
        needed. Through the process, I learned what makes a resume stand out
        when targeting FAANG companies, which was very helpful. I was very
        impressed with how thorough the review was and how they even gave me
        some advice to make my resume much stronger. As an aspiring Android
        Engineer, it was great to have those tips on how to improve my skills
        through side projects. GFE does more than just resume review, they
        really care about your career growth and development!"
        description="Testimonial from a user for resume review"
        id="UX9+m9"
      />
    ),
    title: <>Now Software Engineer at Microsoft</>,
  },
  {
    id: 'sunnyvale-ca',
    location: <>Sunnyvale, California</>,
    logo: (
      <img
        alt="Amazon logo mark"
        className="size-8 flex-none rounded-full object-cover"
        src="/img/company-logos/amazon-logomark.svg"
      />
    ),
    quote: (
      <FormattedMessage
        defaultMessage="GFE clarified a lot of misconceptions I had about the internship search
        & hiring process. They also provided invaluable insights of what FAANG
        hiring managers look for when considering promising candidates. Their
        rapid response times, combined with their concise answers, helped me
        perfect my resume in mere days and land a SDE internship at <strong>Amazon</strong>. Their service certainly
        stands out among the rest!"
        description="Testimonial from a user for resume review"
        id="r0nKuy"
        values={{
          strong: (chunks) => <strong className="font-medium">{chunks}</strong>,
        }}
      />
    ),
    title: <>Now Software Engineer Intern at Amazon</>,
  },
  {
    id: 'cerritos-ca',
    location: <>Cerritos, California</>,
    logo: (
      <img
        alt="Meta logo mark"
        className="size-8 flex-none rounded-full object-cover"
        src="/img/company-logos/meta-logomark.png"
      />
    ),
    quote: (
      <FormattedMessage
        defaultMessage="This service was super helpful and well worth the investment! Not only
        did GFE help me address glaring issues with my old resume, but they also
        gave me comprehensive suggestions on how to improve my overall profile
        and land more FAANG interviews. My application-to-interview rate has
        never been higher!"
        description="Testimonial from a user for resume review"
        id="B7ai7F"
      />
    ),
    title: <>Now Software Engineer at Meta</>,
  },
  {
    id: 'san-diego-ca',
    location: <>San Diego, California</>,
    logo: (
      <img
        alt="Credit Karma logo mark"
        className="size-8 flex-none rounded-full object-cover"
        src="/img/company-logos/creditkarma-logomark.png"
      />
    ),
    quote: (
      <FormattedMessage
        defaultMessage="This service was instrumental in improving my resume to better highlight
        my significant work experience. It has come a long way from my previous
        version. The reviewer was very friendly and helpful from the moment we
        first started communicating and even gave valuable career advice on
        Software Engineering. In short, I recommend the service. Thanks for your
        help, GFE!"
        description="Testimonial from a user for resume review"
        id="yf8eww"
      />
    ),
    title: <>Now Senior Software Engineer at Credit Karma</>,
  },
  {
    id: 'london-uk',
    location: <>London, UK</>,
    logo: (
      <img
        alt="JPMorgan logo mark"
        className="size-8 flex-none rounded-full object-cover"
        src="/img/company-logos/jpmorgan-logomark.jpg"
      />
    ),
    quote: (
      <FormattedMessage
        defaultMessage="GFE made my resume a lot clearer and more detailed, they also explained the ideas behind each section of my resume. Prompt revision, excellent service, super worthy!"
        description="Testimonial from a user for resume review"
        id="lcCybI"
      />
    ),
    title: <>Now Software Engineer Intern at JPMorgan Chase & Co</>,
  },
  {
    id: 'toronto-ca',
    location: <>Toronto, Canada</>,
    quote: (
      <FormattedMessage
        defaultMessage="GFE transformed my previously lacklustre resume into a well-structured
        one with impactful skill showcases. His tailored advice, practical
        strategies and tips, brought a new level of appeal to my resume. I've
        learned a lot from their approach to resume review, and I believe it
        will continue to benefit me in my future job search."
        description="Testimonial from a user for resume review"
        id="Hz9Ok0"
      />
    ),
    title: <>Software Engineer Intern</>,
  },
];

export default function ResumeReviewTestimonials() {
  const intl = useIntl();

  return (
    <div className="bg-neutral-950 py-16 lg:py-24 xl:py-32">
      <Container width="marketing">
        <p className="text-brand pb-6 text-base font-semibold leading-7">
          {intl.formatMessage({
            defaultMessage: 'Testimonials',
            description: 'Label for testimonials for the resume review page',
            id: '+78w2N',
          })}
        </p>
        <h2 className="mt-1 text-3xl font-bold text-white sm:text-4xl sm:leading-none sm:tracking-tight">
          {intl.formatMessage({
            defaultMessage: 'Hear from our users',
            description:
              'Section title for testimonials for resume review page',
            id: 'NEEHt6',
          })}
        </h2>
        <div className="mt-16 space-y-16 md:grid-cols-2 lg:grid lg:gap-x-12 lg:gap-y-16 lg:space-y-0">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className="sm:flex lg:block">
              <svg
                aria-hidden="true"
                className="shrink-0 text-neutral-300"
                height={18}
                viewBox="0 0 24 18"
                width={24}
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-4 space-y-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                <p className="text-lg text-neutral-300">{testimonial.quote}</p>
                <div className="flex gap-x-4">
                  {testimonial.logo}
                  <div className="flex flex-col gap-y-1 text-sm">
                    {testimonial.name && (
                      <div className="text-base font-semibold">
                        {testimonial.name}
                      </div>
                    )}
                    <div>
                      <span className="block not-italic text-neutral-400">
                        {testimonial.title}
                      </span>
                      <p className="text-neutral-400">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </Container>
    </div>
  );
}
