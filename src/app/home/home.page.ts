import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
  IonButtons, IonMenuButton, IonList, IonLabel, IonIcon,
  IonItemSliding, IonCheckbox, IonItemOptions, IonItemOption,
  IonButton, AlertController
} from '@ionic/angular/standalone';
import { TaskService } from 'src/service/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem,
    IonButtons, IonMenuButton, IonList, IonLabel, IonIcon,
    IonItemSliding, IonCheckbox, IonItemOptions, IonItemOption, IonButton
  ],
})
export class HomePage implements OnInit {
  private taskService = inject(TaskService);
  private alertCtrl = inject(AlertController);
  tasks = this.taskService.tasks;

  ngOnInit() {
    this.taskService.loadTasks();
  }

  toggleTask(id: string | undefined) {
     if (!id) return;
    this.taskService.toggleTask(id);
  }

  async addTask() {
    const alert = await this.alertCtrl.create({
      header: 'Nova Tarefa',
      inputs: [{ name: 'title', type: 'text', placeholder: 'Título da tarefa' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: (data) => {
            if (data.title.trim()) {
              this.taskService.addTask(data.title);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editTask(id: string | undefined, currentTitle: string, currentDescription: string) {
    if (!id) return;

    const alert = await this.alertCtrl.create({
      header: 'Editar Tarefa',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: currentTitle,
          placeholder: 'Título'
        },
        {
          name: 'description',
          type: 'textarea',
          value: currentDescription,
          placeholder: 'Descrição'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            if (data.title.trim()) {
              this.taskService.updateTask(id, data.title, data.description ?? '');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  deleteTask(id: string | undefined) {
     if (!id) return;
    this.taskService.deleteTask(id);
  }
}
