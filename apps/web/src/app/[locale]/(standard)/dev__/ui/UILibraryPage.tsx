'use client';

import AlertExamples from '~/components/ui/Alert/AlertExamples';
import BadgeExamples from '~/components/ui/Badge/BadgeExamples';
import BannerExamples from '~/components/ui/Banner/BannerExamples';
import ButtonExamples from '~/components/ui/Button/ButtonExamples';
import Container from '~/components/ui/Container';
import DialogExamples from '~/components/ui/Dialog/DialogExamples';
import DropdownMenuExamples from '~/components/ui/DropdownMenu/DropdownMenuExamples';
import EmptyStateExamples from '~/components/ui/EmptyState/EmptyStateExamples';
import HeadingExamples from '~/components/ui/Heading/HeadingExamples';
import HoverCardExamples from '~/components/ui/Hovercard/HovercardExamples';
import SelectExamples from '~/components/ui/Select/SelectExamples';
import SlideOutExamples from '~/components/ui/SlideOut/SlideOutExamples';
import SpinnerExamples from '~/components/ui/Spinner/SpinnerExamples';
import TabsExamples from '~/components/ui/Tabs/TabsExamples';
import TextExamples from '~/components/ui/Text/TextExamples';
import TypographyExamples from '~/components/ui/Text/TypographyExamples';
import TextAreaExamples from '~/components/ui/TextArea/TextAreaExamples';
import TextInputExamples from '~/components/ui/TextInput/TextInputExamples';
import TooltipExamples from '~/components/ui/Tooltip/TooltipExamples';

export default function UILibraryPage() {
  return (
    <Container>
      <div className="space-y-24 py-12 lg:py-24">
        <TypographyExamples />
        <HeadingExamples />
        <TextExamples />
        <ButtonExamples />
        <SpinnerExamples />
        <TabsExamples />
        <SelectExamples />
        <TextInputExamples />
        <TextAreaExamples />
        <BannerExamples />
        <AlertExamples />
        <BadgeExamples />
        <DropdownMenuExamples />
        <TooltipExamples />
        <HoverCardExamples />
        <SlideOutExamples />
        <DialogExamples />
        <EmptyStateExamples />
      </div>
    </Container>
  );
}
