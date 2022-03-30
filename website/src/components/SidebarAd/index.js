import React from 'react';
import ReactDOM from 'react-dom';
import BrowserOnly from '@docusaurus/BrowserOnly';

import clsx from 'clsx';

import styles from './styles.module.css';

const BACKGROUNDS = [
  styles.backgroundOrange,
  styles.backgroundPurple,
  styles.backgroundRed,
];

function FAANGTechLeads({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href={`https://www.faangtechleads.com?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=${position}&aff=1e80c401fe7e2`}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `faangtechleads.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          Craft the perfect resume for FAANG
        </strong>
        Save time crafting your resume with FAANG Tech Leads'{' '}
        <u>FAANG-quality resume templates and examples</u> which have helped
        many Software Engineers get interviews at top Bay Area companies. Grab
        them now for a <u>whopping 70% off</u>!
      </p>
    </a>
  );
}

function AlgoMonster({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack="
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `algomonster.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          Stop grinding. Study with a plan
        </strong>
        Developed by Google engineers, <u>AlgoMonster</u> is the fastest way to
        get a software engineering job. <u>Join today for a 70% discount!</u>!
      </p>
    </a>
  );
}

function EducativeCoding({className, position}) {
  return (
    <a
      className={clsx(styles.container, className)}
      href="https://educative.io/tech-interview-handbook"
      key={Math.random()}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => {
        window.gtag('event', `educative.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>Looking to get hired at FAANG?</strong>{' '}
        <u>Educative</u> offers many great courses to improve your interview
        game. <u>Join today for a 10% discount!</u>
      </p>
    </a>
  );
}

export default React.memo(function SidebarAd({position}) {
  const backgroundClass =
    BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
  // Because the SSR and client output can differ and hydration doesn't patch attribute differences,
  // we'll render this on the browser only.
  return (
    <BrowserOnly>
      {() => {
        const path = window.location.pathname;
        // Ugly hack to show conditional sidebar content.

        if (path.includes('resume')) {
          return (
            <FAANGTechLeads
              className={backgroundClass}
              key={Math.random()}
              position={position}
            />
          );
        }

        return Math.random() > 0.5 ? (
          <AlgoMonster
            className={backgroundClass}
            key={Math.random()}
            position={position}
          />
        ) : (
          <EducativeCoding
            className={backgroundClass}
            key={Math.random()}
            position={position}
          />
        );
      }}
    </BrowserOnly>
  );
});
