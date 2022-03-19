import React from 'react';
import Link from '@docusaurus/Link';

function PaginatorNavLink({permalink, title, subLabel}) {
  return (
    <Link className="pagination-nav__link" to={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className="pagination-nav__label">{title}</div>
    </Link>
  );
}

export default PaginatorNavLink;
