'use client';

import clsx from 'clsx';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import ColorSchemeSelect from '~/components/global/color-scheme/ColorSchemeSelect';
import AccordionExamples from '~/components/ui/Accordion/AccordionExamples';
import AlertExamples from '~/components/ui/Alert/AlertExamples';
import AnchorExamples from '~/components/ui/Anchor/AnchorExamples';
import AvatarExamples from '~/components/ui/Avatar/AvatarExamples';
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
import FilterButtonExamples from '~/components/ui/FilterButton/FilterButtonExamples';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import HeadingExamples from '~/components/ui/Heading/HeadingExamples';
import HovercardExamples from '~/components/ui/Hovercard/HovercardExamples';
import PaginationExamples from '~/components/ui/Pagination/PaginationExamples';
import PopoverExamples from '~/components/ui/Popover/PopoverExamples';
import ProgressBarExamples from '~/components/ui/ProgressBar/ProgressBarExamples';
import RadioGroupExamples from '~/components/ui/RadioGroup/RadioGroupExamples';
import RichTextEditorExamples from '~/components/ui/RichTextEditor/RichTextEditorExamples';
import SelectExamples from '~/components/ui/Select/SelectExamples';
import SlideOutExamples from '~/components/ui/SlideOut/SlideOutExamples';
import SpinnerExamples from '~/components/ui/Spinner/SpinnerExamples';
import TableExamples from '~/components/ui/Table/TableExamples';
import TabsExamples from '~/components/ui/Tabs/TabsExamples';
import TextExamples from '~/components/ui/Text/TextExamples';
import TypographyExamples from '~/components/ui/Text/TypographyExamples';
import TextAreaExamples from '~/components/ui/TextArea/TextAreaExamples';
import TextInputExamples from '~/components/ui/TextInput/TextInputExamples';
import ToastExamples from '~/components/ui/Toast/ToastExamples';
import TooltipExamples from '~/components/ui/Tooltip/TooltipExamples';
import TypeaheadExamples from '~/components/ui/Typeahead/TypeaheadExamples';

import ProductThemeSelect from './ProductThemeSelect';

export default function UILibraryPage() {
  const { colorSchemePreference, setColorSchemePreference } =
    useColorSchemePreferences();

  return (
    <div className="grid gap-y-24 py-12 lg:py-24">
      <div
        className={clsx(
          'flex flex-col gap-2',
          'z-fixed fixed bottom-4 right-4',
        )}>
        <ProductThemeSelect />
        <ColorSchemeSelect
          colorScheme={colorSchemePreference}
          display="block"
          onChange={setColorSchemePreference}
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
        <AnchorExamples />
        <TableExamples />
        {/* Form */}
        <ButtonExamples />
        <FilterButtonExamples />
        <TextInputExamples />
        <TextAreaExamples />
        <SelectExamples />
        <CheckboxInputExamples />
        <RadioGroupExamples />
        <TypeaheadExamples />
        <RichTextEditorExamples />
        {/* Navigation */}
        <TabsExamples />
        <PaginationExamples />
        {/* Others */}
        <AvatarExamples />
        <AlertExamples />
        <BadgeExamples />
        <ChipExamples />
        <EmptyStateExamples />
        <CardExamples />
        <BannerExamples />
        <AccordionExamples />
        {/* Progress */}
        <SpinnerExamples />
        <ProgressBarExamples />
        {/* Layer */}
        <DropdownMenuExamples />
        <PopoverExamples />
        <TooltipExamples />
        <SlideOutExamples />
        <DialogExamples />
        <ToastExamples />
        <HovercardExamples />
      </Section>
    </div>
  );
}
