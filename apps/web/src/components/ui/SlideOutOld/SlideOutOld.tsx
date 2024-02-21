import {
  SlideOut,
  SlideOutContent,
  SlideOutDescription,
  SlideOutFooter,
  SlideOutHeader,
  SlideOutTitle,
  SlideOutTrigger,
} from '../SlideOut';

type SlideOutSize = 'lg' | 'md' | 'sm' | 'xl' | 'xs';
type SlideOutEnterFrom = 'end' | 'start';

type Props = Readonly<{
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  enterFrom?: SlideOutEnterFrom;
  isShown?: boolean;
  isTitleHidden?: boolean;
  onClose?: () => void;
  padding?: boolean;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  size: SlideOutSize;
  title?: string;
  trigger: React.ReactNode;
}>;

export default function SlideOutOld({
  asChild = true,
  className,
  children,
  enterFrom = 'end',
  isShown,
  size,
  primaryButton,
  title,
  trigger,
  secondaryButton,
  onClose,
  padding = true,
}: Props) {
  return (
    <SlideOut
      open={isShown}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}>
      <SlideOutTrigger asChild={asChild}>{trigger}</SlideOutTrigger>
      <SlideOutContent className={className} enterFrom={enterFrom} size={size}>
        <SlideOutHeader>
          {title && <SlideOutTitle>{title}</SlideOutTitle>}
        </SlideOutHeader>
        <SlideOutDescription padding={padding}>{children}</SlideOutDescription>
        {primaryButton && (
          <SlideOutFooter>
            {primaryButton}
            {secondaryButton}
          </SlideOutFooter>
        )}
      </SlideOutContent>
    </SlideOut>
  );
}
