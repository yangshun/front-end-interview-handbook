import { useEffect } from 'react';

import Button from '~/components/ui/Button';

export default function ErrorMessageBlock() {
  // Force refresh after 3 seconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-4 py-12 text-center">
      <h1 className="text-lg text-neutral-700">
        There's a newer version of the site available.
      </h1>
      <div>
        <Button
          label="Reload Page"
          type="button"
          variant="primary"
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}
