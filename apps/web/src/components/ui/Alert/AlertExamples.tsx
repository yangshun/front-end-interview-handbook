import clsx from 'clsx';
import { RiGraduationCapLine } from 'react-icons/ri';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import { themeBorderBrandColor, themeTextInvertColor } from '../theme';
import Alert from './Alert';

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
      <Alert title="Some normal title" variant="neutral">
        Just a neutral title, don't pay too much attention to it.
      </Alert>
      <Alert title="Super special" variant="special">
        This is super special and should be used sparingly.
      </Alert>
      <Alert
        icon={RiGraduationCapLine}
        title="Student discounts"
        variant="special">
        Students can sign up with Projects Platform with their .edu emails to
        receive special rates 40% off on the pricing plans.
        <span
          className="size-14 absolute -right-0.5 -top-0.5 overflow-hidden"
          style={{
            clipPath: 'polygon(50% 0, 100% 50%, 100% 100%, 0 100%, 0 0)',
          }}>
          <span
            className={clsx('absolute block', [
              themeBorderBrandColor,
              'border-[9999px] !border-b-transparent !border-l-transparent',
            ])}
          />
          <span
            className={clsx(
              'absolute left-1/2 top-1/2 -translate-x-[calc(50%-6px)] -translate-y-full rotate-45',
              'text-2xs font-medium uppercase',
              themeTextInvertColor,
            )}>
            Limited
          </span>
        </span>
      </Alert>
    </UIExamplesGroup>
  );
}
