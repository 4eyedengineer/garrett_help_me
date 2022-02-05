/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { JoinQueueService } from './queue.service';

describe('Service: JoinQueue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoinQueueService]
    });
  });

  it('should ...', inject([JoinQueueService], (service: JoinQueueService) => {
    expect(service).toBeTruthy();
  }));
});
