import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useId } from 'react';

const ORIGINAL_HEIGHT = 98;
const ORIGINAL_WIDTH = 156;
const ORIGINAL_WIDTH_WIDE = 209;

function TicketBorderWide() {
  const borderId = useId();

  return (
    <svg
      className="absolute inset-0 aspect-[209/98] fill-white dark:fill-neutral-950"
      viewBox={`0 0 ${ORIGINAL_WIDTH_WIDE} ${ORIGINAL_HEIGHT}`}
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 4.21506C0.5 2.23889 2.42716 0.5 4.98807 0.5H204.012C206.573 0.5 208.5 2.23889 208.5 4.21505V39.2114C208.5 40.1889 207.684 41.0387 206.602 41.279C202.585 42.1715 199.521 45.2918 199.521 49.1054C199.521 52.919 202.585 56.0393 206.602 56.9317C207.684 57.1721 208.5 58.0219 208.5 58.9994V93.785C208.5 95.7611 206.573 97.5 204.012 97.5H4.98807C2.42716 97.5 0.5 95.7611 0.5 93.785V58.9994C0.5 58.0219 1.3159 57.1721 2.39765 56.9317C6.41498 56.0393 9.47852 52.919 9.47852 49.1054C9.47852 45.2918 6.41498 42.1715 2.39765 41.279C1.3159 41.0387 0.5 40.1889 0.5 39.2114V4.21506Z"
        stroke={`url(#${borderId})`}
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={borderId}
          x1="4.16888"
          x2="182.638"
          y1="52.7964"
          y2="-15.0927">
          <stop stopColor="#3E3ECA" />
          <stop offset="0.520167" stopColor="#DCC0FF" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TicketBorder() {
  const borderId = useId();

  return (
    <svg
      className="absolute inset-0 aspect-[156/98] fill-white dark:fill-neutral-950"
      viewBox={`0 0 ${ORIGINAL_WIDTH} ${ORIGINAL_HEIGHT}`}
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 4.21506C0.5 2.10317 1.99956 0.5 3.72315 0.5H152.277C154 0.5 155.5 2.10317 155.5 4.21505V39.2114C155.5 40.1858 154.663 41.049 153.562 41.4931C150.758 42.6248 148.798 45.6288 148.798 49.1054C148.798 52.582 150.758 55.586 153.562 56.7177C154.663 57.1618 155.5 58.0249 155.5 58.9994V93.785C155.5 95.8968 154 97.5 152.277 97.5H3.72315C1.99956 97.5 0.5 95.8968 0.5 93.785V58.9994C0.5 58.0249 1.33732 57.1618 2.43784 56.7177C5.24204 55.586 7.20167 52.582 7.20167 49.1054C7.20167 45.6288 5.24204 42.6248 2.43784 41.4931C1.33732 41.049 0.5 40.1858 0.5 39.2114V4.21506Z"
        stroke={`url(#${borderId})`}
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={borderId}
          x1="3.1117"
          x2="144.223"
          y1="52.7964"
          y2="12.7303">
          <stop stopColor="#3E3ECA" />
          <stop offset="0.520167" stopColor="#DCC0FF" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TicketPlainBorderWide() {
  const borderId = useId();

  return (
    <svg
      className="absolute inset-0 aspect-[209/98] fill-white dark:fill-neutral-900"
      viewBox={`0 0 ${ORIGINAL_WIDTH_WIDE} ${ORIGINAL_HEIGHT}`}
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 4.21506C0.5 2.23889 2.42716 0.5 4.98807 0.5H204.012C206.573 0.5 208.5 2.23889 208.5 4.21505V39.2114C208.5 40.1889 207.684 41.0387 206.602 41.279C202.585 42.1715 199.521 45.2918 199.521 49.1054C199.521 52.919 202.585 56.0393 206.602 56.9317C207.684 57.1721 208.5 58.0219 208.5 58.9994V93.785C208.5 95.7611 206.573 97.5 204.012 97.5H4.98807C2.42716 97.5 0.5 95.7611 0.5 93.785V58.9994C0.5 58.0219 1.3159 57.1721 2.39765 56.9317C6.41498 56.0393 9.47852 52.919 9.47852 49.1054C9.47852 45.2918 6.41498 42.1715 2.39765 41.279C1.3159 41.0387 0.5 40.1889 0.5 39.2114V4.21506Z"
        stroke={`url(#${borderId})`}
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={borderId}
          x1="4.16888"
          x2="182.638"
          y1="52.7964"
          y2="-15.0927">
          <stop
            className="text-neutral-300 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TicketPlainBorder() {
  const borderId = useId();

  return (
    <svg
      className="absolute inset-0 aspect-[156/98] fill-white dark:fill-neutral-900"
      viewBox={`0 0 ${ORIGINAL_WIDTH} ${ORIGINAL_HEIGHT}`}
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 4.21506C0.5 2.10317 1.99956 0.5 3.72315 0.5H152.277C154 0.5 155.5 2.10317 155.5 4.21505V39.2114C155.5 40.1858 154.663 41.049 153.562 41.4931C150.758 42.6248 148.798 45.6288 148.798 49.1054C148.798 52.582 150.758 55.586 153.562 56.7177C154.663 57.1618 155.5 58.0249 155.5 58.9994V93.785C155.5 95.8968 154 97.5 152.277 97.5H3.72315C1.99956 97.5 0.5 95.8968 0.5 93.785V58.9994C0.5 58.0249 1.33732 57.1618 2.43784 56.7177C5.24204 55.586 7.20167 52.582 7.20167 49.1054C7.20167 45.6288 5.24204 42.6248 2.43784 41.4931C1.33732 41.049 0.5 40.1858 0.5 39.2114V4.21506Z"
        stroke={`url(#${borderId})`}
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={borderId}
          x1="3.1117"
          x2="144.223"
          y1="52.7964"
          y2="12.7303">
          <stop
            className="text-neutral-300 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
          />
          <stop
            className="text-neutral-300 dark:text-neutral-800"
            offset="1"
            stopColor="currentColor"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Ticket({
  children,
  height,
  padding = 'lg',
  ratio = 'normal',
  width,
  variant = 'gradient',
}: Readonly<{
  children: ReactNode;
  height?: number;
  padding?: 'lg' | 'md' | 'none' | 'sm';
  ratio?: 'normal' | 'wide';
  variant?: 'gradient' | 'normal';
  width?: number;
}>) {
  return (
    <div
      className={clsx(
        'relative shrink-0',
        ratio === 'normal' ? 'aspect-[156/98]' : 'aspect-[209/98]',
      )}
      style={{
        height,
        width,
      }}>
      {variant === 'gradient' ? (
        ratio === 'normal' ? (
          <TicketBorder />
        ) : (
          <TicketBorderWide />
        )
      ) : ratio === 'normal' ? (
        <TicketPlainBorder />
      ) : (
        <TicketPlainBorderWide />
      )}

      <div
        className={clsx(
          'absolute inset-0',
          padding === 'lg' && 'px-8 py-5',
          padding === 'md' && 'px-6 py-5',
          padding === 'sm' && 'px-5 py-4',
        )}>
        {children}
      </div>
    </div>
  );
}
