import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DynamicHeaderComponent, HeaderButton } from './shared/dynamic-header/dynamic-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DynamicHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // TODO: Create a service to manage the tasks.
  // TODO: Make the app a PWA.
  buttons: HeaderButton[] = [
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
}
