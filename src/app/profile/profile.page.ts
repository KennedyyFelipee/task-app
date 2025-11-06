import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';


import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle, IonContent } from '@ionic/angular/standalone';

import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.page.html',
  imports: [IonContent, 
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    AsyncPipe,
  ],
})
export class ProfilePage {
  private auth = inject(Auth);
  user$: Observable<User | null> = authState(this.auth);
}
