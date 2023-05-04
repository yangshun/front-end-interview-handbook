import GitHubIcon from '~/components/icons/GitHubIcon';
import LinkedInIcon from '~/components/icons/LinkedInIcon';
import TwitterIcon from '~/components/icons/TwitterIcon';
import Anchor from '~/components/ui/Anchor';

export default function ResumeReviewTeam() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10 pt-12 sm:flex-row">
        <img
          alt=""
          className="h-52 w-52 flex-none rounded-full object-cover"
          src="https://github.com/yangshun.png"
        />
        <div className="max-w-xl flex-auto">
          <p className="text-xl font-semibold leading-8 tracking-tight text-slate-900 md:text-2xl">
            Yangshun Tay
          </p>
          <p className="text-base leading-7 text-slate-500">
            Ex-Meta Staff Front End Engineer
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Yangshun spent over 5 years at Meta and has conducted over hundreds
            of interviews and hiring for his organization. He led engineering
            teams to build www.meta.com and www.oculus.com, created{' '}
            <Anchor href="https://docusaurus.io/">Docusaurus 2</Anchor>,
            maintained{' '}
            <Anchor href="https://github.com/facebookarchive/flux">Flux</Anchor>
            , and contributed to Meta's OSS projects like{' '}
            <Anchor href="https://lexical.dev">Lexical</Anchor> and{' '}
            <Anchor href="https://relay.dev">Relay</Anchor>.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            He is actively involved in the{' '}
            <Anchor href="https://github.com/yangshun">
              open source community
            </Anchor>{' '}
            and also an expert in technical interviews, having authored{' '}
            <Anchor href="https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions">
              Blind 75
            </Anchor>
            ,{' '}
            <Anchor href="https://www.frontendinterviewhandbook.com/">
              Front End Interview Handbook
            </Anchor>
            , and{' '}
            <Anchor href="https://www.techinterviewhandbook.org/">
              Tech Interview Handbook
            </Anchor>
            , which have amassed over 100,000 GitHub stars.
          </p>
          <ul className="mt-6 flex gap-x-6" role="list">
            <li>
              <Anchor
                className="text-slate-400 hover:text-slate-500"
                href="https://www.github.com/yangshun"
                variant="unstyled">
                <span className="sr-only">GitHub</span>
                <GitHubIcon aria-hidden="true" className="h-5 w-5" />
              </Anchor>
            </li>
            <li>
              <Anchor
                className="text-slate-400 hover:text-slate-500"
                href="https://www.linkedin.com/in/yangshun"
                variant="unstyled">
                <span className="sr-only">LinkedIn</span>
                <LinkedInIcon aria-hidden="true" className="h-5 w-5" />
              </Anchor>
            </li>
            <li>
              <Anchor
                className="text-slate-400 hover:text-slate-500"
                href="https://www.twitter.com/yangshunz"
                variant="unstyled">
                <span className="sr-only">Twitter</span>
                <TwitterIcon aria-hidden="true" className="h-5 w-5" />
              </Anchor>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
