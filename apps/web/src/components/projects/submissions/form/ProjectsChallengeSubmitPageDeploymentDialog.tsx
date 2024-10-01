import { useState } from 'react';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Prose from '~/components/ui/Prose';

import useProjectsDeploymentInfo from '../../hooks/useProjectsDeploymentInfo';

export default function ProjectsChallengeSubmitPageDeploymentDialog() {
  const intl = useIntl();
  const [isDeploymentDialogShown, setIsDeploymentDialogShown] = useState(false);
  const {
    postRecommendedHostsText,
    preRecommendedHostsText,
    recommendedHosts,
    title,
  } = useProjectsDeploymentInfo();

  return (
    <div className="-ms-3">
      <Button
        className="dark:!text-brand !text-brand-dark"
        label={intl.formatMessage({
          defaultMessage: 'Deployment instructions',
          description: 'Label for button to open deployment instructions',
          id: 'FD+Giz',
        })}
        size="sm"
        variant="tertiary"
        onClick={(event) => {
          event.preventDefault();
          setIsDeploymentDialogShown(true);
        }}
      />
      <Dialog
        isShown={isDeploymentDialogShown}
        title={title}
        width="screen-sm"
        onClose={() => setIsDeploymentDialogShown(false)}>
        <Prose>
          <p>{preRecommendedHostsText}</p>
          <ul>
            {recommendedHosts.map((host) => (
              <li key={host.id}>
                <Anchor href={host.href}>{host.content}</Anchor>
              </li>
            ))}
          </ul>
          <p>{postRecommendedHostsText}</p>
        </Prose>
      </Dialog>
    </div>
  );
}
