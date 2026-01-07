import { Component, ElementRef, viewChild,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskStatus } from '../task.model';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  activeModal = inject(NgbActiveModal);
  taskId = this.taskService.getEditingTaskId();
  taskDetails = this.taskService.getTaskById(this.taskId);

constructor(private taskService: TaskService) {}
  onUpdateTask(title: string, description: string, status: string) {
    if(!title || !description){
      return;
    } 
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
    this.taskService.updateTask({taskId: this.taskId, title, description, status: newStatus});
    this.formEl()?.nativeElement.reset();
    this.activeModal.close();
  }
}
