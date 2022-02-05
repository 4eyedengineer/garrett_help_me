import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoinQueueService } from '../service/queue.service';

@Component({
  selector: 'app-join-queue',
  templateUrl: './join-queue.component.html',
  styleUrls: ['./join-queue.component.scss']
})
export class JoinQueueComponent implements OnInit {
  text;
  form: FormGroup;
  constructor(
    private service: JoinQueueService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
    this.service.getHelloWorld()
      .subscribe((arg: any) => {
        console.log(arg);
        this.text = arg.text;
      });
  }

  get name() {
    return this.form.get('name');
  }

  get comment() {
    return this.form.get('comment');
  }

  get phone() {
    return this.form.get('phone');
  }


 

  onSubmit() {
    const name = this.name.value;
    const comment = this.comment.value;
    const phone = this.phone.value;
    this.service.addToQueue({name, comment, phone}).subscribe();
  }


}
