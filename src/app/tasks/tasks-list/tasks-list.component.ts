import { Component, inject, signal } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewTaskComponent } from '../new-task/new-task.component';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  selectedFilter = signal<string[]>(['OPEN','IN_PROGRESS']);
  private taskService=inject(TaskService);
  tasks = this.taskService.tasks;
private modalService = inject(NgbModal);
  onChangeTasksFilter(newFilter: string) {
    if(newFilter==='all'){
      this.selectedFilter.update(filters=>['OPEN','IN_PROGRESS','DONE']);
      return;
    }
    if(newFilter==='open/in-progress'){
      this.selectedFilter.update(filters=>['OPEN','IN_PROGRESS']);
      return;
    }
    switch (newFilter) {
      case 'open':
        newFilter = 'OPEN';
        break;
      case 'in-progress':
        newFilter = 'IN_PROGRESS';
        break;
      case 'done':
        newFilter = 'DONE';
        break;
      default:
        newFilter = 'all';
        break;
    }
    this.selectedFilter.update(filters=>[newFilter]);
  }
  open() {
		this.modalService.open(NewTaskComponent );
	}
}
