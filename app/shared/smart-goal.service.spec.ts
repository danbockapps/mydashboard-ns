import { TestBed, inject } from '@angular/core/testing';

import { SmartGoalService } from './smart-goal.service';

describe('SmartGoalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartGoalService]
    });
  });

  it('should be created', inject([SmartGoalService], (service: SmartGoalService) => {
    expect(service).toBeTruthy();
  }));
});
