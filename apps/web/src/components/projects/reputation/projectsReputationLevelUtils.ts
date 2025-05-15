export type ProjectsReputationTier =
  | 'architect'
  | 'crafter'
  | 'initiate'
  | 'master'
  | 'prestige';

export const ProjectsReputationTierLabel: Record<
  ProjectsReputationTier,
  string
> = {
  architect: 'Architect',
  crafter: 'Crafter',
  initiate: 'Initiate',
  master: 'Master',
  prestige: 'Prestige',
};

type LevelInfo = {
  maxPoints: number;
  tier: ProjectsReputationTier;
};

type TierInfo = {
  minLevel: number;
  tier: ProjectsReputationTier;
};

function round(value: number, precision: number) {
  const multiplier = Math.pow(10, precision || 0);

  return Math.round(value * multiplier) / multiplier;
}

const milestoneLevels = [20, 50, 75, 100];
const milestoneDiscountFactor = 0.85;
// Assumption: levels after have constant growth factor and we compute until minimally the last tier
const numPrecomputedLevels = milestoneLevels[milestoneLevels.length - 1];
const growthFactorPastLastMilestone = 1.05;

const initialPoints = 100;

// Separated from tiers because some levels within the same tier have different growth factor calculation
// E.g. level 20 is crafter, but follows the initiate growth factor
// Assumption: we only decrease growth factor, and don't increase
const growthFactors = [
  {
    decreaseAmount: 0,
    decreaseLevelsPerSection: 0,
    endingGrowthFactor: 1.1,
    endLevel: 20,
    initialGrowthFactor: 1.1,
    startLevel: 1,
  },
  {
    decreaseAmount: 0.01,
    decreaseLevelsPerSection: 5,
    endingGrowthFactor: 1.06,
    endLevel: 50,
    initialGrowthFactor: 1.09,
    startLevel: 21,
  },
  {
    decreaseAmount: 0,
    decreaseLevelsPerSection: 0,
    endingGrowthFactor: 1.05,
    endLevel: numPrecomputedLevels,
    initialGrowthFactor: 1.05,
    startLevel: 51,
  },
];

const tierInfo: Array<TierInfo> = [
  {
    minLevel: 1,
    tier: 'initiate',
  },
  {
    minLevel: 20,
    tier: 'crafter',
  },
  {
    minLevel: 50,
    tier: 'architect',
  },
  {
    minLevel: 75,
    tier: 'master',
  },
  {
    minLevel: 100,
    tier: 'prestige',
  },
];

const pointsToNextLevel: Array<number> = Array(numPrecomputedLevels + 1).fill(
  initialPoints,
);

for (let i = 0; i < pointsToNextLevel.length; i++) {
  // Base cases - level 0 is not defined so set to 0, level 1 is already set to initialPoints
  if (i === 0) {
    pointsToNextLevel[i] = 0;
    continue;
  } else if (i === 1) {
    continue;
  }

  const growthFactorInfo = growthFactors.find(
    (info) => i >= info.startLevel && i <= info.endLevel,
  )!; // Safe because i is maximally numPrecomputedLevels

  let currentGrowthFactor = growthFactorInfo.initialGrowthFactor;

  if (growthFactorInfo.decreaseLevelsPerSection) {
    currentGrowthFactor = Math.max(
      growthFactorInfo.endingGrowthFactor,
      growthFactorInfo.initialGrowthFactor -
        growthFactorInfo.decreaseAmount *
          Math.floor(
            (i - growthFactorInfo.startLevel) /
              growthFactorInfo.decreaseLevelsPerSection,
          ),
    );
  }

  // We require the previous level to calculate the next level because of rounding
  const points = pointsToNextLevel[i - 1] * currentGrowthFactor;

  if (milestoneLevels.includes(i)) {
    pointsToNextLevel[i] = Math.round(points * milestoneDiscountFactor);
  } else {
    pointsToNextLevel[i] = Math.round(points);
  }
}

function findLastTierInfo(level: number): ProjectsReputationTier {
  for (let i = tierInfo.length - 1; i >= 0; i--) {
    if (level >= tierInfo[i].minLevel) {
      return tierInfo[i].tier;
    }
  }

  return 'initiate'; // Default if none found
}

const maxPointsOfALevelAndTier: Array<LevelInfo> = Array(
  numPrecomputedLevels + 1,
).fill({ maxPoints: 0, tier: 'initiate' });

for (let i = 1; i < maxPointsOfALevelAndTier.length; i++) {
  maxPointsOfALevelAndTier[i] = {
    maxPoints: maxPointsOfALevelAndTier[i - 1].maxPoints + pointsToNextLevel[i],
    tier: findLastTierInfo(i),
  };
}

export function projectsReputationTierForLevel(
  level: number,
): ProjectsReputationTier {
  if (level > numPrecomputedLevels) {
    return 'prestige';
  }

  return maxPointsOfALevelAndTier[level].tier;
}

export function projectsReputationLevel(points: number): Readonly<{
  level: number;
  progress: number;
  tier: ProjectsReputationTier;
}> {
  let level = maxPointsOfALevelAndTier.findIndex(
    (value) => value.maxPoints > points,
  );

  if (level !== -1) {
    const pointsNeededForLevel =
      maxPointsOfALevelAndTier[level].maxPoints -
      maxPointsOfALevelAndTier[level - 1].maxPoints;
    const progress = round(
      ((points - maxPointsOfALevelAndTier[level - 1].maxPoints) /
        pointsNeededForLevel) *
        100,
      1,
    );
    const tier = projectsReputationTierForLevel(level);

    return {
      level,
      progress,
      tier,
    };
  }

  let maxPointsOfLevelCurr =
    maxPointsOfALevelAndTier[numPrecomputedLevels].maxPoints;
  let pointsToNextLevelCurr = pointsToNextLevel[numPrecomputedLevels];

  level = numPrecomputedLevels;

  while (points >= maxPointsOfLevelCurr) {
    level++;
    pointsToNextLevelCurr = Math.round(
      pointsToNextLevelCurr * growthFactorPastLastMilestone,
    );
    maxPointsOfLevelCurr += pointsToNextLevelCurr;
  }

  const progress = round(
    100 - ((maxPointsOfLevelCurr - points) / pointsToNextLevelCurr) * 100,
    1,
  );
  const tier = projectsReputationTierForLevel(level);

  return {
    level,
    progress,
    tier,
  };
}

export function projectsReputationPointsToNextLevel(points: number): number {
  let level = maxPointsOfALevelAndTier.findIndex(
    (value) => value.maxPoints > points,
  );

  if (level !== -1) {
    return maxPointsOfALevelAndTier[level].maxPoints - points;
  }

  let maxPointsOfLevelCurr =
    maxPointsOfALevelAndTier[numPrecomputedLevels].maxPoints;
  let pointsToNextLevelCurr = pointsToNextLevel[numPrecomputedLevels];

  level = numPrecomputedLevels;

  while (points >= maxPointsOfLevelCurr) {
    level++;
    pointsToNextLevelCurr = Math.round(
      pointsToNextLevelCurr * growthFactorPastLastMilestone,
    );
    maxPointsOfLevelCurr += pointsToNextLevelCurr;
  }

  return maxPointsOfLevelCurr - points;
}
