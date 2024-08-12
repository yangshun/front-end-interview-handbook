import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <main className="min-h-screen p-4 max-w-[1440px] mx-auto">
        <div
          className={clsx(
            'rounded-md bg-white min-h-[calc(100vh_-_32px)]',
            'shadow-sm md:shadow-md lg:shadow-lg',
            'text-neutral-900'
          )}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
