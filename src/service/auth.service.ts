import { Injectable, inject, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { environment } from 'src/environments/environment.prod';
import { UserService, AppUser } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  private userService = inject(UserService);

  user = signal<User | null>(null);
  isLoggedIn = signal(false);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
      this.isLoggedIn.set(!!user);
    });
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);

    const userData: AppUser = {
      uid: cred.user.uid,
      email: cred.user.email ?? ''
    };

    await this.userService.saveUser(userData);

    return cred;
  }

  logout() {
    return signOut(this.auth);
  }

  getUserId(): string {
    return this.user()?.uid ?? '';
  }
}
