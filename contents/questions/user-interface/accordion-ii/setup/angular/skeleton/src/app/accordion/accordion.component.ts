import { Component, Input } from '@angular/core';
import { Section } from '../app.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  @Input()
  sections!: Section[];

  openSections = new Set<string>();

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
