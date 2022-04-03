import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

import successStories from '@site/src/data/successStories';

export default function Home() {
  const {siteConfig = {}} = useDocusaurusContext();

  return (
    <Layout
      title="Front end interview preparation for busy engineers"
      description={siteConfig.tagline}>
      <div>
        <HeroSection />
        <EducativeSection />
        <FeaturesSection />
        <TweetsSection />
        <MoonchaserSection />
        <SuccessStoriesSection />
        <SponsorshipSection />
      </div>
    </Layout>
  );
}

function HeroSection() {
  const {siteConfig = {}} = useDocusaurusContext();

  return (
    <header className={classnames('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <img
              alt={siteConfig.title}
              className={classnames(styles.heroBannerLogo, 'margin-vert--md')}
              src={useBaseUrl('img/logo.svg')}
            />
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className={classnames(
                  'button button--primary button--lg',
                  styles.getStarted,
                )}
                to="/introduction">
                Start reading&nbsp;&nbsp;→
              </Link>
            </div>
            <p className="margin-top--md">
              <em>It's completely free!</em>
            </p>
            <div className="margin-top--lg">
              <iframe
                src="https://ghbtns.com/github-btn.html?user=yangshun&amp;repo=front-end-interview-handbook&amp;type=star&amp;count=true&amp;size=large"
                frameBorder={0}
                scrolling={0}
                width={165}
                height={30}
                title="GitHub Stars"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MoonchaserSection() {
  /* Because the SSR and client output can differ and hydration doesn't patch attribute differences, 
we'll render this on the browser only. */
  return (
    <BrowserOnly>
      {() => (
        <div className={classnames('padding-vert--lg', styles.sectionSponsor)}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="margin-vert--lg text--center">
                  <h2 className={styles.sectionSponsorTitle}>
                    <div align="center">
                      <strong>
                        Get paid more. Receive risk-free salary negotiation help
                        from Moonchaser. You pay nothing unless your offer is
                        increased.
                      </strong>
                    </div>
                  </h2>
                  <div className="margin-vert--lg">
                    <a
                      className="button button--secondary button--lg"
                      href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_homepage"
                      rel="noopener"
                      target="_blank"
                      onClick={() => {
                        window.gtag('event', 'moonchaser.homepage.click');
                      }}>
                      Get risk-free negotiation advice&nbsp;&nbsp;→
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </BrowserOnly>
  );
}

function EducativeSection() {
  return (
    <div className={classnames('padding-vert--lg', styles.sectionSponsorAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="margin-vert--lg text--center">
              <div>
                <h2 className={styles.sectionSponsorTitle}>
                  <strong>
                    Looking to get hired at FAANG? Educative offers many great
                    courses to improve your interview game. Join today for a 10%
                    discount!
                  </strong>
                </h2>
                <div className="margin-vert--lg">
                  <a
                    className="button button--secondary button--lg"
                    href="https://www.educative.io/explore?search_string=interview&skills=javascript&aff=x23W"
                    rel="noopener"
                    target="_blank"
                    onClick={() => {
                      window.gtag('event', 'educative.homepage.click');
                    }}>
                    Check out courses&nbsp;&nbsp;→
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <div className={classnames('margin-vert--lg', 'padding-vert--lg')}>
      <div className="container">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h2
              className={classnames(
                'text--center',
                'margin-bottom--xl',
                styles.sectionTitle,
              )}>
              Why Front End Interview Handbook?
            </h2>
            <div className={classnames('row', styles.featuresRow)}>
              <div
                className={classnames('col', 'col--4', styles.featuresRowItem)}>
                <h3>🔍 Front end interviews demystified</h3>
                <p>
                  Front end interview preparation resources are scarce but no
                  fret, we tell you what to expect and everything else you need
                  to know!
                </p>
                <a href={useBaseUrl('introduction')}>
                  <strong>Learn more</strong>
                </a>
              </div>
              <div
                className={classnames('col', 'col--4', styles.featuresRowItem)}>
                <h3>👩‍🎨 System design</h3>
                <p>
                  What even is Front end system design?! Learn more about them
                  and how to ace these interviews.
                </p>
                <a href={useBaseUrl('front-end-system-design')}>
                  <strong>Learn more</strong>
                </a>
              </div>
              <div
                className={classnames('col', 'col--4', styles.featuresRowItem)}>
                <h3>👩‍💻 Coding questions</h3>
                <p>
                  Coding questions are an entirely different ball game for Front
                  End interviews. We tell you how to prepare for them (hint: not
                  just LeetCode).
                </p>
                <a href={useBaseUrl('build-user-interfaces')}>
                  <strong>Learn more</strong>
                </a>
              </div>
              <div
                className={classnames('col', 'col--4', styles.featuresRowItem)}>
                <h3>💯 From zero to hero</h3>
                <p>
                  Go from zero to front end interview hero with this handbook.
                  No prior interview experience needed.
                </p>
              </div>
              <div
                className={classnames('col', 'col--4', styles.featuresRowItem)}>
                <h3>🍼 Back to basics</h3>
                <p>
                  Learn to walk before you learn to fly. While React, Vue and
                  Angular are cool, make sure you also know your fundamentals.
                </p>
              </div>
              <div
                className={classnames('col', 'col--4', styles.featuresRowItem)}>
                <h3>👨‍👩‍👦‍👦 Community effort</h3>
                <p>
                  The best thing about Open Source is that the community vets
                  the contents, so you can be sure the answers here have been
                  proofread by many.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tweet({url, handle, name, content, avatar, date}) {
  return (
    <div className={classnames('card', styles.tweet)}>
      <div className="card__header">
        <div className="avatar">
          <img alt={name} className="avatar__photo" src={avatar} />
          <div className="avatar__intro">
            <div className={styles.tweet}>
              <strong>{name}</strong>{' '}
              <span className={styles.tweetMeta}>
                @{handle} &middot;{' '}
                <a className={styles.tweetMeta} href={url} rel="noopener">
                  {date}
                </a>
              </span>
            </div>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TweetsSection() {
  return (
    <div className={classnames('padding-vert--lg', styles.sectionAlt)}>
      <div className="container">
        <h2
          className={classnames(
            'margin-vert--lg',
            'text--center',
            styles.sectionTitle,
          )}>
          Loved by many engineers
        </h2>
        <div className={classnames('row', styles.tweetsSection)}>
          <div className="col col--4">
            <Tweet
              url="https://twitter.com/rwenderlich/status/1166336060533727232"
              handle="css"
              name="CSS-Tricks"
              date="Feb 14, 2018"
              avatar="https://pbs.twimg.com/profile_images/1080202898372362240/akqRGyta_400x400.jpg"
              content={
                <>
                  Front End Interview [Question] Handbook
                  <br />
                  <br />A good amount of HTML, CSS, and JavaScript questions
                  (and answers).
                </>
              }
            />
            <Tweet
              url="https://twitter.com/Insharamin/status/1479459483592110085"
              handle="Insharamin"
              name="Insha"
              date="Jan 7, 2022"
              avatar="https://pbs.twimg.com/profile_images/1468474545891774464/jENKPsRG_400x400.jpg"
              content={
                <>
                  📌 front-end-interview-handbook
                  <br />
                  <br />
                  Almost complete answers to "Front-end Job Interview Questions"
                  which you can use to interview potential candidates, test
                  yourself. Go from zero to front end interview hero with this
                  handbook.
                </>
              }
            />
            <Tweet
              url="https://twitter.com/umaar/status/963161780787798016"
              handle="umaar"
              name="Umar Hansa"
              date="Feb 13, 2018"
              avatar="https://pbs.twimg.com/profile_images/1305935669705965568/vS_bpIuu_400x400.jpg"
              content={
                <>
                  Front End Interview Handbook (Answers) 👀 - Useful for testing
                  yourself and learning more about quirks, best practices and
                  standards on the web ✅
                </>
              }
            />
          </div>
          <div className="col col--4">
            <Tweet
              url="https://twitter.com/silvenon/status/1284988755942748161"
              handle="silvenon"
              name="Matija Marohnić"
              date="Jul 20, 2020"
              avatar="https://pbs.twimg.com/profile_images/1497396127745945606/rtohsd4F_400x400.jpg"
              content={
                <>
                  Front End Interview Handbook is AMAZING, huge props to
                  @yangshunz and all the contributors. ⭐️
                </>
              }
            />
            <Tweet
              url="https://twitter.com/nimz_co/status/1052966426645016588"
              handle="nimz_co"
              name="Nima Izadi"
              date="Oct 19, 2018"
              avatar="https://pbs.twimg.com/profile_images/1439945799086051331/Gx6kzS-F_400x400.jpg"
              content={
                <>
                  Awesome guide for beginners to front-end development
                  #JavaScript #CSS #HTML
                  <br />
                  <br />I guess, big shout out to @yangshunz and all the
                  contributors of the repo! 💪
                </>
              }
            />
            <Tweet
              url="https://twitter.com/realJacobJed/status/969604583273172992"
              handle="realJacobJed"
              name="Jacob Jed"
              date="Mar 3, 2018"
              avatar="https://pbs.twimg.com/profile_images/632336891543597056/IJrRDr0e_400x400.jpg"
              content={
                <>
                  Awesome Front End Interview Handbook. I learned a lot from
                  this. Test yourself! I wouldn't pass this interview before
                  reading the answers for the first time. Would you?
                </>
              }
            />
          </div>
          <div className="col col--4">
            <Tweet
              url="https://twitter.com/CodeWithKenny/status/1326505319137161218"
              handle="CodeWithKenny"
              name="Code with Kenny"
              date="Nov 11, 2020"
              avatar="https://pbs.twimg.com/profile_images/1369449318684430349/FiAUX1SB_400x400.jpg"
              content={
                <>
                  This has been a great refresher resource and in an easy to
                  read format. Enjoy!
                </>
              }
            />
            <Tweet
              url="https://twitter.com/ddskier/status/1287085703172677632"
              handle="ddskier"
              name="DeeDee Walsh"
              date="Jul 26, 2020"
              avatar="https://pbs.twimg.com/profile_images/1445527010269302786/vpK5S5RI_400x400.jpg"
              content={
                <>
                  This is useful! Front End Interview Handbook by @yangshunz
                  #interviews #interviewing #career
                </>
              }
            />
            <Tweet
              url="https://twitter.com/CATB3AN5/status/964146313016283136"
              handle="CATB3AN5"
              name="Cat Beans"
              date="Feb 15, 2018"
              avatar="https://pbs.twimg.com/profile_images/1496932257625526274/Cdsr_RUn_400x400.jpg"
              content={
                <>
                  Are you hiring new frontend developers or are you applying to
                  a frontend dev position? yangshun's
                  front-end-interview-handbook also gives you the opportunity to
                  challenge yourself from time to time.
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessStoriesSection() {
  return (
    <div className={classnames('padding-vert--lg', styles.sectionAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h2
              className={classnames(
                'margin-vert--lg',
                'text--center',
                styles.sectionTitle,
              )}>
              Success stories
            </h2>
            {successStories.map((user) => (
              <div className="card margin-vert--lg" key={user.name}>
                <div className="card__body">
                  <p className={styles.quote}>"{user.quote}"</p>
                </div>
                <div className="card__header">
                  <div className="avatar">
                    <img
                      alt={user.name}
                      className="avatar__photo"
                      src={user.thumbnail}
                    />
                    <div className="avatar__intro">
                      <div className="avatar__name">{user.name}</div>
                      <small className="avatar__subtitle">{user.title}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="margin-vert--lg text--center">
              Would you like to contribute a success story?{' '}
              <a
                href="https://github.com/yangshun/front-end-interview-handbook/edit/master/website/src/data/successStories.js"
                rel="noopener"
                target="_blank">
                Open a Pull Request here
              </a>
              !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SponsorshipSection() {
  return (
    <div className={classnames('padding-vert--lg', 'text--center')}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h2 className={classnames('margin-vert--lg', styles.sectionTitle)}>
              Enjoying Front End Interview Handbook so far?
            </h2>
            <p className={classnames(styles.sectionTagline)}>
              Support this project by becoming a sponsor! Your logo/profile
              picture will show up here with a link to your website.
            </p>
            <div>
              <a
                href="https://opencollective.com/tech-interview-handbook/sponsor/0/website"
                rel="noopener"
                target="_blank">
                <img
                  alt="Sponsor"
                  src="https://opencollective.com/tech-interview-handbook/sponsor/0/avatar.svg"
                />
              </a>
              <a
                href="https://opencollective.com/tech-interview-handbook/sponsor/1/website"
                rel="noopener"
                target="_blank">
                <img
                  alt="Sponsor"
                  src="https://opencollective.com/tech-interview-handbook/sponsor/1/avatar.svg"
                />
              </a>
            </div>
            <div className="margin-vert--lg">
              <a
                className="button button--primary button--lg"
                href="https://opencollective.com/tech-interview-handbook"
                rel="noopener"
                target="_blank">
                Become a sponsor!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
