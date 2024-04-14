import { defineDocumentType } from 'contentlayer/source-files';

export const ProjectsSkillDescriptionDocument = defineDocumentType(() => ({
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
  filePathPattern: 'projects/skills/*/description/*.mdx',
  name: 'ProjectsSkillDescription',
}));
