import { useEffect, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

export default function useInterviewsSidebarCollapsed(
  initialCollapsed = false,
) {
  const [isMounted, setIsMounted] = useState(false);
  const [storedCollapsed, setStoredCollapsed] = useSessionStorage<boolean>(
    `gfe:interviews:sidebar-collapsed`,
    initialCollapsed,
  );
  const isCollapsed = isMounted ? storedCollapsed : initialCollapsed;

  // To prevent server side mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return [isCollapsed, setStoredCollapsed] as const;
}
