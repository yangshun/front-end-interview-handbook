'use client';

import { useState } from 'react';

import { useIntl } from '~/components/intl';
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
  const intl = useIntl();
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-8 px-4">
        <Alert variant="warning">
          {intl.formatMessage({
            defaultMessage:
              'Coding and submission is not supported on mobile devices. Use a wider screen to practice solving this question within the editor.',
            description: 'Coding workspace not supported on mobile warning',
            id: 'sv1dLw',
          })}
        </Alert>
        <Button
          display="block"
          label={
            showSolution
              ? intl.formatMessage({
                  defaultMessage: 'Hide solution',
                  description: 'Coding workspace hide solution button',
                  id: 'AKgBO+',
                })
              : intl.formatMessage({
                  defaultMessage: 'View the solution',
                  description: 'Coding workspace show solution button',
                  id: 'gLY3I/',
                })
          }
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
