const steps = [
  {
    imageUrl: '/img/affiliate/share_link.svg',
    status: 'complete',
    subtitle:
      'Apply to our affiliate program and obtain your unique affiliate link upon acceptance.',
    title: 'Generate your links',
  },
  {
    imageUrl: '/img/affiliate/social_influence.svg',
    status: 'complete',
    subtitle:
      'Share about GreatFrontEnd on your social media, YouTube channel, blog, etc., using your affiliate links.',
    title: 'Share our offerings',
  },
  {
    imageUrl: '/img/affiliate/get_remunerated.svg',
    status: 'complete',
    subtitle: (
      <>
        A unique browser cookie will be created when users use your link to
        access our site which attributes any of their purchases to you. If they
        purchase within 7 days, we pay you{' '}
        <strong className="font-medium">15%</strong> of their first order.
      </>
    ),
    title: 'Get remunerated',
  },
];

export default function MarketingAffiliateSteps() {
  return (
    <div aria-label="Steps">
      <ol
        className="grid grow grid-cols-1 content-start gap-8 align-top md:grid-cols-3 md:gap-12"
        role="list">
        {steps.map((step, stepIdx) => (
          <li key={step.title} className="flex flex-col md:col-span-1">
            <div className="flex items-center">
              <div className="bg-brand-600 hover:bg-brand-900 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl text-white">
                <p>{stepIdx + 1}</p>
              </div>
              <div className="py-4 pl-4 text-2xl font-medium md:text-xl">
                {step.title}
              </div>
            </div>
            <div className="flex grow flex-col pt-2">
              <p className="grow text-xl text-neutral-500 md:text-lg">
                {step.subtitle}
              </p>
              <div className="mt-12 flex grow">
                <img
                  alt={step.title}
                  className="m-auto block h-48"
                  src={step.imageUrl}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
