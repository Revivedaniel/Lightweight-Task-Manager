import { Component, inject, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { TaskResponse } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task: TaskResponse = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    status: 'active',
  };
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DateDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.resumeTask(this.task.id, result);
    });
  }
  constructor(private taskService: TaskService, private router: Router) {}

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  editTask(id: number) {
    // Navigate to the edit task page
    this.router.navigate(['/edit', id]);
  }

  markTaskAsComplete(id: number) {
    this.taskService.completeTask(id);
  }

  cancelTask(id: number) {
    this.taskService.cancelTask(id);
  }

  resumeTask(id: number, newDate: Date) {
    this.taskService.resumeTask(id, newDate);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'taskDateUpdate.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()]
})
export class DateDialog {
  readonly dateForm = new FormGroup({
    dueDate: new FormControl<Date | null>(null),
  });
}
