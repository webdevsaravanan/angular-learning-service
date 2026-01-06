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
  selectedFilter = signal<string>('all');
  private taskService=inject(TaskService);
  tasks = this.taskService.tasks;
private modalService = inject(NgbModal);
  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
  open() {
		const modalRef = this.modalService.open(NewTaskComponent);
		modalRef.componentInstance.name = 'World';
	}
}
