import { Component } from '@angular/core';
import { DynamicHeaderComponent } from '../shared/dynamic-header/dynamic-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DynamicHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
