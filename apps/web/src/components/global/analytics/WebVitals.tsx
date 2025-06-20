'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import type { MetricType } from 'web-vitals';

import gtag from '~/lib/gtag';

import logEvent from '~/logging/logEvent';

function logWebVitals(metric: MetricType) {
  logEvent('web_vitals', {
    delta: metric.delta,
    id: metric.id,
    name: metric.name,
    namespace: 'performance',
    rating: metric.rating,
    value: metric.value,
  });

  gtag.event({
    action: metric.name,
    extra: {
      metric_delta: metric.delta,
      metric_id: metric.id,
      metric_rating: metric.rating,
      metric_value: metric.value,
    },
    value: metric.delta,
  });
}

export default function WebVitals() {
  useEffect(() => {
    onCLS(logWebVitals);
    onFCP(logWebVitals);
    onLCP(logWebVitals);
    onINP(logWebVitals);
    onTTFB(logWebVitals);
  }, []);

  return null;
}
