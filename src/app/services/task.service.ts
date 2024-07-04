import { Injectable } from '@angular/core';
import { TaskModel, TaskResponse } from '../models/task.model';
import { Observable, Subject } from 'rxjs';
import { AppDB } from '../db';
import { DexieEvent, PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasksChanged: Subject<boolean> = new Subject<boolean>();
  constructor(private db: AppDB) {
   }

  addTask(task: TaskModel): PromiseExtended<number> {
    return this.db.tasks.add(task as TaskResponse);
  };

  addTasks(tasks: TaskModel[]): PromiseExtended<number> {
    const response = this.db.tasks.bulkAdd(tasks as TaskResponse[]);
    this.tasksChanged.next(true);
    return response;
  }

  getTasks(): PromiseExtended<TaskResponse[]> {
    return this.db.tasks.toArray();
  }
  getTask(id: number): PromiseExtended<TaskResponse | undefined> {
    return this.db.tasks.get(id);
  }

  deleteTask(id: number): PromiseExtended<void> {
    const response = this.db.tasks.delete(id);
    this.tasksChanged.next(true);
    return response;
  }

  editTask(task: TaskResponse): PromiseExtended<number> {
    const response = this.db.tasks.update(task.id, task);
    this.tasksChanged.next(true);
    return response;
  }

  cancelTask(id: number): PromiseExtended<number> {
    const response = this.db.tasks.update(id, { status: 'canceled', dueDate: null });
    this.tasksChanged.next(true);
    return response;
  }

  completeTask(id: number): PromiseExtended<number> {
    const response = this.db.tasks.update(id, { status: 'completed', dueDate: null});
    this.tasksChanged.next(true);
    return response;
  }

  resumeTask(id: number, dueDate: Date): PromiseExtended<number> {
    const response = this.db.tasks.update(id, { status: 'active', dueDate });
    this.tasksChanged.next(true);
    return response;
  }
}
