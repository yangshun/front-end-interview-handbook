import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import Toast from 'src/components/ui/Toast';
import Footer from 'src/components/Footer';

import { useToastContext } from './context/ToastContext';
import Navbar from './components/Navbar';

const Layout = () => {
  const { toast } = useToastContext();

  return (
    <>
      <Navbar className="mt-4" />
      <main className="mx-auto min-h-screen max-w-[1440px] p-4">
        {toast.show && <Toast type={toast.type} message={toast.message} />}
        <div
          className={clsx(
            'min-h-[calc(100vh_-_32px)] rounded-md bg-white',
            'shadow-sm md:shadow-md lg:shadow-lg',
            'text-neutral-900',
          )}>
          <Outlet />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Layout;
