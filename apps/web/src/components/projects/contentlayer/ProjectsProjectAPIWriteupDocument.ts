import { defineDocumentType } from 'contentlayer/source-files';

export const ProjectsProjectAPIWriteupDocument = defineDocumentType(() => ({
  contentType: 'mdx',
  filePathPattern: 'projects/*/api/*.mdx',
  name: 'ProjectAPIWriteup',
}));
