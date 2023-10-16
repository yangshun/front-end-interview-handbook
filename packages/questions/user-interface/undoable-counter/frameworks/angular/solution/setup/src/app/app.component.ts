import { Component, inject } from '@angular/core';
import { UndoableCounterService } from './undoable-counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  counterService = inject(UndoableCounterService);

  onReset() {
    this.counterService.resetCounter();
  }

  onUndo() {
    this.counterService.undo();
  }

  onRedo() {
    this.counterService.redo();
  }

  onClickOperation(operation: string) {
    this.counterService.clickOperation(operation);
  }
}
