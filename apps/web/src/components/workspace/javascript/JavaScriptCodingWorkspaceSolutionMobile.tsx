import { useState } from 'react';

import Alert from '~/components/ui/Alert';
import Button from '~/components/ui/Button';

import JavaScriptCodingWorkspaceSolutionTab from './JavaScriptCodingWorkspaceSolutionTab';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  solution: string | null;
}>;

export default function JavaScriptCodingWorkspaceSolutionMobile({
  canViewPremiumContent,
  solution,
}: Props) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-8 px-4">
        <Alert variant="warning">
          Coding and submission is not supported on mobile devices. Use a wider
          screen to practice solving this question within the editor.
        </Alert>
        <Button
          display="block"
          label={showSolution ? 'Hide solution' : 'View the solution'}
          variant="secondary"
          onClick={() => {
            setShowSolution(!showSolution);
          }}
        />
      </div>
      {showSolution && (
        <JavaScriptCodingWorkspaceSolutionTab
          canViewPremiumContent={canViewPremiumContent}
          solution={solution}
        />
      )}
    </div>
  );
}
