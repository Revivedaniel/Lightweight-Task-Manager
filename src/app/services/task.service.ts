import { Injectable } from '@angular/core';
import { TaskModel, TaskResponse } from '../models/task.model';
import { Observable } from 'rxjs';
import { AppDB } from '../db';
import { DexieEvent, PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor(private db: AppDB) {
   }

  addTask(task: TaskModel): PromiseExtended<number> {
    return this.db.tasks.add(task as TaskResponse);
  };

  getTasks(): PromiseExtended<TaskResponse[]> {
    return this.db.tasks.toArray();
  }

  deleteTask(id: number): PromiseExtended<void> {
    return this.db.tasks.delete(id);
  }

  editTask(task: TaskResponse): PromiseExtended<number> {
    return this.db.tasks.update(task.id, task);
  }

  cancelTask(id: number): PromiseExtended<number> {
    return this.db.tasks.update(id, { status: 'canceled', dueDate: null });
  }
}
