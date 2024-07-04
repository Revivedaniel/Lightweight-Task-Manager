import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  DynamicHeaderComponent,
  HeaderButton,
} from './shared/dynamic-header/dynamic-header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DataService } from './services/data.service';
import { MatTabsModule } from '@angular/material/tabs';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DynamicHeaderComponent,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  buttons: HeaderButton[] = [
    {
      functionalityType: 'Button',
      contentType: 'Icon',
      content: 'description',
      function: () => {
        this.dataService.dialogChanges.next(true);
      },
    },
    {
      functionalityType: 'Link',
      contentType: 'Text',
      content: 'Home',
      link: '/home',
    },
    {
      functionalityType: 'Link',
      contentType: 'Icon',
      content: 'add',
      link: '/new',
    },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.dialogChanges.subscribe((value) => {
      if (value) {
        this.openDialog();
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DateDialog);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      // this.resumeTask(this.task.id, result);
    });
  }
}

@Component({
  selector: 'data-options',
  templateUrl: 'dataOptions.html',
  standalone: true,
  imports: [MatDialogModule, MatTabsModule],
  providers: [],
})
export class DateDialog {
  constructor(private dataService: DataService, private taskService: TaskService) {}

  confirmation(): void {
    console.log('Dialog closed');
  }

  jsonInputUpdate(fileInputEvent: any) {
    // On change, parse the json in the file and update the tasks
    const file = fileInputEvent.target.files[0];
    this.dataService
      .readJsonFile(file)
      .then((parsedData) => {
        // TODO: Move this logic to the data service
        // TODO: Add a check to ensure the data is in the correct format
        // TODO: Add checks to ensure the data is not already in the database
        // TODO: disregard task id so that new tasks do not overwrite existing tasks
        parsedData.forEach((task: any) => {
          task.dueDate = new Date(task.dueDate);
        });
        this.taskService.addTasks(parsedData);
      })
      .catch((error) => {
        console.error('Error reading JSON file:', error);
      });
  }

  downloadJson() {
    this.taskService.getTasks().then((tasks) => {
      this.dataService.downloadJson(tasks);
    });
  }
}
