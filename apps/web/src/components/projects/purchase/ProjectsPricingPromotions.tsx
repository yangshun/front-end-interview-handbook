'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  RiArrowRightLine,
  RiGraduationCapLine,
  RiQuillPenLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import usePromotionsReviewCashbackLabels from '~/components/promotions/review/usePromotionsReviewCashbackLabels';
import useStudentDiscountLabels from '~/components/promotions/student/usePromotionsStudentDiscountLabels';
import Alert from '~/components/ui/Alert';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import {
  themeBackgroundBrandColor,
  themeBorderBrandColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextInvertColor,
} from '~/components/ui/theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

function LimitedRibbon() {
  const intl = useIntl();

  return (
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
        {intl.formatMessage({
          defaultMessage: 'Limited',
          description: 'Label for limited time promotion',
          id: '+f18YC',
        })}
      </span>
    </span>
  );
}

export default function ProjectsPricingPromotions() {
  const intl = useIntl();
  const [index, setIndex] = useState(0);
  const studentDiscountLabels = useStudentDiscountLabels();
  const reviewCashbackDiscountLabels = usePromotionsReviewCashbackLabels();
  const timer = useRef<NodeJS.Timeout>();

  const alerts = [
    {
      description: studentDiscountLabels.subtitle,
      icon: RiGraduationCapLine,
      title: studentDiscountLabels.title,
      value: 'student',
    },
    {
      description: reviewCashbackDiscountLabels.subtitle,
      icon: RiQuillPenLine,
      title: reviewCashbackDiscountLabels.title,
      value: 'cashback',
    },
  ];

  useEffect(() => {
    timer.current = setTimeout(() => {
      setIndex((index + 1) % alerts.length);
    }, 5000);

    return () => {
      window.clearTimeout(timer.current);
    };
  }, [alerts.length, index]);

  const alertValue = alerts[index].value;

  return (
    <Container className="py-6" width="4xl">
      <TabsPrimitive.Root
        className="flex flex-col gap-8"
        value={alertValue}
        onValueChange={(newValue) => {
          // Stop auto-advancing if user interacts with steppers.
          window.clearTimeout(timer.current);
          setIndex(alerts.findIndex(({ value }) => value === newValue));
        }}>
        <div className="min-h-28">
          {alerts.map((alert) => (
            <TabsPrimitive.Content key={alert.value} value={alert.value}>
              <Alert
                key={alert.value}
                icon={alert.icon}
                title={alert.title}
                variant="special">
                <div className="flex flex-col gap-4 md:flex-row">
                  {alert.description}
                  <Button
                    href="/promotions"
                    icon={RiArrowRightLine}
                    label={intl.formatMessage({
                      defaultMessage: 'Check it out',
                      description: 'Check it out button label',
                      id: 'g7IcyE',
                    })}
                    variant="secondary"
                  />
                </div>
                <LimitedRibbon />
              </Alert>
            </TabsPrimitive.Content>
          ))}
        </div>
        <TabsPrimitive.List className="flex justify-center gap-4">
          {alerts.map((alert) => (
            <TabsPrimitive.Trigger
              key={alert.value}
              asChild={true}
              value={alert.value}>
              <button
                aria-label={alert.title}
                className={clsx(
                  'h-[5px] w-10 rounded',
                  alert,
                  alert.value === alertValue
                    ? themeBackgroundBrandColor
                    : 'bg-neutral-200/70 dark:bg-neutral-700',
                  themeOutlineElement_FocusVisible,
                  themeOutlineElementBrandColor_FocusVisible,
                )}
                type="button"
              />
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </TabsPrimitive.Root>
    </Container>
  );
}
