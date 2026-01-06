import { Injectable, Signal, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    tasks=signal<Task[]>([]);
    constructor(){
        const tasks=localStorage.getItem('tasks');
        if(tasks){
            this.tasks.set(JSON.parse(tasks));
        }
    }
    addTask(taskData: {title: string; description: string}) {       
    this.tasks.update(tasks => [{
        id:Math.random().toString(36).substring(2, 15),status:'OPEN',
        title:taskData.title,
        description:taskData.description
          },...tasks]);

    this.saveTasks();
    }
    updateTaskStatus(taskId: string, status: TaskStatus) {
        this.tasks.update(tasks => {
            return tasks.map(task => {      
                if (task.id === taskId) {
                    return { ...task, status };
                }                               
                return task;
            });
        });
        this.saveTasks();
    }
    removeTask(taskId: string) {
        this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
        this.saveTasks();
    }   
    private saveTasks(){
        localStorage.setItem('tasks',JSON.stringify(this.tasks()));
    }
}