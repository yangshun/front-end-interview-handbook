import { defineDocumentType } from 'contentlayer2/source-files';
import path from 'node:path';

import { projectsSkillDetermineParentSkill } from '../skills/data/ProjectsSkillUtils';

function parseSkillSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2];
}

export const ProjectsSkillMetadataDocument = defineDocumentType(() => ({
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
  contentType: 'data',
  fields: {
    challenges: {
      description: 'Challenges for this skill on the skills roadmap',
      of: { type: 'string' },
      required: true,
      type: 'list',
    },
  },
  filePathPattern: 'projects/skills/*/metadata.json',
  name: 'ProjectsSkillMetadata',
}));
