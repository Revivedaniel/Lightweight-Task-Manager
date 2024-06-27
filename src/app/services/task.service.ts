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

  getTasks(): Observable<Task[]> {
    return new Observable<Task[]>(observer => {
      setTimeout(() => {
        observer.next([
          {
            title: 'Task 1',
            description: 'This is the first task',
            dueDate: new Date()
          },
          {
            title: 'Task 2',
            description: 'This is the second task',
            dueDate: new Date()
          },
          {
            title: 'Task 3',
            description: 'This is the third task',
            dueDate: new Date()
          }
        ]);
        observer.complete();
      }, 1000);
    });
  }
}
