import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import Toast from 'src/components/ui/Toast';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';

import { useToastContext } from 'src/context/ToastContext';

const Layout = () => {
  const { toast } = useToastContext();
  return (
    <>
      <Navbar className="mt-4" />
      <main className="min-h-screen p-4 max-w-[1440px] mx-auto">
        {toast.show && <Toast type={toast.type} message={toast.message} />}
        <div
          className={clsx(
            'rounded-md bg-white min-h-[calc(100vh_-_32px)]',
            'shadow-sm md:shadow-md lg:shadow-lg',
            'text-neutral-900'
          )}>
          <Outlet />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Layout;
