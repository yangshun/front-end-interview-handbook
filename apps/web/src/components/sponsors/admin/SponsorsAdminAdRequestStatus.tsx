import type { SponsorsAdRequestStatus } from '@prisma/client';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import Alert from '~/components/ui/Alert';
import Button from '~/components/ui/Button';
import TextArea from '~/components/ui/TextArea';

type Props = Readonly<{
  adRequestId: string;
  review: Readonly<{
    comments: string | null;
    createdAt: Date;
    profile: Readonly<{
      name: string | null;
      username: string;
    }>;
  }> | null;
  status: SponsorsAdRequestStatus;
}>;

export default function SponsorsAdminAdRequestStatus({
  status,
  review,
  adRequestId,
}: Props) {
  const { showToast } = useToast();
  const trpcUtils = trpc.useUtils();
  const adRequestApproveMutation = trpc.sponsors.adRequestApprove.useMutation();
  const adRequestRejectMutation = trpc.sponsors.adRequestReject.useMutation();
  const [showApproveConfirmation, setShowApproveConfirmation] = useState(false);
  const [rejectConfirmation, setRejectConfirmation] = useState({
    reason: '',
    show: false,
  });

  async function onApproveRequest() {
    await adRequestApproveMutation.mutateAsync(
      { id: adRequestId },
      {
        onSuccess: () => {
          showToast({
            title: 'Request has been approved!',
            variant: 'success',
          });
          trpcUtils.sponsors.adRequest.invalidate({ id: adRequestId });
          setShowApproveConfirmation(false);
        },
      },
    );
  }

  async function onRejectRequest() {
    await adRequestRejectMutation.mutateAsync(
      { comments: rejectConfirmation.reason, id: adRequestId },
      {
        onSuccess: () => {
          showToast({
            title: 'Request has been rejected!',
            variant: 'success',
          });
          trpcUtils.sponsors.adRequest.invalidate({ id: adRequestId });
          setRejectConfirmation({
            reason: '',
            show: false,
          });
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {status === 'APPROVED' && (
        <Alert title="Request approved" variant="info">
          Advertising request has been approved.
        </Alert>
      )}
      {status === 'PUBLISHED' && (
        <Alert title="Request confirmed" variant="success">
          Advertising request has been approved, paid and confirmed.
        </Alert>
      )}
      {status === 'REJECTED' && (
        <Alert title="Request rejected" variant="danger">
          Advertising request has been rejected.
          <br />
          {review?.comments && (
            <>
              <strong>Rejection reason:</strong> {review?.comments}
            </>
          )}
        </Alert>
      )}
      {status === 'PENDING' && (
        <Alert title="Request pending" variant="warning">
          <div className="flex flex-col gap-x-4 gap-y-3 md:flex-row lg:gap-x-10">
            <div className="flex-1">
              Advertising request is pending approval. Please review the
              request.
            </div>
            <div className="flex gap-2">
              <Button
                label="Reject"
                size="sm"
                variant="danger"
                onClick={() =>
                  setRejectConfirmation({
                    reason: '',
                    show: true,
                  })
                }
              />
              <Button
                label="Approve"
                size="sm"
                variant="success"
                onClick={() => setShowApproveConfirmation(true)}
              />
            </div>
          </div>
        </Alert>
      )}
      <ConfirmationDialog
        confirmButtonLabel="Approve"
        confirmButtonVariant="success"
        isDisabled={adRequestApproveMutation.isLoading}
        isLoading={adRequestApproveMutation.isLoading}
        isShown={showApproveConfirmation}
        title="Approve ad request"
        onCancel={() => setShowApproveConfirmation(false)}
        onConfirm={onApproveRequest}>
        Are you sure you want to approve this ad request?
      </ConfirmationDialog>
      <ConfirmationDialog
        confirmButtonLabel="Reject"
        confirmButtonVariant="danger"
        isDisabled={
          !rejectConfirmation.reason || adRequestRejectMutation.isLoading
        }
        isLoading={adRequestRejectMutation.isLoading}
        isShown={rejectConfirmation.show}
        title="Reject ad request"
        onCancel={() =>
          setRejectConfirmation({
            reason: '',
            show: false,
          })
        }
        onConfirm={onRejectRequest}>
        <TextArea
          label="Reason for rejection"
          required={true}
          value={rejectConfirmation.reason}
          onChange={(value) =>
            setRejectConfirmation((prev) => ({
              ...prev,
              reason: value,
            }))
          }
        />
      </ConfirmationDialog>
    </div>
  );
}
