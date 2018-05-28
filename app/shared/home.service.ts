import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { UtilitiesService } from "~/shared/utilities.service";
import { Config } from "~/shared/config";
import * as appSettings from "application-settings";
import { WeekData } from "~/shared/weekData";

// There might be a way to combine these two into one statement
import * as moment from "moment";
import { Moment } from "moment";

@Injectable()
export class HomeService {
  constructor(private http: Http, private utilitiesService:UtilitiesService) {}

  postNewData(data:WeekData) {
    return this.http.post(
      Config.apiUrl + "postNewData",
      JSON.stringify({
        classId: appSettings.getNumber('classId'),
        weekId: this.getCurrentWeekId(),
        weight: data.weight,
        aerobicMinutes: data.aerobicMinutes,
        strengthMinutes: data.strengthMinutes,
        avgSteps: data.avgSteps
      }),
      {headers: this.utilitiesService.createRequestHeaders()}
    )
    .map(response => response.json());
  }

  private getCurrentWeekId():number {
    // Week ID is 0 for 24 hours after class start, then 1 until 24 hours after
    // the second class, etc.
    let classStart:Moment = moment(appSettings.getNumber("startDttm"), 'X');
    let daysSinceClassStart:number = moment().diff(classStart, "days");
    let currentWeekId = Math.ceil(daysSinceClassStart / 7);
    console.log("Current week id is " + currentWeekId);
    return currentWeekId;
  }
}