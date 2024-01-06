import { defineDocumentType } from 'contentlayer/source-files';

export const ProjectsProjectAPIWriteupDocument = defineDocumentType(() => ({
  contentType: 'mdx',
  filePathPattern: 'projects/project/*/api/*.mdx',
  name: 'ProjectAPIWriteup',
}));
