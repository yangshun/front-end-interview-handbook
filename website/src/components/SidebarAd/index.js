import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import clsx from 'clsx';

import styles from './styles.module.css';

function FAANGTechLeads({ position }) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundRed)}
      href={`https://www.faangtechleads.com?utm_source=techinterviewhandbook&utm_medium=referral&utm_content=${position}&aff=1e80c401fe7e2`}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `faangtechleads.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <span className={styles.title}>
          Craft the perfect resume for FAANG
        </span>
        Save time crafting your resume with FAANG Tech Leads'{' '}
        <u>FAANG-quality resume templates and examples</u> which have helped
        many Software Engineers get interviews at top Bay Area companies. Grab
        them now for a <u>whopping 70% off</u>!
      </p>
    </a>
  );
}

function GreatFrontEnd({ position }) {
  return (
    <a
      className={clsx(styles.container)}
      href={`https://www.greatfrontend.com?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=${position}&gnrs=frontendinterviewhandbook`}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `greatfrontend.${position}.click`);
      }}>
      <div className={styles.tagline}>
        <span className={styles.title}>
          Navigate front end interviews easily with GreatFrontEnd
        </span>
        Meet the front end interview prep platform built by <u>ex-FAANG senior engineers</u> to make your life much easier
      </div>
    </a>
  );
}

export default React.memo(function SidebarAd({ position }) {
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
              key={Math.random()}
              position={position}
            />
          );
        }

        return <GreatFrontEnd position={position} />;
      }}
    </BrowserOnly>
  );
});
