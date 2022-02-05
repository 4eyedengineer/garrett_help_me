import { Component, OnInit } from '@angular/core';
import { JoinQueueService } from '../service/queue.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private service: JoinQueueService) { }

  ngOnInit() {
  }

  getNext() {
    this.service.getNext().subscribe();
  }

  add() {
    // this.service.addToQueue().subscribe();
  }

}
