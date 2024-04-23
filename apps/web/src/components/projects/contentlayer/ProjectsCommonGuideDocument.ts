import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseProjectSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2];
}

export const ProjectsCommonGuideDocument = defineDocumentType(() => ({
  computedFields: {
    slug: {
      description: 'Unique identifier of the guide',
      resolve: (doc) => parseProjectSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    title: {
      description: 'Title of the guide',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'projects/guides/*/*.mdx',
  name: 'ProjectsCommonGuide',
}));
