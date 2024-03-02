import Alert from './Alert';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function AlertExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Alert">
      <Alert title="Hey hey look here" variant="primary">
        Just wanted to get your attention. Nothing important actually.
      </Alert>
      <Alert title="Order completed" variant="success">
        Your order has been placed! Please check your email for the
        confirmation.
      </Alert>
      <Alert title="Update available" variant="info">
        A new software update is available. See what's new in version 2.0.4.
      </Alert>
      <Alert title="Warning!" variant="warning">
        Doing that is not advisable, you are recommended to stay away from such
        practices.
      </Alert>
      <Alert title="Errors submitting" variant="danger">
        Please try again later, or close it and forget about it.
      </Alert>
      <Alert title="Super special" variant="special">
        This is super special and should be used sparingly.
      </Alert>
    </UIExamplesGroup>
  );
}
