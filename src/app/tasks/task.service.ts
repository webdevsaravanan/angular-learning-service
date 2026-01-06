import { Injectable, signal } from "@angular/core";
import { Task } from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    tasks=signal<Task[]>([]);

    addTask(taskData: {title: string; description: string}) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(36).substring(2, 15),
            status:'OPEN'
        };
        this.tasks.update(tasks => [...tasks, newTask]);
    }
}