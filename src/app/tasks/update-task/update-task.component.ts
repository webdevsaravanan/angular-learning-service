import { Component, ElementRef, viewChild,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  onUpdateTask(title: string, description: string) {
    if(!title || !description){
      return;
    } 
    this.taskService.updateTask({taskId: this.taskId, title, description, updatedOn: new Date()});
    this.formEl()?.nativeElement.reset();
    this.activeModal.close();
  }
}
