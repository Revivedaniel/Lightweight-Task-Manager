// db.ts
import Dexie, { Table } from 'dexie';
import { Task } from './models/task.model';

export class AppDB extends Dexie {
  tasks!: Table<Task, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      tasks: '++id, title, description, dueDate',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.tasks.bulkAdd([
      {
        title: 'Task 1',
        description: 'This is the first task',
        dueDate: new Date(),
      },
      {
        title: 'Task 2',
        description: 'This is the second task',
        dueDate: new Date(),
      },
      {
        title: 'Task 3',
        description: 'This is the third task',
        dueDate: new Date(),
      },
    ]);
  }
}

export const db = new AppDB();
