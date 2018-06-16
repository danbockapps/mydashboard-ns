import { Injectable } from '@angular/core';
import { UtilitiesService } from '~/shared/utilities.service';
import { Http } from '@angular/http';
import { Config } from '~/shared/config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SmartGoalService {
  constructor(private http: Http, private utilitiesService: UtilitiesService) { }

  get(): Observable<any> {
    return this.http.get(
      `${Config.apiUrl}smartGoal`,
      { headers: this.utilitiesService.createRequestHeaders() }
    ).map(response => response.json());
  }

  post(smartGoal: string) {
    return this.http.post(
      `${Config.apiUrl}smartGoal`,
      JSON.stringify({
        goal: smartGoal
      }),
      { headers: this.utilitiesService.createRequestHeaders() }
    )
  }
}
