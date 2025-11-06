import { Injectable, signal } from '@angular/core';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks = signal<Task[]>([]);

  constructor(private auth: AuthService) {}

  async loadTasks() {
    const userId = this.auth.getUserId();
    if (!userId) return;

    const q = query(collection(db, 'tasks'), where('userId', '==', userId));
    const snapshot = await getDocs(q);

    const loaded = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Task));

    this.tasks.set(loaded);
  }

  async createTask(title: string, description: string) {
    const userId = this.auth.getUserId();
    if (!userId) return;

    const task: Task = {
      title,
      description,
      createdAt: Date.now(),
      userId, 
      completed: false
    };

    await addDoc(collection(db, 'tasks'), task);
    await this.loadTasks();
  }

  async deleteTask(id: string) {
    await deleteDoc(doc(db, 'tasks', id));
    await this.loadTasks();
  }

  async updateTask(id: string, title: string, description: string) {
    await updateDoc(doc(db, 'tasks', id), { title, description });
    await this.loadTasks();
  }

  async addTask(title: string) {
    await this.createTask(title, '');
  }

  async editTask(id: string, title: string) {
    await updateDoc(doc(db, 'tasks', id), { title });
    await this.loadTasks();
  }

  async toggleTask(id: string) {
    const current = this.tasks().find(t => t.id === id);
    if (!current) return;

    const updated = {
      ...current,
      completed: !current['completed']
    };

    await updateDoc(doc(db, 'tasks', id), updated);
    await this.loadTasks();
  }
}
