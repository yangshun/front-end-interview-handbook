import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { useToast } from '~/components/global/toasts/useToast';
import Alert from '~/components/ui/Alert';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';

import type { SponsorsAdRequestStatus } from '@prisma/client';

type Props = Readonly<{
  requestId: string;
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

export default function SponsorsAdminAdRequestMessage({
  status,
  review,
  requestId,
}: Props) {
  const { showToast } = useToast();
  const trpcUtils = trpc.useUtils();
  const requestApproveMutation =
    trpc.sponsorships.adRequestApprove.useMutation();
  const requestRejectMutation = trpc.sponsorships.adRequestReject.useMutation();
  const [showApproveConfirmation, setShowApproveConfirmation] = useState(false);
  const [rejectConfirmation, setRejectConfirmation] = useState({
    reason: '',
    show: false,
  });

  async function onApproveRequest() {
    await requestApproveMutation.mutateAsync(
      { id: requestId },
      {
        onSuccess: () => {
          showToast({
            title: 'Request has been approved!',
            variant: 'success',
          });
          trpcUtils.sponsorships.getAdRequest.invalidate({ id: requestId });
          setShowApproveConfirmation(false);
        },
      },
    );
  }

  async function onRejectRequest() {
    await requestRejectMutation.mutateAsync(
      { comments: rejectConfirmation.reason, id: requestId },
      {
        onSuccess: () => {
          showToast({
            title: 'Request has been rejected!',
            variant: 'success',
          });
          trpcUtils.sponsorships.getAdRequest.invalidate({ id: requestId });
          setRejectConfirmation({
            reason: '',
            show: false,
          });
        },
      },
    );
  }

  return (
    <>
      {status === 'APPROVED' && (
        <Alert className="mb-4 lg:mb-6" title="Request approved" variant="info">
          <div className="flex flex-col gap-2.5">
            <div>Advertising request has been approved.</div>
            <ReviewDetail review={review} />
          </div>
        </Alert>
      )}
      {status === 'PUBLISHED' && (
        <Alert
          className="mb-4 lg:mb-6"
          title="Request confirmed"
          variant="info">
          <div className="flex flex-col gap-2.5">
            <div>
              Advertising request has been approved, paid and confirmed.
            </div>
            <ReviewDetail review={review} />
          </div>
        </Alert>
      )}
      {status === 'REJECTED' && (
        <Alert
          className="lg:mb-6, mb-4 flex-1"
          title="Request rejected"
          variant="danger">
          <div className="flex flex-col gap-2.5">
            <div>
              Advertising request has been rejected.
              <br />
              {review?.comments && (
                <>
                  <strong>Rejection reason :</strong> {review?.comments}
                </>
              )}
            </div>
            <ReviewDetail review={review} />
          </div>
        </Alert>
      )}
      {status === 'PENDING' && (
        <Alert
          className="mb-4lg:mb-6"
          title="Request pending"
          variant="warning">
          <div className="flex flex-col gap-x-4 gap-y-3 md:flex-row lg:gap-x-10">
            <div className="flex-1">
              Advertising request is pending approval. Please review the
              request.
            </div>
            <div className="flex gap-2">
              <Button
                label="Reject"
                size="md"
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
                size="md"
                variant="primary"
                onClick={() => setShowApproveConfirmation(true)}
              />
            </div>
          </div>
        </Alert>
      )}

      <ConfirmationDialog
        confirmButtonLabel="Approve"
        confirmButtonVariant="success"
        isDisabled={requestApproveMutation.isLoading}
        isLoading={requestApproveMutation.isLoading}
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
          !rejectConfirmation.reason || requestRejectMutation.isLoading
        }
        isLoading={requestRejectMutation.isLoading}
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
    </>
  );
}

function ReviewDetail({ review }: Readonly<{ review: Props['review'] }>) {
  return (
    <div className="flex gap-3">
      <Text color="subtitle" size="body2">
        Reviewed by: {review?.profile.name || review?.profile.username}
      </Text>
      {review?.createdAt && (
        <Text color="subtitle" size="body2">
          Reviewed at: <RelativeTimestamp timestamp={review.createdAt} />
        </Text>
      )}
    </div>
  );
}
