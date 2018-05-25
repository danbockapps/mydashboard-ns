import { Component, OnInit } from "@angular/core";
import * as connectivity from "tns-core-modules/connectivity";
import { UserService } from "~/shared/user/user.service";
import { WeightDataPoint } from "~/weight-graph/weight-graph.component";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import * as appSettings from "application-settings";
import * as moment from "moment";

@Component({
  selector: "Home",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private weightData:ObservableArray<WeightDataPoint>;

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    if (connectivity.getConnectionType() === connectivity.connectionType.none) {
      alert("Internet connection not found.");
    }
    else {
      this.userService.getDashboard().subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          appSettings.setNumber("userId", data.userId);
          appSettings.setNumber("startDttm", Number(moment(data.class.start_dttm).format('X')));
          this.weightData = this.getObservableArray(data.weight);
        },
        (error) => alert("Unfortunately we could not find your account.")
      );
    }
  }

  onSubmitButtonTap():void {
    console.log('Submit button tapped.');
  }

  private getObservableArray(weightArray):ObservableArray<WeightDataPoint> {
    let classStart:moment.Moment = moment(appSettings.getNumber("startDttm"), 'X');
    return new ObservableArray(weightArray.map(function(datapoint) {
      return new WeightDataPoint(
        Number(classStart.add(datapoint.week, 'weeks').format('x')),
        datapoint.weight
      );
    }));
  }
}
