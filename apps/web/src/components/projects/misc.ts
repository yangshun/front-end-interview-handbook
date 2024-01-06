import { z } from 'zod';

export const motivationReasonValue = z.enum([
  'beginner',
  'experienced',
  'mentor-others',
  'other',
  'portfolio',
  'side-projects',
]);

export const yoeReplacementSchema = z.enum([
  'bootcamp-grad',
  'bootcamper',
  'career-switcher',
  'fresh-grad',
  'intern',
  'masters-cs',
  'others',
  'self-learning',
  'undergrad-cs',
]);