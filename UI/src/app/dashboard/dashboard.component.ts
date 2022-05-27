import { Component, OnInit } from '@angular/core';
import { JoinQueueService } from '../service/queue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
