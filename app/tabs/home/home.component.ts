import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import * as connectivity from "tns-core-modules/connectivity";
import { UserService } from "~/shared/user/user.service";
import { WeightGraphBounds } from "~/shared/weighGraphBounds";
import { WeightDataPoint } from "~/shared/weightDataPoint"
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as appSettings from "application-settings";
import * as moment from "moment";
import { HomeService } from "~/shared/home.service";
import { WeekData } from "~/shared/weekData";
import { SelectedIndexChangedEventData, ValueList, DropDown } from "nativescript-drop-down";
import { DropDownConfig } from "~/shared/dropDownConfig";
import { Moment } from "moment";

@Component({
  selector: "Home",
  providers: [UserService, HomeService],
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  numWeeks: number = 15; //TODO unhardcode this
  graphData: ObservableArray<WeightDataPoint>;
  allData: Array<WeekData>;
  bounds: WeightGraphBounds;
  graphStatus: number = 0;
  dropDownConfig: DropDownConfig = new DropDownConfig();
  @ViewChild("dropDown") elementRef: ElementRef

  constructor(readonly userService: UserService, readonly homeService: HomeService) { }

  ngOnInit(): void {
    if (connectivity.getConnectionType() === connectivity.connectionType.none) {
      alert("Internet connection not found.");
    }
    else {
      this.userService.getDashboard().subscribe(
        (data) => {
          appSettings.setNumber("userId", data.userId);
          let startDttm: Moment = moment(data.class.start_dttm);
          appSettings.setNumber("startDttm", Number(startDttm.format('X')));
          appSettings.setNumber("classId", data.class.class_id);

          this.dropDownConfig.currentWeek = this.homeService.getCurrentWeek();

          // Might be nice to have one object instead of two here, but that breaks the graph
          // if there are null values for weight, which of course is possible.
          this.allData = this.getIndexedData(data.data, this.dropDownConfig.currentWeek);
          this.graphData = this.getObservableArray(data.data);

          if (this.graphData.length <= 1) {
            // Graph isn't gonna show, but needs some dummy bounds so it won't crash
            this.bounds = new WeightGraphBounds(1, 0);
            this.graphStatus = 1;
          }
          else {
            this.bounds = this.getBounds(this.graphData);
            this.graphStatus = 2;
          }

          this.dropDownConfig.items = new ValueList<string>();
          for (let i = 0; i <= this.dropDownConfig.currentWeek; i++) {
            this.dropDownConfig.items.push({
              value: "" + i,
              display: "Week " + (i + 1) + ": " +
                moment(startDttm).add(i, 'weeks').format("MMMM Do")
            });
          }
        },
        (error) => alert("There was an error loading the home tab.")
      );
    }
  }

  onSubmitButtonTap(): void {
    this.homeService.postNewData(this.allData[this.dropDownConfig.currentWeek]).subscribe(
      (data) => {
        console.log(JSON.stringify(data));

        // Update data model
        this.allData = this.getIndexedData(data.data, this.dropDownConfig.currentWeek);

        // Update graph data
        this.graphData = this.getObservableArray(data.data);

        // Update graph bounds
        this.bounds = this.getBounds(this.graphData);
      },
      (error) => console.log(error)
    );
  }

  onCaretTap(): void {
    let dropDown = <DropDown>this.elementRef.nativeElement;
    dropDown.open();
  }

  private getObservableArray(weightArray): ObservableArray<WeightDataPoint> {
    let classStart: Moment = moment(appSettings.getNumber("startDttm"), 'X');

    // filter here because you can't have null data in a graph
    return new ObservableArray(weightArray.filter(s => s.weight > 0)
      .map(function (datapoint) {
        return new WeightDataPoint(
          // moment(classStart) clones the classStart object,
          // so it doesn't get changed.
          moment(classStart).add(datapoint.week, 'weeks').toDate(),
          datapoint.weight
        );
      }));
  }

  private getBounds(weightData: ObservableArray<WeightDataPoint>): WeightGraphBounds {
    let maxWeight: number, minWeight: number;

    maxWeight = weightData.reduce(function (prev, current) {
      return (prev.weight > current.weight) ? prev : current;
    }, weightData.getItem(0)).weight;

    minWeight = weightData.reduce(
      (prev, current) => (prev.weight < current.weight) ? prev : current,
      weightData.getItem(0)
    ).weight;

    return new WeightGraphBounds(maxWeight + 1, minWeight - 1);
  }

  private getIndexedData(data, currentWeek): Array<WeekData> {
    let indexed: Array<WeekData> = new Array<WeekData>(this.numWeeks);

    data.forEach(element => {
      indexed[element.week] = new WeekData(
        element.week,
        element.weight,
        element.aerobic_minutes,
        element.strength_minutes,
        element.avgsteps
      );
    });

    for (let i: number = 0; i <= currentWeek; i++) {
      if (!indexed[i]) {
        indexed[i] = new WeekData(i);
      }
    }

    return indexed;
  }
}