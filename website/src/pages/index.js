import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

import successStories from '@site/src/data/successStories';

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <Layout
      title="Front End Interview Preparation for Busy Engineers"
      description={siteConfig.tagline}>
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <img
                className={classnames(styles.heroBannerLogo, 'margin-vert--md')}
                src={useBaseUrl('img/logo.svg')}
              />
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <a
                  className={classnames(
                    'button button--primary button--lg',
                    styles.getStarted,
                  )}
                  href={useBaseUrl('introduction')}>
                  Get Started&nbsp;&nbsp;→
                </a>
              </div>
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
      <div>
        {/* Because the SSR and client output can differ and hydration doesn't patch attribute differences, 
        we'll render this on the browser only. */}
        <BrowserOnly>
          {() => (
            <div
              className={classnames(
                'margin-bottom--lg',
                'padding-vert--lg',
                styles.sectionSponsor,
              )}>
              <div className="container">
                <div className="row">
                  <div className="col col--8 col--offset-2">
                    <div className="margin-vert--lg text--center">
                      <h2 className={styles.sectionSponsorTitle}>
                        <div align="center">
                          <strong>
                            Get paid more. Receive risk-free salary negotiation
                            help from Moonchaser. You pay nothing unless your
                            offer is increased.
                          </strong>
                        </div>
                      </h2>
                      <div className="margin-vert--lg">
                        <a
                          className="button button--secondary button--lg"
                          href="https://www.moonchaser.io/?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=website_homepage"
                          rel="noreferrer noopener"
                          target="_blank"
                          onClick={() => {
                            window.gtag('event', 'moonchaser.homepage.click');
                          }}>
                          Get Risk-free Negotiation Help&nbsp;&nbsp;→
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </BrowserOnly>
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
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItem,
                    )}>
                    <h3>🔍 Front End Interviews Demystified</h3>
                    <p>
                      Front End interview preparation resources are scarce but
                      no fret, we tell you what to expect and everything else
                      you need to know!
                    </p>
                    <a href={useBaseUrl('introduction')}>
                      <strong>Learn more</strong>
                    </a>
                  </div>
                  <div
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItem,
                    )}>
                    <h3>👩‍🎨 System Design</h3>
                    <p>
                      What even is Front End system design?! Learn more about
                      them and how to ace these interviews.
                    </p>
                    <a href={useBaseUrl('front-end-system-design')}>
                      <strong>Learn more</strong>
                    </a>
                  </div>
                  <div
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItem,
                    )}>
                    <h3>👩‍💻 Coding Questions</h3>
                    <p>
                      Coding questions are an entirely different ball game for
                      Front End interviews. We tell you how to prepare for them
                      (hint: not just LeetCode).
                    </p>
                    <a href={useBaseUrl('build-user-interfaces')}>
                      <strong>Learn more</strong>
                    </a>
                  </div>
                  <div
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItem,
                    )}>
                    <h3>💯 From Zero to Hero</h3>
                    <p>
                      Go from zero to front end interview hero with this
                      handbook. No prior interview experience needed.
                    </p>
                  </div>
                  <div
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItem,
                    )}>
                    <h3>🍼 Back to Basics</h3>
                    <p>
                      Learn to walk before you learn to fly. While React, Vue
                      and Angular are cool, make sure you also know your
                      fundamentals.
                    </p>
                  </div>
                  <div
                    className={classnames(
                      'col',
                      'col--4',
                      styles.featuresRowItem,
                    )}>
                    <h3>👨‍👩‍👦‍👦 Community Effort</h3>
                    <p>
                      The best thing about Open Source is that the community
                      vets the contents, so you can be sure the answers here
                      have been proofread by many.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classnames('padding-vert--lg', styles.sectionSponsorAlt)}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="margin-vert--lg text--center">
                  <div>
                    <h2 className={styles.sectionSponsorTitle}>
                      <strong>
                        Looking for high quality front end interview courses?
                        Educative offers a ton of great courses to improve your
                        interview game.
                      </strong>
                    </h2>
                    <div className="margin-vert--lg">
                      <a
                        className="button button--secondary button--lg"
                        href="https://www.educative.io/explore?search_string=interview&skills=javascript&aff=x23W"
                        rel="noreferrer noopener"
                        target="_blank"
                        onClick={() => {
                          window.gtag('event', 'educative.homepage.click');
                        }}>
                        Get Started&nbsp;&nbsp;→
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  Success Stories
                </h2>
                {successStories.map((user) => (
                  <div className="card margin-vert--lg" key={user.name}>
                    <div className="card__body">
                      <p className={styles.quote}>"{user.quote}"</p>
                    </div>
                    <div className="card__header">
                      <div className="avatar">
                        <img className="avatar__photo" src={user.thumbnail} />
                        <div className="avatar__intro">
                          <div className="avatar__name">{user.name}</div>
                          <small className="avatar__subtitle">
                            {user.title}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="margin-vert--lg text--center">
                  Would you like to contribute a success story?{' '}
                  <a
                    href="https://github.com/yangshun/front-end-interview-handbook/edit/master/website/src/data/successStories.js"
                    target="_blank">
                    Open a Pull Request here
                  </a>
                  !
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classnames('padding-vert--lg', 'text--center')}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2
                  className={classnames(
                    'margin-vert--lg',
                    styles.sectionTitle,
                  )}>
                  Enjoying Front End Interview Handbook so far?
                </h2>
                <p className={classnames(styles.sectionTagline)}>
                  Support this project by becoming a sponsor! Your logo/profile
                  picture will show up here with a link to your website.
                </p>
                <div>
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/0/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/0/avatar.svg" />
                  </a>
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/1/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/1/avatar.svg" />
                  </a>{' '}
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/2/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/1/avatar.svg" />
                  </a>{' '}
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/3/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/1/avatar.svg" />
                  </a>{' '}
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/4/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/4/avatar.svg" />
                  </a>{' '}
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/5/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/5/avatar.svg" />
                  </a>{' '}
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/6/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/6/avatar.svg" />
                  </a>{' '}
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/7/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/7/avatar.svg" />
                  </a>{' '}
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/8/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/8/avatar.svg" />
                  </a>{' '}
                  <a
                    href="https://opencollective.com/tech-interview-handbook/sponsor/9/website"
                    target="_blank">
                    <img src="https://opencollective.com/tech-interview-handbook/sponsor/9/avatar.svg" />
                  </a>
                </div>
                <div className="margin-vert--lg">
                  <a
                    className="button button--primary button--lg"
                    href="https://opencollective.com/tech-interview-handbook"
                    rel="noreferrer noopener"
                    target="_blank">
                    Become a sponsor!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
