import type {
  ProjectsTrackInfo,
  ProjectsTrackMetadata,
} from 'contentlayer/generated';
import { sumBy } from 'lodash-es';

import { fetchAllProjectsTrackInfo } from '~/db/contentlayer/projects/ProjectsTrackInfoReader';
import {
  fetchAllProjectsTrackMetadata,
  fetchProjectsTrackMetadata,
} from '~/db/contentlayer/projects/ProjectsTrackMetadataReader';
import { readProjectsChallengeList } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

import type { ProjectsChallengeHistoricalStatuses } from '../../challenges/types';
import type { ProjectsTrackItem } from './ProjectsTracksData';

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
  const [{ challenges }, allTrackMetadata, { trackInfoDict }] =
    await Promise.all([
      readProjectsChallengeList(requestedLocale, userId),
      fetchAllProjectsTrackMetadata(),
      readProjectsTrackInfoDict(requestedLocale),
    ]);

  const tracks = allTrackMetadata
    .map((trackMetadata) => {
      const trackChallenges = challenges
        .filter((challenge) => challenge.metadata.track === trackMetadata.slug)
        .sort(
          (challengeA, challengeB) =>
            challengeA.metadata.order - challengeB.metadata.order,
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
    })
    .sort((trackA, trackB) => trackA.metadata.order - trackB.metadata.order);

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
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const [{ trackMetadata }, { challenges }, { trackInfo }] = await Promise.all([
    readProjectsTrackMetadata(slug, requestedLocale),
    readProjectsChallengeList(requestedLocale, userId),
    readProjectsTrackInfo(slug, requestedLocale),
  ]);

  const trackChallenges = challenges
    .filter((challenge) => challenge.metadata.track === trackMetadata.slug)
    .sort(
      (challengeA, challengeB) =>
        challengeA.metadata.order - challengeB.metadata.order,
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

export async function readProjectsTrackMetadata(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    trackMetadata: ProjectsTrackMetadata;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();
  const trackMetadata = await fetchProjectsTrackMetadata(slug);

  return {
    loadedLocale: requestedLocale,
    trackMetadata: trackMetadata!,
  };
}

export async function readProjectsTrackInfoList(
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    trackInfoList: ReadonlyArray<ProjectsTrackInfo>;
  }>
> {
  const trackInfoList = await fetchAllProjectsTrackInfo();
  const filteredTrackInfoList = trackInfoList.filter(
    (trackInfoItem) => trackInfoItem.locale === requestedLocale,
  );

  return {
    loadedLocale: requestedLocale,
    trackInfoList: filteredTrackInfoList,
  };
}

export async function readProjectsTrackInfo(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    trackInfo: ProjectsTrackInfo;
  }>
> {
  const { trackInfoDict } = await readProjectsTrackInfoDict(requestedLocale);

  return {
    loadedLocale: requestedLocale,
    trackInfo: trackInfoDict[slugParam],
  };
}

export async function readProjectsTrackInfoDict(
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    trackInfoDict: Record<string, ProjectsTrackInfo>;
  }>
> {
  const { trackInfoList } = await readProjectsTrackInfoList(requestedLocale);
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
