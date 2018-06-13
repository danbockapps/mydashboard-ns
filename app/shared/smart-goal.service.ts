import { Injectable } from '@angular/core';
import { UtilitiesService } from '~/shared/utilities.service';

@Injectable()
export class SmartGoalService {
  constructor(private utilitiesService: UtilitiesService) { }

  get(): string {
    // get smart goal from server
    return "I'm a smart goal";
  }

  post(smartGoal: string) {
    // post smart goal to server
  }
}
