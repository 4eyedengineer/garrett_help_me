import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class JoinQueueService {
  constructor(private httpClient: HttpClient) {}
  options = {
    withCredentials: true,
  };

  getHelloWorld() {
    return this.httpClient.get(`${environment.API}/getAll`, this.options);
  }

  getNext() {
    return this.httpClient.get(`${environment.API}/getNext`);
  }

  addToQueue(queue) {
    return this.httpClient.post(
      `${environment.API}/addToQueue`,
      {
        name: queue.name,
        phone: queue.phone,
        notes: queue.comment,
        email: queue.email,
        created_on: new Date(),
      },
      {
        responseType: 'text',
      }
    );
  }

  complete() {}
}
