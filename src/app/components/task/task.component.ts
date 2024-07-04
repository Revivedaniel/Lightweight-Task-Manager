import { Component, Input, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatIconModule, CommonModule, MatExpansionModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  // TODO: When the task is clicked, it should expand the task and show additional options
  // TODO: Add a button to delete the task
  // TODO: Add a button to edit the task
  // TODO: Add a button to mark the task as complete
  // TODO: Add a button to cancel the task aka remove the due date
  // TODO: Add a button to resume the task aka add a due date to the task
  @Input() task: Task = {
    title: '',
    description: '',
    dueDate: new Date()
  };
  readonly panelOpenState = signal(false);
}
