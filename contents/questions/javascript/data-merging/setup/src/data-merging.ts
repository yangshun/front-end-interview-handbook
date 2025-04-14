type Session = { user: number; duration: number; equipment: Array<string> };

export default function mergeData(sessions: Array<Session>): Array<Session> {
  const results: Array<{
    user: number;
    duration: number;
    equipment: Set<string>;
  }> = [];
  const sessionsForUser = new Map();

  sessions.forEach((session) => {
    if (sessionsForUser.has(session.user)) {
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
      sessionsForUser.set(session.user, clonedSession);
      results.push(clonedSession);
    }
  });

  // Sort equipment of each session and convert back into array.
  return results.map((session) => ({
    ...session,
    equipment: Array.from(session.equipment).sort(),
  }));
}
