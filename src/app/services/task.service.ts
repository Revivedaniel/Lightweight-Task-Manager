import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { AppDB } from '../db';
import { PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor(private db: AppDB) {
   }

  addTask(task: Task): PromiseExtended<number> {
    // TODO: Implement Dexie.js to save the task to IndexedDB
    return this.db.tasks.add(task);
  };

  getTasks(): PromiseExtended<Task[]> {
    return this.db.tasks.toArray();
  }
}
