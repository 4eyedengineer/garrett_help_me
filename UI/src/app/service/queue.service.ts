import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JoinQueueService {

  constructor(private httpClient: HttpClient ) { }

  getHelloWorld() {
      return this.httpClient.get('http://localhost:3000/getAll');
  }

  getNext() {
    return this.httpClient.get('http://localhost:3000/getNext');
  }

  addToQueue(queue) {
    return this.httpClient.post('http://localhost:3000/addToQueue', {
      name: queue.name,
      phone: queue.phone,
      notes: queue.comment,
      created_on: new Date()
    },
    {
      responseType: 'text'
    });
  }

  complete() {

  }

}
