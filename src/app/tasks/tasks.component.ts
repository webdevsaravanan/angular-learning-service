import { Component } from '@angular/core';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [TasksListComponent],
})
export class TasksComponent {}
