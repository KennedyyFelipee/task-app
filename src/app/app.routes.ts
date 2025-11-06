import { Routes } from '@angular/router';
import { authGuard } from 'src/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'create-task',
    loadComponent: () => import('./createTask/create-task.page').then(m => m.CreateTaskPage),
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then(m => m.SettingsPage),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage),
    canActivate: [authGuard]
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then(m => m.AboutPage),
    canActivate: [authGuard]
  }
];
