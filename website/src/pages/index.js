import React from 'react';
import clsx from 'clsx';
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
        <GreatFrontEndSection />
        <FeaturesSection />
        <TweetsSection />
        <FAANGTechLeadsSection />
        <SuccessStoriesSection />
        <SponsorshipSection />
      </div>
    </Layout>
  );
}

function HeroSection() {
  const {siteConfig = {}} = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <img
              alt={siteConfig.title}
              className={clsx(styles.heroBannerLogo, 'margin-vert--md')}
              src={useBaseUrl('img/logo.svg')}
            />
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className={clsx(
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

function GreatFrontEndSection() {
  return (
    <div
      className={clsx('padding-vert--lg')}
      style={{backgroundColor: 'rgb(79, 70, 229)'}}>
      <div className="container">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <div className="margin-vert--lg text--center">
              <div>
                <h2
                  className={styles.sectionSponsorTitle}
                  style={{fontSize: 'var(--ifm-h2-font-size)'}}>
                  <strong>
                    Want to practice front end questions and reference answers from experienced ex-FAANG senior engineers? Top front end interview practice platform{' '}
                    <a
                      href="https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=homepage&fpr=frontendinterviewhandbook"
                      style={{color: '#fff', textDecoration: 'underline'}}>
                      GreatFrontEnd
                    </a>{' '}
                    is now offering 25% off their lifetime plan! Try out their free questions today:
                  </strong>
                </h2>
                <div className="margin-vert--lg">
                  <a
                    className="button button--secondary button--lg"
                    href="https://www.greatfrontend.com/questions/system-design/news-feed-facebook"
                    rel="noopener"
                    target="_blank"
                    onClick={() => {
                      window.gtag(
                        'event',
                        'greatfrontend.homepage.system_design.click',
                      );
                    }}>
                    System Design Questions &nbsp;&nbsp;→
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    className="button button--secondary button--lg"
                    href="https://www.greatfrontend.com/questions/coding?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=homepage&fpr=frontendinterviewhandbook"
                    rel="noopener"
                    target="_blank"
                    onClick={() => {
                      window.gtag(
                        'event',
                        'greatfrontend.homepage.coding.click',
                      );
                    }}>
                    Coding Questions &nbsp;&nbsp;→
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

function FAANGTechLeadsSection() {
  return (
    <div
      className={clsx('padding-vert--lg')}
      style={{backgroundColor: 'rgb(244, 63, 94)'}}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="margin-vert--lg text--center">
              <div>
                <h2 className={styles.sectionSponsorTitle}>
                  <strong>
                    Craft the perfect resume for FAANG with FAANG Tech Leads'
                    high quality Software Engineer resume templates and samples.
                  </strong>
                </h2>
                <div className="margin-vert--lg">
                  <a
                    className="button button--secondary button--lg"
                    href="https://www.faangtechleads.com?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=${position}&aff=1e80c401fe7e2"
                    rel="noopener"
                    target="_blank"
                    onClick={() => {
                      window.gtag('event', 'faangtechleads.homepage.click');
                    }}>
                    Improve your resume now &nbsp;&nbsp;→
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
    <div className={clsx('margin-vert--lg', 'padding-vert--lg')}>
      <div className="container">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <h2
              className={clsx(
                'text--center',
                'margin-bottom--xl',
                styles.sectionTitle,
              )}>
              Why Front End Interview Handbook?
            </h2>
            <div className={clsx('row', styles.featuresRow)}>
              <div className={clsx('col', 'col--4', styles.featuresRowItem)}>
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
              <div className={clsx('col', 'col--4', styles.featuresRowItem)}>
                <h3>👩‍🎨 System design</h3>
                <p>
                  What even is Front end system design?! Learn more about them
                  and how to ace these interviews.
                </p>
                <a href={useBaseUrl('front-end-system-design')}>
                  <strong>Learn more</strong>
                </a>
              </div>
              <div className={clsx('col', 'col--4', styles.featuresRowItem)}>
                <h3>👩‍💻 Coding questions</h3>
                <p>
                  Coding questions are an entirely different ball game for Front
                  End interviews. We tell you how to prepare for them (hint: not
                  just LeetCode).
                </p>
                <a href={useBaseUrl('coding/build-front-end-user-interfaces')}>
                  <strong>Learn more</strong>
                </a>
              </div>
              <div className={clsx('col', 'col--4', styles.featuresRowItem)}>
                <h3>💯 From zero to hero</h3>
                <p>
                  Go from zero to front end interview hero with this handbook.
                  No prior interview experience needed.
                </p>
              </div>
              <div className={clsx('col', 'col--4', styles.featuresRowItem)}>
                <h3>🍼 Back to basics</h3>
                <p>
                  Learn to walk before you learn to fly. While React, Vue and
                  Angular are cool, make sure you also know your fundamentals.
                </p>
              </div>
              <div className={clsx('col', 'col--4', styles.featuresRowItem)}>
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
    <div className={clsx('card', styles.tweet)}>
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
    <div className={clsx('padding-vert--xl', styles.sectionAlt)}>
      <div className="container">
        <h2
          className={clsx(
            'margin-btm--lg',
            'text--center',
            styles.sectionTitle,
          )}>
          Over 100,000 people have benefitted from this handbook!
        </h2>
        <div className={clsx('row', styles.tweetsSection)}>
          <div className="col col--4">
            <Tweet
              url="https://twitter.com/css/status/963442650476089344"
              handle="css"
              name="CSS-Tricks"
              date="Feb 14, 2018"
              avatar="/img/tweets/css.jpg"
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
              avatar="/img/tweets/Insharamin.jpg"
              content={
                <>
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
              avatar="/img/tweets/umaar.jpg"
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
              url="https://twitter.com/FrontendDaily/status/966791481058119680"
              handle="FrontendDaily"
              name="Frontend Daily"
              date="Apr 10, 2018"
              avatar="/img/tweets/FrontendDaily.jpg"
              content={
                <>
                  A Front End Interview Handbook (Headed to a job interview any
                  time soon? Here are some questions and answers worth being
                  prepared for.)
                </>
              }
            />
            <Tweet
              url="https://twitter.com/silvenon/status/1284988755942748161"
              handle="silvenon"
              name="Matija Marohnić"
              date="Jul 20, 2020"
              avatar="/img/tweets/silvenon.jpg"
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
              avatar="/img/tweets/nimz_co.jpg"
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
          </div>
          <div className="col col--4">
            <Tweet
              url="https://twitter.com/CodeWithKenny/status/1326505319137161218"
              handle="CodeWithKenny"
              name="Code with Kenny"
              date="Nov 11, 2020"
              avatar="/img/tweets/CodeWithKenny.jpg"
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
              avatar="/img/tweets/ddskier.jpg"
              content={
                <>
                  This is useful! Front End Interview Handbook by @yangshunz
                  #interviews #interviewing #career
                </>
              }
            />
            <Tweet
              url="https://twitter.com/realJacobJed/status/969604583273172992"
              handle="realJacobJed"
              name="Jacob Jed"
              date="Mar 3, 2018"
              avatar="/img/tweets/realJacobJed.jpg"
              content={
                <>
                  Awesome Front End Interview Handbook. I learned a lot from
                  this. Test yourself! I wouldn't pass this interview before
                  reading the answers for the first time. Would you?
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
    <div className={clsx('padding-vert--lg', styles.sectionAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h2
              className={clsx(
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
                href="https://github.com/yangshun/front-end-interview-handbook/edit/main/website/src/data/successStories.js"
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
    <div className={clsx('padding-vert--lg', 'text--center')}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h2 className={clsx('margin-vert--lg', styles.sectionTitle)}>
              Enjoying Front End Interview Handbook so far?
            </h2>
            <p className={clsx(styles.sectionTagline)}>
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
