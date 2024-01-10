import { defineDocumentType } from 'contentlayer/source-files';

export const ProjectsChallengeStyleGuideDocument = defineDocumentType(() => ({
  contentType: 'mdx',
  filePathPattern: 'projects/challenges/*/style-guide/*.mdx',
  name: 'ProjectsChallengeStyleGuide',
}));
