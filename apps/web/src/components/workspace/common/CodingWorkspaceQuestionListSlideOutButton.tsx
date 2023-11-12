import { useState } from 'react';
import { RiListUnordered } from 'react-icons/ri';

import QuestionCodingListSlideOut from '~/components/interviews/questions/listings/items/QuestionCodingListSlideOut';
import Button from '~/components/ui/Button';

export default function CodingWorkspaceQuestionListSlideOutButton() {
  const [showQuestionsSlideOut, setShowQuestionsSlideOut] = useState(false);

  return (
    <div>
      <Button
        addonPosition="start"
        icon={RiListUnordered}
        label="All Questions"
        size="xs"
        variant="secondary"
        onClick={() => setShowQuestionsSlideOut(true)}
      />
      <QuestionCodingListSlideOut
        isShown={showQuestionsSlideOut}
        onClose={() => setShowQuestionsSlideOut(false)}
      />
    </div>
  );
}
