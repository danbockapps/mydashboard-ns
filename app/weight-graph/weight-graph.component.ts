import { OnInit, Component, Input } from "@angular/core";
import { UserService } from "../shared/user/user.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { WeightDataPoint } from "~/shared/weightDataPoint";
import { WeightGraphBounds } from "~/shared/weighGraphBounds";

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
    // This is a hack to get vertical axis labels one per pound,
    // which is a good frequency for most participants.
    // The frequency of labels seems to be set when the graph
    // is initialized and doesn't change when the data comes in.
    // Also: https://github.com/telerik/nativescript-ui-feedback/issues/681
    this.bounds = new WeightGraphBounds(1000, 995);
  }
}