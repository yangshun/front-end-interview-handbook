import clsx from 'clsx';

import Modal from 'src/components/ui/Modal';
import Reviews from 'src/components/Reviews';
import ProductReviewsContextProvider from 'src/components/Reviews/ProductReviewsContext';

function App() {
  const isModalOpen = true;

  return (
    <main className="mx-auto min-h-screen max-w-[1440px] p-4">
      <div
        className={clsx(
          'min-h-[calc(100vh_-_32px)] rounded-md bg-white',
          'shadow-sm md:shadow-md lg:shadow-lg',
        )}>
        <Modal isOpen={isModalOpen} onClose={() => {}}>
          <ProductReviewsContextProvider>
            <Reviews />
          </ProductReviewsContextProvider>
        </Modal>
      </div>
    </main>
  );
}

export default App;
