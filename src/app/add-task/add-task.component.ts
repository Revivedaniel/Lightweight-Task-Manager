import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  value = '';
  readonly taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl(''),
  });

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    console.log('Form submitted', this.taskForm.value);
    if (this.taskForm.valid) {
      const newTask: TaskModel = {
        title: this.taskForm.value.title!,
        description: this.taskForm.value.description!,
        dueDate: new Date(this.taskForm.value.dueDate!),
      }
      this.taskService.addTask(newTask).then(id => {
        console.log('Task added with id', id);
      })
    }
  }
}
