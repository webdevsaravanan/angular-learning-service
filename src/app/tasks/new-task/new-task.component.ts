import { Component, ElementRef, viewChild,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  activeModal = inject(NgbActiveModal);
constructor(private taskService: TaskService) {}
  onAddTask(title: string, description: string) {
    if(!title || !description){
      return;
    } 
    this.taskService.addTask({title, description, createdOn: new Date()});
    this.formEl()?.nativeElement.reset();
  }
}
