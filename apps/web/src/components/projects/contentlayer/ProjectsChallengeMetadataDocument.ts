import { defineDocumentType } from 'contentlayer/source-files';
import { sumBy } from 'lodash-es';
import path from 'node:path';

import {
  projectAccessOptions,
  projectDifficultyOptions,
  projectTrackOptions,
} from '../challenges/types';
import { projectsSkillDetermineParentSkill } from '../skills/data/ProjectsSkillUtils';

function parseProjectSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2];
}

export const ProjectsChallengeMetadataDocument = defineDocumentType(() => ({
  computedFields: {
    assetsHref: {
      description: 'Link to projects assets step contents',
      resolve: (doc) =>
        `/projects/challenges/${parseProjectSlug(
          doc._raw.sourceFilePath,
        )}/assets`,
      type: 'string',
    },
    completionHref: {
      description: 'Link to projects completion step contents',
      resolve: (doc) =>
        `/projects/challenges/${parseProjectSlug(
          doc._raw.sourceFilePath,
        )}/completion`,
      type: 'string',
    },
    href: {
      description: 'Link to project details page, also the brief page',
      resolve: (doc) =>
        `/projects/challenges/${parseProjectSlug(doc._raw.sourceFilePath)}`,
      type: 'string',
    },
    points: {
      description: 'Total points (base + skills)',
      resolve: (doc) => {
        return (
          doc.pointsBase +
          sumBy(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error: ContentLayer uses some custom array structure.
            (doc.skills as Readonly<{ _array: Array<string> }>)._array,
            (skill) =>
              doc.pointsForSkillGroups[
                projectsSkillDetermineParentSkill(skill)?.key ?? ''
              ] ?? 0,
          )
        );
      },
      type: 'number',
    },
    resourcesHref: {
      description: 'Link to projects resources step contents',
      resolve: (doc) =>
        `/projects/challenges/${parseProjectSlug(
          doc._raw.sourceFilePath,
        )}/resources`,
      type: 'string',
    },
    slug: {
      description: 'Unique identifier of the challenge',
      resolve: (doc) => parseProjectSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
    submitHref: {
      description: 'Link to submit project',
      resolve: (doc) =>
        `/projects/challenges/${parseProjectSlug(
          doc._raw.sourceFilePath,
        )}/submit`,
      type: 'string',
    },
  },
  contentType: 'data',
  fields: {
    access: {
      description:
        'User access configuration, whether they need to be paid to subscribe',
      options: projectAccessOptions,
      required: true,
      type: 'enum',
    },
    coverImage: {
      description: 'Cover image for the challenge',
      required: true,
      type: 'string',
    },
    createdAt: { required: true, type: 'date' },
    difficulty: {
      options: projectDifficultyOptions,
      required: true,
      type: 'enum',
    },
    galleryImages: {
      description: 'Gallery images for the challenge',
      of: { type: 'string' },
      required: true,
      type: 'list',
    },
    pointsBase: {
      description: 'Reputation gained by completing the challenge',
      required: true,
      type: 'number',
    },
    pointsForSkillGroups: {
      description: 'Reputation gained by using skills for the challenge',
      required: true,
      type: 'json',
    },
    skills: {
      description: 'Skills for the challenge',
      of: { type: 'string' },
      required: true,
      type: 'list',
    },
    specImages: {
      description: 'Images used for comparison',
      // TODO(projects): switch to true when every project has this field.
      required: false,
      type: 'json',
    },
    specShowGridLayoutButton: {
      default: true,
      description:
        'Whether to show grid layout button in specs gallery of assets tab',
      required: false,
      type: 'boolean',
    },
    track: {
      // Unfortunately there's no easy way to make this rely on all the available slugs in the track model.
      // One way is references but they are quite underwhelming at the moment so we're not using them.
      options: projectTrackOptions,
      required: true,
      type: 'enum',
    },
  },
  filePathPattern: 'projects/challenges/*/metadata.json',
  name: 'ProjectsChallengeMetadata',
}));
