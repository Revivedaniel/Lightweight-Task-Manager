import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TaskModel, TaskResponse } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit {
  mode: 'add' | 'edit' = 'add';
  taskId: number | null = null;
  readonly taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl<Date | null>(null),
  });

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.mode = 'edit';
        this.taskService.getTask(Number(id)).then((task) => {
          if (task) {
            this.taskId = task.id;
            this.taskForm.setValue({
              title: task.title,
              description: task.description,
              dueDate: task.dueDate,
            });
          } else {
            console.error('Task not found');
            this.router.navigate(['/']);
          }
        });
      }
    });
  }

  onSubmit(): void {
    console.log('Form submitted', this.taskForm.value);
    if (this.taskForm.valid) {
      if (this.mode === 'add') {
        const newTask: TaskModel = {
          title: this.taskForm.value.title!,
          description: this.taskForm.value.description!,
          dueDate: new Date(this.taskForm.value.dueDate!),
          status: 'active',
        };
        this.taskService.addTask(newTask).then(() => {
          this.router.navigate(['/']);
        });
      } else if (this.mode === 'edit') {
        const newTask: TaskResponse = {
          id: this.taskId!,
          title: this.taskForm.value.title!,
          description: this.taskForm.value.description!,
          dueDate: new Date(this.taskForm.value.dueDate!),
          status: 'active',
        };
        this.taskService.editTask(newTask).then(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
