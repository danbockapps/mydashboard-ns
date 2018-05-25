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
  @Input() bounds:WeightGraphBounds; 

  /*
  "Mostly we use ngOnInit for all the initialization/declaration and avoid
  stuff to work in the constructor. The constructor should only be used to
  initialize class members but shouldn't do actual 'work'".
  */

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.bounds = new WeightGraphBounds(200, 100);
  }
}

export class WeightDataPoint {
  constructor(public date: Date, public weight: number) {}
}

export class WeightGraphBounds {
  constructor(
    public graphWeightMax:number,
    public graphWeightMin:number
  ) {}
}