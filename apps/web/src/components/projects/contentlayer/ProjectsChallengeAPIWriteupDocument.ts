import { defineDocumentType } from 'contentlayer/source-files';

export const ProjectsChallengeAPIWriteupDocument = defineDocumentType(() => ({
  contentType: 'mdx',
  filePathPattern: 'projects/challenges/*/api/*.mdx',
  name: 'ProjectsChallengeAPIWriteup',
}));
