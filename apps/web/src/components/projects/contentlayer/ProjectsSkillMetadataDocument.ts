import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

import { projectsSkillDetermineParentSkill } from '../skills/data/ProjectsSkillUtils';

function parseSkillSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2];
}

export const ProjectsSkillMetadataGuideDocument = defineDocumentType(() => ({
  computedFields: {
    href: {
      description: 'Link to project skill page',
      resolve: (doc) =>
        `/projects/skills/${parseSkillSlug(doc._raw.sourceFilePath)}`,
      type: 'string',
    },
    premium: {
      description: 'Whether the skill is premium (determined by parent skill)',
      resolve: (doc) => {
        const slug = parseSkillSlug(doc._raw.sourceFilePath);

        return projectsSkillDetermineParentSkill(slug)?.premium ?? false;
      },
      type: 'boolean',
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
    premium: {
      description: 'Whether the skill is premium',
      required: true,
      type: 'boolean',
    },
    title: {
      description: 'Name of the skill',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'projects/skills/*/*.mdx',
  name: 'ProjectsSkillMetadata',
}));
