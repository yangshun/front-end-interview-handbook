import type {
  ProjectsTrackInfo,
  ProjectsTrackMetadata,
} from 'contentlayer/generated';
import {
  allProjectsTrackInfos,
  allProjectsTrackMetadata,
} from 'contentlayer/generated';
import { sumBy } from 'lodash-es';

import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

import type { ProjectsTrackItem } from './ProjectsTracksData';
import type { ProjectsChallengeHistoricalStatuses } from '../../challenges/types';

export async function fetchProjectsTrackChallengeHistoricalStatuses(
  userId?: string,
  trackSlug?: string,
): Promise<ProjectsChallengeHistoricalStatuses> {
  if (userId == null) {
    return {};
  }

  let challengeSlugs = null;

  if (trackSlug) {
    const { track } = await readProjectsTrackItem(trackSlug);

    challengeSlugs = track.challenges.map(
      (challenge) => challenge.metadata.slug,
    );
  }

  const challengeStatuses: ProjectsChallengeHistoricalStatuses = {};

  const challengeSessionRows = await prisma.projectsChallengeSession.findMany({
    orderBy: {
      updatedAt: 'asc',
    },
    select: {
      slug: true,
      status: true,
      updatedAt: true,
    },
    where:
      challengeSlugs != null
        ? {
            projectsProfile: {
              userId,
            },
            slug: {
              in: challengeSlugs,
            },
          }
        : {
            projectsProfile: {
              userId,
            },
          },
  });

  challengeSessionRows.forEach(({ slug, status }) => {
    if (!challengeStatuses[slug]) {
      challengeStatuses[slug] = {
        completedBefore: false,
        currentStatus: status,
      };
    }

    challengeStatuses[slug].currentStatus = status;
    if (status === 'COMPLETED') {
      challengeStatuses[slug].completedBefore = true;
    }
  });

  return challengeStatuses;
}

export async function readProjectsTrackList(
  requestedLocale = 'en-US',
  userId?: string | null,
): Promise<{
  loadedLocale: string;
  tracks: ReadonlyArray<ProjectsTrackItem>;
}> {
  const [{ challenges }] = await Promise.all([
    readProjectsChallengeList(requestedLocale, userId),
  ]);

  const { trackInfoDict } = readProjectsTrackInfoDict(requestedLocale);
  const tracks = allProjectsTrackMetadata.map((trackMetadata) => {
    const trackChallenges = challenges.filter(
      (challenge) => challenge.metadata.track === trackMetadata.slug,
    );
    const points = sumBy(
      trackChallenges,
      (challengeItem) => challengeItem.metadata.points,
    );

    return {
      challenges: trackChallenges,
      info: trackInfoDict[trackMetadata.slug],
      metadata: trackMetadata,
      points,
    };
  });

  return {
    loadedLocale: requestedLocale,
    tracks,
  };
}

export async function readProjectsTrackItem(
  slugParam: string,
  requestedLocale = 'en-US',
  userId?: string | null,
): Promise<
  Readonly<{
    loadedLocale: string;
    track: ProjectsTrackItem;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^\da-zA-Z-]/g, '');

  const [{ trackMetadata }, { challenges }] = await Promise.all([
    readProjectsTrackMetadata(slug, requestedLocale),
    readProjectsChallengeList(requestedLocale, userId),
  ]);

  const { trackInfo } = readProjectsTrackInfo(slug, requestedLocale);

  const trackChallenges = challenges.filter(
    (challenge) => challenge.metadata.track === trackMetadata.slug,
  );
  const points = sumBy(
    trackChallenges,
    (challenge) => challenge.metadata.points,
  );

  return {
    loadedLocale: requestedLocale,
    track: {
      challenges: trackChallenges,
      info: trackInfo,
      metadata: trackMetadata,
      points,
    },
  };
}

export function readProjectsTrackMetadata(
  slugParam: string,
  requestedLocale = 'en-US',
): Readonly<{
  loadedLocale: string;
  trackMetadata: ProjectsTrackMetadata;
}> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^\da-zA-Z-]/g, '');

  return {
    loadedLocale: requestedLocale,
    trackMetadata: allProjectsTrackMetadata.find(
      (trackMetadataItem) => trackMetadataItem.slug === slug,
    )!,
  };
}

export function readProjectsTrackInfoList(requestedLocale = 'en-US'): Readonly<{
  loadedLocale: string;
  trackInfoList: ReadonlyArray<ProjectsTrackInfo>;
}> {
  const trackInfoList = allProjectsTrackInfos.filter(
    (trackInfoItem) => trackInfoItem.locale === requestedLocale,
  );

  return {
    loadedLocale: requestedLocale,
    trackInfoList,
  };
}

export function readProjectsTrackInfo(
  slugParam: string,
  requestedLocale = 'en-US',
): Readonly<{
  loadedLocale: string;
  trackInfo: ProjectsTrackInfo;
}> {
  const { trackInfoDict } = readProjectsTrackInfoDict(requestedLocale);

  return {
    loadedLocale: requestedLocale,
    trackInfo: trackInfoDict[slugParam],
  };
}

export function readProjectsTrackInfoDict(requestedLocale = 'en-US'): Readonly<{
  loadedLocale: string;
  trackInfoDict: Record<string, ProjectsTrackInfo>;
}> {
  const { trackInfoList } = readProjectsTrackInfoList(requestedLocale);
  const trackInfoDict: Record<string, ProjectsTrackInfo> = trackInfoList.reduce(
    (prev, infoItem) => ({
      ...prev,
      [infoItem.slug]: infoItem,
    }),
    {},
  );

  return {
    loadedLocale: requestedLocale,
    trackInfoDict,
  };
}
