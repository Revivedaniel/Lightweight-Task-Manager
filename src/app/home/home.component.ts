import { Component } from '@angular/core';
import { DynamicHeaderComponent } from '../shared/dynamic-header/dynamic-header.component';
import { TaskComponent } from '../components/task/task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DynamicHeaderComponent, TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
