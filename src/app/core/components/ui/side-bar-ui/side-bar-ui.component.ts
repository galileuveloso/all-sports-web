import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar-ui',
  imports: [CommonModule, RouterLink],
  templateUrl: './side-bar-ui.component.html',
  styleUrl: './side-bar-ui.component.scss',
})
export class SideBarUiComponent {

  collapsed = false;

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
