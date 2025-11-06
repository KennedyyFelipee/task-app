  import { Routes } from '@angular/router';

  export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
    },
    {
      path: 'home',
      loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    },
    {
      path: 'create-task',
      loadComponent: () => import('./createTask/create-task.page').then( m => m.CreateTaskPage)
    },
    {
      path: 'settings',
      loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
    },
    {
      path: 'profile',
      loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
    },
    {
      path: 'about',
      loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
    },
  ];
