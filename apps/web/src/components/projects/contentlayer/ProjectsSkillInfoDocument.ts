import { defineDocumentType } from 'contentlayer2/source-files';
import path from 'node:path';

function parseSkillSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2];
}

export const ProjectsSkillInfoDocument = defineDocumentType(() => ({
  computedFields: {
    locale: {
      description: 'Locale of document',
      resolve: (doc) =>
        doc._raw.sourceFileName.replace(
          path.extname(doc._raw.sourceFileName),
          '',
        ),
      type: 'string',
    },
    slug: {
      description: 'Unique identifier of the skill',
      resolve: (doc) => parseSkillSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    description: {
      description: 'Description of the skill',
      required: true,
      type: 'string',
    },
    title: {
      description: 'Name of the skill',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'projects/skills/*/info/*.mdx',
  name: 'ProjectsSkillInfo',
}));
