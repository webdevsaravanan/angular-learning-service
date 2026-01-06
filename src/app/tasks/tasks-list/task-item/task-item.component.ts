import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../../task.model';
import { TaskService } from '../../task.service';
import { UpdateTaskComponent } from '../../update-task/update-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  private taskService = inject(TaskService);
  private modalService = inject(NgbModal);
  
  task = input.required<Task>();
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
      let newStatus: TaskStatus='OPEN';
    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
        
    }
    this.taskService.updateTaskStatus(taskId, newStatus);
  }
  onRemoveTaskClick(taskId: string) {
    this.taskService.removeTask(taskId);
  }
  updateTask() {
    this.taskService.setTaskBeingEdited(this.task().id);
    this.modalService.open(UpdateTaskComponent );
  }
}
