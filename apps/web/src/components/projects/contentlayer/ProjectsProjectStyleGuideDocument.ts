import { defineDocumentType } from 'contentlayer/source-files';

export const ProjectsProjectStyleGuideDocument = defineDocumentType(() => ({
  contentType: 'mdx',
  filePathPattern: 'projects/*/style-guide/*.mdx',
  name: 'ProjectStyleGuide',
}));
