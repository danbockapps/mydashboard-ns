import { Component, OnInit } from "@angular/core";
import * as connectivity from "tns-core-modules/connectivity";
import { UserService } from "~/shared/user/user.service";
import { WeightDataPoint } from "~/weight-graph/weight-graph.component";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

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
    let newArray = weightArray.map(function(datapoint) {
      // TODO convert datapoints to WeightDataPoints
    });

    return new ObservableArray([
      { date: new Date('2018-01-01').getTime(), weight: 173 },
      { date: new Date('2018-01-08').getTime(), weight: 174 },
      { date: new Date('2018-01-15').getTime(), weight: 172 },
      { date: new Date('2018-01-22').getTime(), weight: 172 }
    ]);
  }
}
