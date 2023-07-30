function setHasOverlap(setA, setB) {
  // Bundler doesn't transpile properly when doing for-of for sets.
  for (const val of Array.from(setA)) {
    if (setB.has(val)) {
      return true;
    }
  }

  return false;
}

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @param {{user?: number, minDuration?: number, equipment?: Array<string>, merge?: boolean}} [options]
 * @return {Array}
 */
export default function selectData(sessions, options = {}) {
  const reversedSessions = sessions.slice().reverse(); // Make a copy and reverse.
  const sessionsForUser = new Map();
  const sessionsProcessed = [];

  reversedSessions.forEach((session) => {
    if (options.merge && sessionsForUser.has(session.user)) {
      const userSession = sessionsForUser.get(session.user);
      userSession.duration += session.duration;
      session.equipment.forEach((equipment) => {
        userSession.equipment.add(equipment);
      });
    } else {
      const clonedSession = {
        ...session,
        equipment: new Set(session.equipment),
      };

      if (options.merge) {
        sessionsForUser.set(session.user, clonedSession);
      }

      sessionsProcessed.push(clonedSession);
    }
  });

  sessionsProcessed.reverse();

  const results = [];
  const optionEquipments = new Set(options.equipment);
  sessionsProcessed.forEach((session) => {
    if (
      (options.user != null && options.user !== session.user) ||
      (optionEquipments.size > 0 &&
        !setHasOverlap(optionEquipments, session.equipment)) ||
      (options.minDuration != null && options.minDuration > session.duration)
    ) {
      return;
    }

    results.push({
      ...session,
      equipment: Array.from(session.equipment).sort(),
    });
  });

  return results;
}
