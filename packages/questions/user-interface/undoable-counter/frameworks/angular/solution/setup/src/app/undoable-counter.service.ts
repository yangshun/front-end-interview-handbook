import { Injectable } from '@angular/core';
import { Operation, History } from './app.models';

const OPERATIONS: { [key: string]: Operation } = {
  '/2': { type: 'divide', number: 2 },
  '-1': { type: 'decrement', number: 1 },
  '+1': { type: 'increment', number: 1 },
  x2: { type: 'multiply', number: 2 },
};

@Injectable({
  providedIn: 'root',
})
export class UndoableCounterService {
  counter = 0;
  history: History[] = [];
  undoHistory: History[] = [];

  performOperation(
    counter: number,
    operationLabel: string,
  ): number {
    const operation = OPERATIONS[operationLabel];
    switch (operation.type) {
      case 'increment':
        return counter + operation.number;
      case 'decrement':
        return counter - operation.number;
      case 'multiply':
        return counter * operation.number;
      case 'divide':
        return counter / operation.number;
      default:
        return counter;
    }
  }

  resetCounter() {
    this.counter = 0;
    this.history = [];
    this.undoHistory = [];
  }

  undo() {
    const [latest, ...earlierHistory] = this.history;
    this.counter = latest.oldCounter;
    this.undoHistory = [latest, ...this.undoHistory];
    this.history = earlierHistory;
  }

  redo() {
    const [latest, ...earlierUndoHistory] =
      this.undoHistory;
    this.counter = latest.newCounter;
    this.undoHistory = earlierUndoHistory;
    this.history = [latest, ...this.history];
  }

  clickOperation(operation: string) {
    const oldCounter = this.counter;
    const newCounter = this.performOperation(
      this.counter,
      operation,
    );
    this.counter = newCounter;
    this.history = [
      { operation, oldCounter, newCounter },
      ...this.history,
    ];
    this.undoHistory = [];
  }
}
