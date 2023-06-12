'use client';

import AlertExamples from '~/components/ui/Alert/AlertExamples';
import BadgeExamples from '~/components/ui/Badge/BadgeExamples';
import BannerExamples from '~/components/ui/Banner/BannerExamples';
import ButtonExamples from '~/components/ui/Button/ButtonExamples';
import CheckboxInputExamples from '~/components/ui/CheckboxInput/CheckboxInputExamples';
import ColorExamples from '~/components/ui/Color/ColorExamples';
import Container from '~/components/ui/Container';
import DialogExamples from '~/components/ui/Dialog/DialogExamples';
import DropdownMenuExamples from '~/components/ui/DropdownMenu/DropdownMenuExamples';
import EmptyStateExamples from '~/components/ui/EmptyState/EmptyStateExamples';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import HeadingExamples from '~/components/ui/Heading/HeadingExamples';
import SelectExamples from '~/components/ui/Select/SelectExamples';
import SlideOutExamples from '~/components/ui/SlideOut/SlideOutExamples';
import SpinnerExamples from '~/components/ui/Spinner/SpinnerExamples';
import TabsExamples from '~/components/ui/Tabs/TabsExamples';
import TextExamples from '~/components/ui/Text/TextExamples';
import TypographyExamples from '~/components/ui/Text/TypographyExamples';
import TextAreaExamples from '~/components/ui/TextArea/TextAreaExamples';
import TextInputExamples from '~/components/ui/TextInput/TextInputExamples';
import ToastExamples from '~/components/ui/Toast/ToastExamples';
import TooltipExamples from '~/components/ui/Tooltip/TooltipExamples';

export default function UILibraryPage() {
  return (
    <div className="grid gap-y-24 py-12 lg:py-24">
      <Container>
        <Heading level="heading1">Design System</Heading>
      </Container>
      <Section>
        {/* Basics */}
        <ColorExamples />
        <TypographyExamples />
        <HeadingExamples />
        <TextExamples />
        {/* Form */}
        <ButtonExamples />
        <TextInputExamples />
        <TextAreaExamples />
        <SelectExamples />
        <DropdownMenuExamples />
        <CheckboxInputExamples />
        {/* Others */}
        <TabsExamples />
        <SpinnerExamples />
        <AlertExamples />
        <BadgeExamples />
        <EmptyStateExamples />
        <BannerExamples />
        {/* Layer */}
        <TooltipExamples />
        <SlideOutExamples />
        <DialogExamples />
        <ToastExamples />
      </Section>
    </div>
  );
}
