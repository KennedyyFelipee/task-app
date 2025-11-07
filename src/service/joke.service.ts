import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  joke = signal<string>(''); 
  constructor(private http: HttpClient) {}
  
  async getRandomJoke() {
    try {
      const res: any = await this.http
        .get('https://v2.jokeapi.dev/joke/Any?type=single')
        .toPromise();

      if (res?.joke) {
        this.joke.set(res.joke);
      } else {
        this.joke.set('Não consegui achar uma piada agora 😅');
      }
    } catch (err) {
      console.error('Erro ao buscar piada:', err);
      this.joke.set('Erro ao carregar piada 😢');
    }
  }
}
