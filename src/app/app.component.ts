import { Component, computed, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/service/auth.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, IonicModule, RouterModule]
})
export class AppComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  isLoggedIn = computed(() => this.auth.isLoggedIn());
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
