import { Component, OnInit } from '@angular/core';
import { JoinQueueService } from '../service/queue.service';

@Component({
  selector: 'app-manage-queue',
  templateUrl: './manage-queue.component.html',
  styleUrls: ['./manage-queue.component.scss']
})
export class ManageQueueComponent implements OnInit {
  data;

  constructor(private service: JoinQueueService) { }

  ngOnInit() {
    this.service.getHelloWorld().subscribe((res: any) => this.data = res.text);
  }

  refresh() {
    this.service.getHelloWorld().subscribe((res: any) => this.data = res.text);
  }

  complete() {

  }

  getNext() {
    //just testing
    this.service.getNext().subscribe((x: any) => console.log("next ticket:", x.text));
  }

  add() {
    // this.service.addToQueue().subscribe();
  }


}
