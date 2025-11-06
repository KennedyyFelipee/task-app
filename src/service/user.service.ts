import { Injectable } from '@angular/core';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AppUser {
  uid: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersCollection = collection(db, 'users');

  async saveUser(user: AppUser) {
    const userRef = doc(this.usersCollection, user.uid);
    await setDoc(userRef, user);
  }

  async getUser(uid: string): Promise<AppUser | null> {
    const userRef = doc(this.usersCollection, uid);
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? (snapshot.data() as AppUser) : null;
  }
}
