import Alert from './Alert';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function AlertExamples() {
  return (
    <UIExamplesGroup title="Alert">
      <div className="space-y-4">
        <Alert title="Order completed" variant="success">
          Your order has been placed! Please check your email for the
          confirmation.
        </Alert>
        <Alert title="Update available" variant="info">
          A new software update is available. See what's new in version 2.0.4.
        </Alert>
        <Alert title="Warning!" variant="warning">
          Doing that are not advisable, you are recommended to stay away from
          such practices.
        </Alert>
        <Alert title="Errors submitting" variant="danger">
          Please try again later, or close it and forget about it.
        </Alert>
      </div>
    </UIExamplesGroup>
  );
}
