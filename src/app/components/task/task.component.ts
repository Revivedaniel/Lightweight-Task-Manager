import { Component, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { TaskResponse } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    MatExpansionModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  // TODO: Add a button to edit the task
  // TODO: Add a button to mark the task as complete
  // TODO: Add a button to resume the task aka add a due date to the task
  @Input() task: TaskResponse = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    status: 'active',
  };
  readonly panelOpenState = signal(false);

  constructor(private taskService: TaskService, private router: Router) {}

  deleteTask(id: number) {
    this.taskService.deleteTask(id)
  }

  editTask(id: number) {
    // Navigate to the edit task page
    this.router.navigate(['/edit', id]);
  }

  markTaskAsComplete() {}

  cancelTask(id: number) {
    this.taskService.cancelTask(id)
  }

  resumeTask() {}
}
