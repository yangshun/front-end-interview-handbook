import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from '~/components/ui/Dialog';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundDarkColor,
  themeBackgroundInvertColor,
  themeBorderColor,
} from '~/components/ui/theme';

import AuthForm from './AuthForm';
import AuthTestimonialSlider from './AuthTestimonialSlider';
import { InterviewsMarketingTestimonialsDict } from '../interviews/marketing/testimonials/InterviewsMarketingTestimonials';

type Props = Readonly<{
  isShown: boolean;
  next?: string;
  onClose?: () => void;
}>;

export default function AuthDialog({ isShown, onClose, next }: Props) {
  const intl = useIntl();
  const testimonialsObjects = InterviewsMarketingTestimonialsDict(intl);
  const users = [
    {
      image: testimonialsObjects.yuChienChan.authorThumbnailUrl,
      name: testimonialsObjects.yuChienChan.name,
    },
    {
      image: testimonialsObjects.chenweiZhang.authorThumbnailUrl,
      name: testimonialsObjects.chenweiZhang.name,
    },
    {
      image: testimonialsObjects.anand.authorThumbnailUrl,
      name: testimonialsObjects.anand.name,
    },
    {
      image: testimonialsObjects.shoaibAhmed.authorThumbnailUrl,
      name: testimonialsObjects.shoaibAhmed.name,
    },
    {
      image: testimonialsObjects.luke.authorThumbnailUrl,
      name: testimonialsObjects.luke.name,
    },
  ];

  return (
    <DialogRoot
      open={isShown}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}>
      <DialogPortal>
        <DialogOverlay>
          <div
            className={clsx(
              'relative',
              ['w-auto', 'mx-auto max-w-[428px] px-6 lg:max-w-[1069px]'],
              'pointer-events-none',
              'flex min-h-full items-center',
            )}>
            <DialogContent
              className={themeBackgroundDarkColor}
              contentClassName="relative !p-0 lg:h-[670px] lg:max-h-[670px]">
              {onClose && (
                <DialogClose asChild={true}>
                  <Button
                    className="absolute right-6 top-[68px] z-[1]"
                    icon={RiCloseLine}
                    isLabelHidden={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Close menu',
                      description: 'Button to close menu',
                      id: 'NVGZEe',
                    })}
                    size="xs"
                    type="button"
                    variant="tertiary"
                    onClick={() => onClose()}
                  />
                </DialogClose>
              )}
              <DialogBody className="!mt-0 h-full">
                <div
                  className={clsx(
                    'px-6 py-1.5',
                    'text-center',
                    themeBackgroundInvertColor,
                  )}>
                  <Text color="invert" size="body3" weight="medium">
                    {intl.formatMessage({
                      defaultMessage:
                        'Please sign in or create an account to continue',
                      description: 'Subtitle of auth sign up dialog',
                      id: 'bOVGLU',
                    })}
                  </Text>
                </div>
                <div className={clsx('flex h-full w-full')}>
                  <div
                    className={clsx(
                      'flex justify-center',
                      'w-full lg:w-[420px] lg:max-w-none',
                      'p-6',
                      ['lg:border-r', themeBorderColor],
                      themeBackgroundCardWhiteOnLightColor,
                    )}>
                    <div
                      className={clsx(
                        'mx-auto w-full',
                        'flex max-w-[324px] flex-col gap-y-6 lg:justify-center',
                      )}>
                      <AuthForm next={next} variant="compact" view="sign_up" />
                    </div>
                  </div>
                  <ScrollArea
                    className="hidden flex-1 lg:block"
                    viewportClass={clsx('h-[642px]', 'flex')}>
                    <div
                      className={clsx(
                        'flex min-h-[642px] flex-col justify-between gap-10',
                        'px-12 pb-6 pt-20',
                      )}>
                      <div
                        className={clsx(
                          'relative w-full flex-1',
                          'flex items-center justify-center',
                        )}>
                        <AuthTestimonialSlider variant="compact" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="whitespace-nowrap">
                          {users.map((item, index) => (
                            <Avatar
                              key={item.name}
                              alt={item.name ?? ''}
                              className={clsx(
                                'size-6',
                                [
                                  'border',
                                  'border-white dark:border-neutral-900',
                                ],
                                'relative',
                                index > 0 && '-ml-1',
                              )}
                              size="custom"
                              src={item.image!}
                            />
                          ))}
                        </div>
                        <Text color="subtitle" size="body3" weight="medium">
                          {intl.formatMessage(
                            {
                              defaultMessage:
                                "Don't fall behind {count} other users",
                              description: 'Auth dialog testimonials subtitle',
                              id: 'P9zzt7',
                            },
                            { count: '500k+' },
                          )}
                        </Text>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </DialogBody>
            </DialogContent>
          </div>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
}
