import React from 'react';
import DocPaginator from '@theme-original/DocPaginator';
import SidebarAd from '../../components/SidebarAd';

export default function DocPaginatorWrapper(props) {
  return (
    <>
      <DocPaginator {...props} />
      <div className="margin-top--md">
        <SidebarAd position="docs_bottom" />
      </div>
    </>
  );
}
