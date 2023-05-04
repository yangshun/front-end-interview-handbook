const testimonials = [
  {
    id: 'chaitanya',
    name: (
      <a
        className="text-brand-500 hover:underline"
        href="https://www.linkedin.com/in/chaitannah/"
        rel="noreferrer noopener"
        target="_blank">
        Chaitanya Mittal
      </a>
    ),
    quote: (
      <>
        Yangshun helped me take my resume from good to great. Improvements that
        could make the difference between a shortlist or otherwise were brought
        to my notice. The thing I loved the most, was the active effort he took
        to understand my professional experience and goals and tailor my resume
        accordingly. Highly recommended.
      </>
    ),
    title: <>Software Engineer, Dubai, United Arab Emirates</>,
  },
  {
    id: 'bryant-chan',
    name: (
      <a
        className="text-brand-500 hover:underline"
        href="https://www.linkedin.com/in/bryantandk/"
        rel="noreferrer noopener"
        target="_blank">
        Bryant Chan
      </a>
    ),
    quote: (
      <>
        I learnt a lot while revising my resume and I now have a more explicit
        goal for my career and what I should do to get there. I will recommend
        this service to my friends!
      </>
    ),
    title: <>Front End Engineer, Auckland, New Zealand</>,
  },
  {
    id: 'dallas-tx',
    quote: (
      <>
        I enjoyed working with Yangshun to give my resume the boost it
        desperately needed. Through the process, I learned what makes a resume
        stand out when targeting FAANG companies, which was very helpful. I was
        very impressed with how thorough the review was and how he even gave me
        some advice to make my resume much stronger. As an aspiring Android
        Engineer, it was great to have those tips on how to improve my skills
        through side projects. Yangshun does more than just resume review, he
        really cares about your career growth and development!
      </>
    ),
    title: <>Software Engineer, Dallas, Texas</>,
  },
  {
    id: 'sunnyvale-ca',
    quote: (
      <>
        Yangshun clarified a lot of misconceptions I had about the internship
        search & hiring process. He also provided invaluable insights of what
        FAANG hiring managers look for when considering promising candidates.
        Their rapid response times, combined with their concise answers, helped
        me perfect my resume in mere days and land a SDE internship at{' '}
        <strong>Amazon</strong>. His service certainly stands out among the
        rest!
      </>
    ),
    title: <>Software Engineer Intern, Sunnyvale, California</>,
  },
  {
    id: 'cerritos-ca',
    quote: (
      <>
        This service was super helpful and well worth the investment! Not only
        did Yangshun help me address glaring issues with my old resume, but he
        also gave me comprehensive suggestions on how to improve my overall
        profile and land more FAANG interviews. My application-to-interview rate
        has never been higher!
      </>
    ),
    title: <>Software Engineer, Cerritos, California</>,
  },
  {
    id: 'san-diego-ca',
    quote: (
      <>
        The Resume Review service was instrumental in improving my resume to
        better highlight my significant work experience. It has come a long way
        from my previous version. Yangshun was very friendly and helpful from
        the moment we first started communicating and even gave valuable career
        advice on Software Engineering. In short, I recommend the service.
        Thanks for your help, Yangshun!
      </>
    ),
    title: <>Software Engineer, San Diego, California</>,
  },
  {
    id: 'london-uk',
    quote: (
      <>
        Yangshun made my resume a lot clearer and more detailed, he also
        explained the ideas behind each section of my resume. Prompt revision,
        excellent service, super worthy!
      </>
    ),
    title: <>Software Engineer Intern, London, UK</>,
  },
  {
    id: 'toronto-ca',
    quote: (
      <>
        Yangshun transformed my previously lacklustre resume into a
        well-structured one with impactful skill showcases. His tailored advice,
        practical strategies and tips, brought a new level of appeal to my
        resume. I've learned a lot from their approach to resume review, and I
        believe it will continue to benefit me in my future job search.
      </>
    ),
    title: <>Software Engineer Intern, Toronto, Canada</>,
  },
];

export default function ResumeReviewTestimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <p className="text-brand-500 block text-sm font-semibold sm:text-base lg:text-sm xl:text-base">
          User Reviews
        </p>
        <h2 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl sm:leading-none sm:tracking-tight">
          Hear from satisfied users
        </h2>
        <div className="mt-16 space-y-16 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16 lg:space-y-0">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className="sm:flex lg:block">
              <svg
                aria-hidden="true"
                className="flex-shrink-0 text-slate-300"
                height={18}
                viewBox="0 0 24 18"
                width={24}
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-4 space-y-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                <p className="text-lg text-slate-600">{testimonial.quote}</p>
                <div className="space-y-1">
                  {testimonial.name && (
                    <div className="text-base font-semibold">
                      {testimonial.name}
                    </div>
                  )}
                  <cite className="block not-italic text-slate-900">
                    {testimonial.title}
                  </cite>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
