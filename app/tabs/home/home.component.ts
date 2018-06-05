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

//TODO prevent user from selecting a future week from the DropDown

@Component({
  selector: "Home",
  providers: [UserService, HomeService],
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  numWeeks:number = 15; //TODO unhardcode this
  graphData:ObservableArray<WeightDataPoint>;
  allData:any; // Really this is an array of WeekData.
  bounds:WeightGraphBounds;
  graphStatus:number = 0;
  dropDownConfig:DropDownConfig = new DropDownConfig();

  constructor(readonly userService:UserService, readonly homeService:HomeService) {}

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

          // Might be nice to have one object instead of two here, but that breaks the graph
          // if there are null values for weight, which of course is possible.
          this.allData = this.getIndexedData(data.data);
          this.graphData = this.getObservableArray(data.data);

          this.dropDownConfig.currentWeek = this.homeService.getCurrentWeek();
          
          if(this.graphData.length <= 1) {
            // Graph isn't gonna show, but needs some dummy bounds so it won't crash
            this.bounds = new WeightGraphBounds(1, 0);
            this.graphStatus = 1;
          }
          else {
            this.bounds = this.getBounds(this.graphData);
            this.graphStatus = 2;
          }

          this.dropDownConfig.items = new ValueList<string>();
          for(let i=0; i<this.numWeeks; i++) {
            this.dropDownConfig.items.push({
              value: "" + i,
              display: "Week " + i
            });
          }
        },
        (error) => alert("Unfortunately we could not find your account.")
      );
    }
  }

  onSubmitButtonTap():void {
    this.homeService.postNewData(this.allData[this.dropDownConfig.currentWeek]).subscribe(
      (data) => {
        console.log(JSON.stringify(data));

        // Update data model
        this.allData = this.getIndexedData(data.data);

        // Update graph data
        this.graphData = this.getObservableArray(data.data);

        // Update graph bounds
        this.bounds = this.getBounds(this.graphData);
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

  private getIndexedData(data):Array<WeekData> {
    let indexed:Array<WeekData> = new Array<WeekData>(this.numWeeks);

    data.forEach(element => {
      indexed[element.week] = new WeekData(
        element.week,
        element.weight,
        element.aerobic_minutes,
        element.strength_minutes,
        element.avgsteps
      );
    });

    return indexed;
  }
}