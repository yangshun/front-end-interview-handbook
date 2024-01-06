import { defineDocumentType } from 'contentlayer/source-files';

export const ProjectsProjectStyleGuideDocument = defineDocumentType(() => ({
  contentType: 'mdx',
  filePathPattern: 'projects/project/*/style-guide/*.mdx',
  name: 'ProjectStyleGuide',
}));
