import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css'; // Using a custom className
import SidebarAd from '../../components/SidebarAd';
// This prevents TOC highlighting to highlight TOCInline/TOCCollapsible by mistake

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

function TOC({className, ...props}) {
  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <div className="margin--md">
        <SidebarAd position="table_of_contents" />
      </div>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
      <div className="margin--md">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=yangshun&amp;repo=front-end-interview-handbook&amp;type=star&amp;count=true&amp;size=large"
          frameBorder={0}
          scrolling={0}
          width={165}
          height={30}
          title="GitHub Stars"
        />
        <div
          className={clsx(
            'margin-top--md padding--md',
            styles.socialLinksContainer,
          )}>
          <div className={styles.socialLinks}>
            Follow us
            <a
              href="https://twitter.com/techinterviewhb"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-icon navbar-icon-twitter"
              aria-label="Twitter"
            />
            <a
              href="https://www.facebook.com/techinterviewhandbook"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-icon navbar-icon-facebook"
              aria-label="Facebook page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TOC;
