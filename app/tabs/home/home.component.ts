import { Component, OnInit } from "@angular/core";
import * as connectivity from "tns-core-modules/connectivity";
import { UserService } from "~/shared/user/user.service";
import { WeightDataPoint, WeightGraphBounds } from "~/weight-graph/weight-graph.component";
import { ObservableArray } from "tns-core-modules/data/observable-array";
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
  private bounds:WeightGraphBounds;

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
          this.bounds = this.getBounds(this.weightData);
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
        // moment(classStart) clones the classStart object,
        // so it doesn't get changed.
        moment(classStart).add(datapoint.week, 'weeks').toDate(),
        datapoint.weight
      );
    }));
  }

  private getBounds(weightData:ObservableArray<WeightDataPoint>):WeightGraphBounds {
    let maxWeight:number = weightData.reduce(function(prev, current) {
      return (prev.weight > current.weight) ? prev : current;
    }, weightData.getItem(0)).weight;

    let minWeight:number = weightData.reduce(
      (prev, current) => (prev.weight < current.weight) ? prev : current,
      weightData.getItem(0)
    ).weight;

    return new WeightGraphBounds(maxWeight, minWeight);
  }
}
