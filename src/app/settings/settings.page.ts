import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonButtons, IonMenuButton } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})

export class SettingsPage implements OnInit {
  constructor() {}
  ngOnInit() {}

  toggleTheme(isDark: boolean) {
  document.body.classList.toggle('dark-theme', isDark);
 }

}

