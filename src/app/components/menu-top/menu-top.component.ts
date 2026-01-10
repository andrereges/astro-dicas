import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'menu-top',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent {

  menuItems = [
    { label: 'Home', link: '/tips' }
  ];

}