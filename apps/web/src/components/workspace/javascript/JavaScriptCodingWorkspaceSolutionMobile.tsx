import { useState } from 'react';
import Button from '~/components/ui/Button';
import JavaScriptCodingWorkspaceSolutionTab from './JavaScriptCodingWorkspaceSolutionTab';

type Props = Readonly<{
  solution: string | null;
}>;

export default function JavaScriptCodingWorkspaceSolutionMobile({
  solution,
}: Props) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 px-4">
        <Button
          display="block"
          variant="secondary"
          label={showSolution ? 'Hide solution' : 'View the solution'}
          onClick={() => {
            setShowSolution(!showSolution);
          }}
        />
      </div>
      {showSolution && (
        <JavaScriptCodingWorkspaceSolutionTab solution={solution} />
      )}
    </div>
  );
}
