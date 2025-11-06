import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonItem, IonInput, IonLabel, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { TaskService } from 'src/service/task.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonItem, IonInput, IonLabel, IonTextarea, IonButton]
})
export class CreateTaskPage {
  title = signal('');
  description = signal('');

  constructor(private taskService: TaskService, private router: Router) {}

  async save() {
    if (!this.title() || !this.description()) return;
    await this.taskService.createTask(this.title(), this.description());
    this.router.navigateByUrl('/home');
  }
}
