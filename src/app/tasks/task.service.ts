import { Injectable, signal } from "@angular/core";
import { Task } from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    tasks=signal<Task[]>([]);
    constructor(){
        const tasks=localStorage.getItem('tasks');
        if(tasks){
            this.tasks=JSON.parse(tasks);
        }
    }
    addTask(taskData: {title: string; description: string}) {
    this.tasks.unshift({
        id:Math.random().toString(36).substring(2, 15),status:'OPEN',
title:taskData.title,
description:taskData.description
          });
    this.saveTasks();
    }
    private saveTasks(){        localStorage.setItem('tasks',JSON.stringify(this.tasks));
    }
}