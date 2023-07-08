import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import clsx from 'clsx';

import styles from './styles.module.css';

const BACKGROUNDS = [styles.backgroundOrange, styles.backgroundRed];

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

function GreatFrontEnd({position}) {
  return (
    <a
      className={clsx(styles.container, styles.backgroundPurple)}
      href={`https://www.greatfrontend.com?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=${position}&fpr=frontendinterviewhandbook`}
      target="_blank"
      rel="noopener"
      onClick={() => {
        window.gtag('event', `greatfrontend.${position}.click`);
      }}>
      <p className={styles.tagline}>
        <strong className={styles.title}>
          LeetCode for Front End Interviews
        </strong>
        Get 20% off <u>GreatFrontEnd</u>'s premium high quality
        practice questions, answers and guides by{' '}
        <u>ex-FAANG Senior Engineers</u>
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

        return <GreatFrontEnd position={position} />;
      }}
    </BrowserOnly>
  );
});
