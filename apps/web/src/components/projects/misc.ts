import { z } from 'zod';

export const motivationReasonValue = z.enum([
  'beginner',
  'skill',
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

export const MAX_SKILLS_FOR_REP_GAINS_IN_SUBMISSION = 10;
