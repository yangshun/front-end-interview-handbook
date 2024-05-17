'use client';

import { useEffect } from 'react';

import logEvent from '~/logging/logEvent';

export default function GlobalLogging() {
  useEffect(() => {
    function log() {
      logEvent('window.focus', {
        namespace: 'general',
      });
    }

    window.addEventListener('focus', log);

    return () => {
      window.removeEventListener('focus', log);
    };
  }, []);

  useEffect(() => {
    function log() {
      logEvent('window.blur', {
        namespace: 'general',
      });
    }

    window.addEventListener('blur', log);

    return () => {
      window.removeEventListener('blur', log);
    };
  }, []);

  return null;
}
