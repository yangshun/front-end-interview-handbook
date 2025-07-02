'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function MobilePostModal({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Check if we're viewing a post (URL contains /posts/)
  const isPostRoute = pathname?.includes('/posts/') ?? false;

  useEffect(() => {
    setIsOpen(isPostRoute);
  }, [isPostRoute]);

  const handleClose = () => {
    // Navigate back to the project list
    const projectPath = pathname?.split('/posts/')[0];

    if (projectPath) {
      router.push(projectPath);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleBackdropClick}
      />

      {/* Modal Content - Slide up from bottom */}
      <div className="animate-slide-up absolute bottom-4 left-4 right-4 top-20 flex flex-col rounded-lg bg-white shadow-lg">
        {/* Header with close button */}
        <div className="flex flex-shrink-0 items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Post Details</h2>
          <button
            aria-label="Close"
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
            type="button"
            onClick={handleClose}>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
