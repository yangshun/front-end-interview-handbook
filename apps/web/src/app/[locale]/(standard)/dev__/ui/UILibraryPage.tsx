'use client';

import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import AppThemeSelect from '~/components/global/dark/AppThemeSelect';
import AlertExamples from '~/components/ui/Alert/AlertExamples';
import BadgeExamples from '~/components/ui/Badge/BadgeExamples';
import BannerExamples from '~/components/ui/Banner/BannerExamples';
import ButtonExamples from '~/components/ui/Button/ButtonExamples';
import CardExamples from '~/components/ui/Card/CardExamples';
import CheckboxInputExamples from '~/components/ui/CheckboxInput/CheckboxInputExamples';
import ChipExamples from '~/components/ui/Chip/ChipExamples';
import ColorExamples from '~/components/ui/Color/ColorExamples';
import Container from '~/components/ui/Container';
import DialogExamples from '~/components/ui/Dialog/DialogExamples';
import DropdownMenuExamples from '~/components/ui/DropdownMenu/DropdownMenuExamples';
import EmptyStateExamples from '~/components/ui/EmptyState/EmptyStateExamples';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import HeadingExamples from '~/components/ui/Heading/HeadingExamples';
import PopoverExamples from '~/components/ui/Popover/PopoverExamples';
import ProgressBarExamples from '~/components/ui/ProgressBar/ProgressBarExamples';
import RadioGroupExamples from '~/components/ui/RadioGroup/RadioGroupExamples';
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
  const { appThemePreference, setAppThemePreference } =
    useAppThemePreferences();

  return (
    <div className="grid gap-y-24 py-12 lg:py-24">
      <div className="fixed bottom-4 right-4 z-10">
        <AppThemeSelect
          colorScheme={appThemePreference}
          display="block"
          onChange={setAppThemePreference}
        />
      </div>
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
        <CheckboxInputExamples />
        <RadioGroupExamples />
        {/* Others */}
        <TabsExamples />
        <SpinnerExamples />
        <AlertExamples />
        <BadgeExamples />
        <ChipExamples />
        <ProgressBarExamples />
        <EmptyStateExamples />
        <CardExamples />
        <BannerExamples />
        {/* Layer */}
        <DropdownMenuExamples />
        <PopoverExamples />
        <TooltipExamples />
        <SlideOutExamples />
        <DialogExamples />
        <ToastExamples />
      </Section>
    </div>
  );
}
