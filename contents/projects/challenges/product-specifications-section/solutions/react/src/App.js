import clsx from 'clsx';
import ProductSpecificationSection from 'src/components/ProductSpecificationSection';

function App() {
  return (
    <main className="mx-auto min-h-screen max-w-[1440px] p-4">
      <div
        className={clsx(
          'min-h-[calc(100vh_-_32px)] rounded-md bg-white',
          'shadow-sm md:shadow-md lg:shadow-lg',
        )}>
        <ProductSpecificationSection />
      </div>
    </main>
  );
}

export default App;
