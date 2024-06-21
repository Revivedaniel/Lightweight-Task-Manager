import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './dynamic-header.component.html',
  styleUrl: './dynamic-header.component.scss'
})
export class DynamicHeaderComponent {
  // Jumbotron Inputs
  @Input() jumbotronText: string = "";
  @Input() includeJumbotron: boolean = true;
  // TODO: Add support for aligning the jumbotron
  @Input() alignJumbotron: "left" | "center" | "right" = "center";
}
