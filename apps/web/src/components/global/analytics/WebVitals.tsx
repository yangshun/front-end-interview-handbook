'use client';

import { useEffect } from 'react';
import type { ReportCallback } from 'web-vitals';
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';

import logEvent from '~/logging/logEvent';

const logWebVitals: ReportCallback = (metric) => {
  logEvent(
    'web_vitals',
    {
      name: metric.name,
      rating: metric.rating,
    },
    metric.value,
  );
};

export default function WebVitals() {
  useEffect(() => {
    onCLS(logWebVitals);
    onFCP(logWebVitals);
    onFID(logWebVitals);
    onLCP(logWebVitals);
    onTTFB(logWebVitals);
  }, []);

  return null;
}
