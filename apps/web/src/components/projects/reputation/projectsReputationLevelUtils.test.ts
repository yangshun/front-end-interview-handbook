import { describe, expect, test } from 'vitest';

import {
  projectsReputationLevel,
  projectsReputationPointsToNextLevel,
  projectsReputationTierForLevel,
} from './projectsReputationLevelUtils';

describe('projectsReputationTierForLevel', () => {
  describe('initiate', () => {
    test('left end of range', () => {
      const level = 1;

      expect(projectsReputationTierForLevel(level)).toEqual('initiate');
    });

    test('middle of range', () => {
      const level = 10;

      expect(projectsReputationTierForLevel(level)).toEqual('initiate');
    });

    test('middle of range', () => {
      const level = 19;

      expect(projectsReputationTierForLevel(level)).toEqual('initiate');
    });
  });

  describe('crafter', () => {
    test('left end of range', () => {
      const level = 20;

      expect(projectsReputationTierForLevel(level)).toEqual('crafter');
    });

    test('middle of range', () => {
      const level = 35;

      expect(projectsReputationTierForLevel(level)).toEqual('crafter');
    });

    test('middle of range', () => {
      const level = 49;

      expect(projectsReputationTierForLevel(level)).toEqual('crafter');
    });
  });

  describe('architect', () => {
    test('left end of range', () => {
      const level = 50;

      expect(projectsReputationTierForLevel(level)).toEqual('architect');
    });

    test('middle of range', () => {
      const level = 60;

      expect(projectsReputationTierForLevel(level)).toEqual('architect');
    });

    test('middle of range', () => {
      const level = 74;

      expect(projectsReputationTierForLevel(level)).toEqual('architect');
    });
  });

  describe('master', () => {
    test('left end of range', () => {
      const level = 75;

      expect(projectsReputationTierForLevel(level)).toEqual('master');
    });

    test('middle of range', () => {
      const level = 85;

      expect(projectsReputationTierForLevel(level)).toEqual('master');
    });

    test('right end of range', () => {
      const level = 99;

      expect(projectsReputationTierForLevel(level)).toEqual('master');
    });
  });

  describe('prestige', () => {
    test('left end of range', () => {
      const level = 100;

      expect(projectsReputationTierForLevel(level)).toEqual('prestige');
    });

    test('middle of range', () => {
      const level = 150;

      expect(projectsReputationTierForLevel(level)).toEqual('prestige');
    });
  });
});

describe('projectsReputationLevel and projectsReputationPointsToNextLevel', () => {
  describe('initial growth factor', () => {
    test('level 1', () => {
      const points = 0;

      expect(projectsReputationLevel(points)).toEqual({
        level: 1,
        progress: 0,
        tier: 'initiate',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(100);
    });

    test('level 10', () => {
      const points = 1381;

      expect(projectsReputationLevel(points)).toEqual({
        level: 10,
        progress: 9.7,
        tier: 'initiate',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(214);
    });

    test('level 19', () => {
      const points = 5087;

      expect(projectsReputationLevel(points)).toEqual({
        level: 19,
        progress: 90,
        tier: 'initiate',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(56);
    });

    test('milestone level 20', () => {
      const points = 5666;

      expect(projectsReputationLevel(points)).toEqual({
        level: 20,
        progress: 99.8,
        tier: 'crafter',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(1);
    });
  });

  describe('mid growth factor', () => {
    test('level 21', () => {
      const points = 6000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 21,
        progress: 58.3,
        tier: 'crafter',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(238);
    });

    test('level 26', () => {
      const points = 9500;

      expect(projectsReputationLevel(points)).toEqual({
        level: 26,
        progress: 47.9,
        tier: 'crafter',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(453);
    });

    test('level 33', () => {
      const points = 17000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 33,
        progress: 13,
        tier: 'crafter',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(1262);
    });

    test('level 40', () => {
      const points = 31410;

      expect(projectsReputationLevel(points)).toEqual({
        level: 40,
        progress: 100,
        tier: 'crafter',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(1);
    });

    test('level 49', () => {
      const points = 58000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 49,
        progress: 86,
        tier: 'crafter',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(525);
    });

    test('milestone level 50', () => {
      const points = 61000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 50,
        progress: 73,
        tier: 'architect',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(914);
    });
  });

  describe('high growth factor', () => {
    test('level 51', () => {
      const points = 63000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 51,
        progress: 30.5,
        tier: 'architect',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(2472);
    });

    test('level 66', () => {
      const points = 140000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 66,
        progress: 17.8,
        tier: 'architect',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(6080);
    });

    test('milestone level 75', () => {
      const points = 220300;

      expect(projectsReputationLevel(points)).toEqual({
        level: 75,
        progress: 0.7,
        tier: 'master',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(9679);
    });

    test('level 76', () => {
      const points = 235000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 76,
        progress: 49,
        tier: 'master',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(5218);
    });

    test('milestone level 100', () => {
      const points = 700000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 100,
        progress: 51.3,
        tier: 'prestige',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(13674);
    });

    test('level 101', () => {
      const points = 716621;

      expect(projectsReputationLevel(points)).toEqual({
        level: 101,
        progress: 10,
        tier: 'prestige',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(26522);
    });

    test('level 115', () => {
      const points = 1300000;

      expect(projectsReputationLevel(points)).toEqual({
        level: 115,
        progress: 15,
        tier: 'prestige',
      });

      expect(projectsReputationPointsToNextLevel(points)).toEqual(49568);
    });
  });
});
