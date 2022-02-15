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

export default React.memo(function SidebarAd({position}) {
  const backgroundClass =
    BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
  // Because the SSR and client output can differ and hydration doesn't patch attribute differences,
  // we'll render this on the browser only.
  return (
    <BrowserOnly>
      {() =>
        Math.random() > 0.5 ? (
          <a
            className={clsx(styles.container, backgroundClass)}
            href="https://shareasale.com/r.cfm?b=1873647&u=3114753&m=114505&urllink=&afftrack="
            target="_blank"
            rel="noopener"
            onClick={() => {
              window.gtag('event', `algomonster.${position}.click`);
            }}>
            <p className={styles.tagline}>
              <strong>Stop grinding and study with a plan! </strong>
              <br />
              Developed by Google engineers, <u>AlgoMonster</u> is the fastest
              way to get a software engineering job.{' '}
              <u>Join today for a 70% discount!</u>!
            </p>
          </a>
        ) : (
          <a
            className={clsx(styles.container, backgroundClass)}
            href="https://educative.io/tech-interview-handbook"
            key={Math.random()}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => {
              window.gtag('event', `educative.${position}.click`);
            }}>
            <p className={styles.tagline}>
              <strong>Looking to get hired at FAANG?</strong> <u>Educative</u>{' '}
              offers many great courses to improve your interview game.{' '}
              <u>Join today for a 10% discount!</u>
            </p>
          </a>
        )
      }
    </BrowserOnly>
  );
});
