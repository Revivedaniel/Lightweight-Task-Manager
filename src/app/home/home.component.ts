import { Component, OnInit } from '@angular/core';
import { TaskComponent } from '../components/task/task.component';
import { CommonModule } from '@angular/common';
import { TaskModel, TaskResponse } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { Subscription } from 'dexie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  tasks: TaskResponse[] = [];
  reloadSubscription!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().then((tasks) => {
      this.tasks = tasks;
      // TODO: When a DB change occurs, update the tasks
    });
  }

  orderedTasks(): TaskResponse[] {
    return this.tasks.sort((a, b) => {
      if (a.dueDate === null) {
        return 1;
      }
      if (b.dueDate === null) {
        return -1;
      }
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
  }
}
