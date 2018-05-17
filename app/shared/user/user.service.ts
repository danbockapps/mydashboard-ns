import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Config } from "../config";

// This is TypeScript for var appSettings = require("application-settings");
import * as appSettings from "application-settings";
import { User } from "~/shared/user/user";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  login(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      Config.apiUrl + "login",
      JSON.stringify({
        email: user.email,
        password: user.password
      }),
      { headers: headers }
    )
    .map(response => response.json())
    .do(data => {
      // I don't think Config needs token.
      //Config.token = data.token;
      console.log(JSON.stringify(data));
      appSettings.setString("token", data.token);
    })
    //.catch(this.handleErrors);
  }

  getDashboard() {
    return this.http.get(
      Config.apiUrl + "dashboard", {headers: this.createRequestHeaders()}
    )
    .map(response => response.json())
    //.catch(this.handleErrors);
  }

  private createRequestHeaders() {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + appSettings.getString("token"));
    return headers;
  }

  handleErrors(error: Response) {
    console.log('An error occurred with user service. ' + error);
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}