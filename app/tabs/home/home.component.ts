import { Component, OnInit } from "@angular/core";
import * as connectivity from "tns-core-modules/connectivity";
import { UserService } from "~/shared/user/user.service";
import { WeightGraphBounds } from "~/shared/weighGraphBounds";
import { WeightDataPoint } from "~/shared/weightDataPoint"
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as appSettings from "application-settings";
import * as moment from "moment";
import { HomeService } from "~/shared/home.service";
import { WeekData } from "~/shared/weekData";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import { DropDownConfig } from "~/shared/dropDownConfig";

@Component({
  selector: "Home",
  providers: [UserService, HomeService],
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  weightData:ObservableArray<WeightDataPoint>;
  bounds:WeightGraphBounds;
  graphStatus:number = 0;
  weekData:WeekData;
  dropDownConfig:DropDownConfig = new DropDownConfig();

  constructor(readonly userService:UserService, readonly homeService:HomeService) {
    this.weekData = new WeekData();
    this.dropDownConfig.hint = "Tap here for dropdown.";
    this.dropDownConfig.items = new ValueList<string>();
    for (let loop = 0; loop < 200; loop++) {
      this.dropDownConfig.items.push({
          value: `I${loop}`,
          display: `Item ${loop}`,
      });
    }
  }

  ngOnInit(): void {
    if (connectivity.getConnectionType() === connectivity.connectionType.none) {
      alert("Internet connection not found.");
    }
    else {
      this.userService.getDashboard().subscribe(
        (data) => {
          appSettings.setNumber("userId", data.userId);
          appSettings.setNumber("startDttm", Number(moment(data.class.start_dttm).format('X')));
          appSettings.setNumber("classId", data.class.class_id);
          this.weightData = this.getObservableArray(data.weight);

          if(this.weightData.length <= 1) {
            // Graph isn't gonna show, but needs some dummy bounds so it won't crash
            this.bounds = new WeightGraphBounds(1, 0);
            this.graphStatus = 1;
          }
          else {
            this.bounds = this.getBounds(this.weightData);
            this.graphStatus = 2;
          }
        },
        (error) => alert("Unfortunately we could not find your account.")
      );
    }
  }

  onSubmitButtonTap():void {
    this.homeService.postNewData(this.weekData).subscribe(
      (data) => {
        console.log(JSON.stringify(data));

        // Clear form
        this.weekData = new WeekData();

        // Update graph data
        this.weightData = this.getObservableArray(data.weight);

        // Update graph bounds
        this.bounds = this.getBounds(this.weightData);
      },
      (error) => console.log(error)
    );
  }

  private getObservableArray(weightArray):ObservableArray<WeightDataPoint> {
    let classStart:moment.Moment = moment(appSettings.getNumber("startDttm"), 'X');

    // filter here because you can't have null data in a graph
    return new ObservableArray(weightArray.filter(s => s.weight > 0)
                                          .map(function(datapoint) {
      return new WeightDataPoint(
        // moment(classStart) clones the classStart object,
        // so it doesn't get changed.
        moment(classStart).add(datapoint.week, 'weeks').toDate(),
        datapoint.weight
      );
    }));
  }

  private getBounds(weightData:ObservableArray<WeightDataPoint>):WeightGraphBounds {
    let maxWeight:number, minWeight:number;

    maxWeight = weightData.reduce(function(prev, current) {
      return (prev.weight > current.weight) ? prev : current;
    }, weightData.getItem(0)).weight;

    minWeight = weightData.reduce(
      (prev, current) => (prev.weight < current.weight) ? prev : current,
      weightData.getItem(0)
    ).weight;

    return new WeightGraphBounds(maxWeight + 1, minWeight - 1);
  }

  public onchange(args: SelectedIndexChangedEventData) {
    // Do we actually need this function?
    console.log(`Drop Down selected index changed from ${args.oldIndex} to 
        ${args.newIndex}. New value is "${this.dropDownConfig.items.getValue(
        args.newIndex)}"`);
  }
}