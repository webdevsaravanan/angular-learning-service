import { Injectable, Signal, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    tasks=signal<Task[]>([]);
    taskBeingEditedId: string ="";
    constructor(){
        const tasks=localStorage.getItem('tasks');
        if(tasks){
            this.tasks.set(JSON.parse(tasks));
        }
    }
    setTaskBeingEdited(taskId: string) {
        this.taskBeingEditedId = taskId;
    }
    getEditingTaskId(): string {
        return this.taskBeingEditedId;
    }
    
    getTaskById(taskId: string): Task | undefined {
        return this.tasks().find(task => task.id === taskId);
    }
    addTask(taskData: {title: string; description: string, createdOn: Date}) {       
    this.tasks.update(tasks => [{
        id:Math.random().toString(36).substring(2, 15),status:'OPEN',
        title:taskData.title,
        description:taskData.description,
        createdOn: taskData.createdOn
          },...tasks]);

    this.saveTasks();
    }
    updateTaskStatus(taskId: string, status: TaskStatus) {
        this.tasks.update(tasks => {
            return tasks.map(task => {      
                if (task.id === taskId) {
                    if(status==='DONE'){
                        return { ...task, status, completedOn: new Date() };
                    }
                    if(status==='OPEN' || status==='IN_PROGRESS'){
                        return { ...task, status, updatedOn: new Date(), completedOn: undefined,createdOn: undefined };
                    }
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
    updateTask(taskData: {taskId: string; title: string; description: string, updatedOn: Date}) {       
        this.tasks.update(tasks => {
            return tasks.map(task => {
                if (task.id === taskData.taskId) {
                    return { ...task, title: taskData.title, description: taskData.description, updatedOn: taskData.updatedOn };
                }
                return task;
            });
        });
        this.saveTasks();
    }
    private saveTasks(){
        localStorage.setItem('tasks',JSON.stringify(this.tasks()));
    }
}