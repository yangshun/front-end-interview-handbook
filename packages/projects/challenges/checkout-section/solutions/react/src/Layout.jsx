import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import Toast from 'src/components/ui/Toast';

import { useToastContext } from 'src/context/ToastContext';

const Layout = () => {
  const { toast } = useToastContext();
  return (
    <>
      <main className="min-h-screen p-4 max-w-[1440px] mx-auto">
        {toast.show && <Toast type={toast.type} message={toast.message} />}
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
