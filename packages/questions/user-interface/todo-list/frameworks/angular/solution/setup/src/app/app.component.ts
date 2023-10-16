import { Component } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  id = 0;
  newTask = '';
  tasks: Task[] = [
    { id: this.id++, label: 'Walk the dog' },
    { id: this.id++, label: 'Water the plants' },
    { id: this.id++, label: 'Wash the dishes' },
  ];

  addTask() {
    if (this.newTask.trim().length > 0) {
      this.tasks.push({
        id: this.id++,
        label: this.newTask.trim(),
      });
      this.newTask = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(
      (task) => task.id !== id,
    );
  }
}
