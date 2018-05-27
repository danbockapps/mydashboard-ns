import * as appSettings from "application-settings";
import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";

@Injectable()
export class UtilitiesService {
  createRequestHeaders():Headers {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + appSettings.getString("token"));
    return headers;
  }
}