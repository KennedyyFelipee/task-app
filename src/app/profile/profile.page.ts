import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonButtons, IonMenuButton } from '@ionic/angular';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule ]
})
export class ProfilePage implements OnInit {
  constructor() {}
  ngOnInit() {}

    private auth = inject(AuthService);
    private router = inject(Router);

   logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}

