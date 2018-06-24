import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UtilitiesService } from '~/shared/utilities.service';
import { Observable } from 'rxjs/Observable';
import { Config } from '~/shared/config';

@Injectable()
export class MessagesService {
  constructor(private http: Http, private utilitiesService: UtilitiesService) { }

  sendMessage(message: String): Observable<any> {
    return this.http.post(
      `${Config.apiUrl}messages`,
      JSON.stringify({ message }),
      { headers: this.utilitiesService.createRequestHeaders() }
    );
  }
}