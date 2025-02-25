'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import useIsSticky from '~/hooks/useIsSticky';

import NavProductPopover from '~/components/global/navbar/NavProductPopover';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Navbar from '~/components/ui/Navbar/Navbar';

export default function SponsorsNavbar() {
  const intl = useIntl();
  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);

  const translucent = !isSticky;

  return (
    <Navbar
      ref={navbarRef}
      endAddOnItems={
        <div className="flex items-center gap-3">
          <Button
            href="mailto:sponsor@greatfrontend.com"
            label={intl.formatMessage({
              defaultMessage: 'Contact us',
              description: 'Contact us button label',
              id: 'IxYmig',
            })}
            size="xs"
            variant="secondary"
          />
          <Button // TODO(sponsors): Add link to schedule slot
            label={intl.formatMessage({
              defaultMessage: 'Schedule your slot',
              description: 'Schedule your slot button label',
              id: 'jLIDJB',
            })}
            size="xs"
            variant="primary"
          />
        </div>
      }
      isLoading={false}
      links={[]}
      logo={
        <NavProductPopover
          product="interviews"
          triggerClassname="-ml-2"
          variant="full"
        />
      }
      mobileSidebarWrapperClassName="md:hidden"
      renderMobileSidebarContent={({ closeMobileNav }) => (
        <div className={clsx('flex flex-col gap-2', 'px-6 pt-4')}>
          <Button
            href="mailto:sponsor@greatfrontend.com"
            label={intl.formatMessage({
              defaultMessage: 'Contact us',
              description: 'Contact us button label',
              id: 'IxYmig',
            })}
            size="xs"
            variant="secondary"
            onClick={closeMobileNav}
          />
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Schedule your slot',
              description: 'Schedule your slot button label',
              id: 'jLIDJB',
            })}
            size="xs"
            variant="primary"
            onClick={closeMobileNav} // TODO(sponsors): Add link to schedule slot
          />
        </div>
      )}
      translucent={translucent}
    />
  );
}
