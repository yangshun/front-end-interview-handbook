import {
  Component,
  HostListener,
  Input,
} from '@angular/core';
import { Section } from '../app.component';

export function generateId(): string {
  return Math.random().toString(36).substring(2);
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  @Input()
  sections!: Section[];

  openSections = new Set<string>();
  accordionId = generateId();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const activeElement =
      document.activeElement as HTMLElement;
    const activeItemValue = activeElement.getAttribute(
      'data-accordion-value',
    );

    if (activeItemValue == null) {
      return;
    }

    const index = this.sections.findIndex(
      (section) => section.value === activeItemValue,
    );

    switch (event.code) {
      case 'ArrowUp':
        this.focusOnSection(
          (index - 1 + this.sections.length) %
            this.sections.length,
        );
        break;
      case 'ArrowDown':
        this.focusOnSection(
          (index + 1) % this.sections.length,
        );
        break;
      case 'Home':
        this.focusOnSection(0);
        break;
      case 'End':
        this.focusOnSection(this.sections.length - 1);
        break;
      default:
        break;
    }
  }

  private focusOnSection(index: number): void {
    const section = this.sections[index];
    const headerId = this.getAccordionHeaderId(
      this.accordionId,
      section.value,
    );
    const element = document.getElementById(headerId);
    element?.focus();
  }

  getAccordionHeaderId(
    accordionId: string,
    value: string,
  ): string {
    return accordionId + '-header-' + value;
  }

  getAccordionPanelId(
    accordionId: string,
    value: string,
  ): string {
    return accordionId + '-panel-' + value;
  }

  isOpen(value: string): boolean {
    return this.openSections.has(value);
  }

  toggleSection(value: string): void {
    if (this.openSections.has(value)) {
      this.openSections.delete(value);
    } else {
      this.openSections.add(value);
    }
  }
}
