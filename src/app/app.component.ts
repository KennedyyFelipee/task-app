import { Component, inject, signal } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/service/auth.service';
import { filter } from 'rxjs/operators';

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
  private menu = inject(MenuController);

  showMenu = signal(true);

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const isLoginPage = this.router.url.includes('/login');
      const isLoggedIn = this.auth.isLoggedIn();
      const shouldShowMenu = isLoggedIn && !isLoginPage;

      this.showMenu.set(shouldShowMenu);
      this.menu.enable(shouldShowMenu);
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
