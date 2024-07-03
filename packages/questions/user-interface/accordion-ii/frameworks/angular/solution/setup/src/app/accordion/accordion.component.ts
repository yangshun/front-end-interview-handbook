import { Component, Input } from '@angular/core';
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

  accordionId = generateId();

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
