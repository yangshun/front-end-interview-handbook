import React, { createContext, useContext, useMemo } from 'react';

import type { User } from '@supabase/supabase-js';

type ProjectsDiscussionContextType = {
  user: User | null;
};

const ProjectsDiscussionContext = createContext<ProjectsDiscussionContextType>({
  user: null,
});

export function useProjectsDiscussionContext() {
  return useContext(ProjectsDiscussionContext);
}

type Props = Readonly<{
  children: React.ReactNode;
  user: User | null;
}>;

export default function ProjectsDiscussionContextProvider({
  user,
  children,
}: Props) {
  const value = useMemo(
    () => ({ user } satisfies ProjectsDiscussionContextType),
    [user],
  );

  return (
    <ProjectsDiscussionContext.Provider value={value}>
      {children}
    </ProjectsDiscussionContext.Provider>
  );
}
