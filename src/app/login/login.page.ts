import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email = signal('');
  password = signal('');
  isLoading = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async login() {
    this.isLoading.set(true);
    try {
      await this.auth.login(this.email(), this.password());
      this.router.navigateByUrl('/home');
    } catch (err: any) {
      const toast = await this.toastCtrl.create({
        message: err.message || 'Erro ao fazer login',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } finally {
      this.isLoading.set(false);
    }
  }

  async register() {
    this.isLoading.set(true);
    try {
      await this.auth.register(this.email(), this.password());
      this.router.navigateByUrl('/home');
    } catch (err: any) {
      const toast = await this.toastCtrl.create({
        message: err.message || 'Erro ao registrar',
        duration: 3000,
        color: 'danger'
      });
      toast.present();
    } finally {
      this.isLoading.set(false);
    }
  }
}
