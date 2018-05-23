import { OnInit, Component, Input } from "@angular/core";
import { UserService } from "../shared/user/user.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";

@Component({
  selector: "md-weight-graph",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./weight-graph.component.html",
  styleUrls: ["./weight-graph-common.css", "./weight-graph.css"]
})

export class WeightGraphComponent implements OnInit {
  @Input() weightData:ObservableArray<WeightDataPoint>;

  private graphWeightMax: number;
  private graphWeightMin: number;
  private graphDateMax: any;
  private graphDateMin: any;

  /*
  "Mostly we use ngOnInit for all the initialization/declaration and avoid
  stuff to work in the constructor. The constructor should only be used to
  initialize class members but shouldn't do actual 'work'".
  */

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.refreshWeight();
  }

  refreshWeight(): void {
    this.graphWeightMax = 175;
    this.graphWeightMin = 171;

    // Either of these works.
    this.graphDateMin = "01/01/2018";
    this.graphDateMin = new Date('2018-01-02');

    this.graphDateMax = "02/02/2018";
    this.graphDateMax = new Date('2018-01-23');
  }
}

export class WeightDataPoint {
  constructor(public date: number, public weight: number) {}
}