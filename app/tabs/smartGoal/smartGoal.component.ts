import { OnInit, Component } from "@angular/core";
import { UserService } from "~/shared/user/user.service";
import { SmartGoalService } from "~/shared/smart-goal.service";

@Component({
  selector: "SmartGoal",
  providers: [SmartGoalService],
  moduleId: module.id,
  templateUrl: "./smartGoal.component.html",
  styleUrls: ["./smartGoal.component.scss"]
})

export class SmartGoalComponent implements OnInit {
  instructionsStart: string;
  showInstructionsEnd: boolean = false;
  instructionsEnd: string;
  sgInput: string;

  constructor(private smartGoalService: SmartGoalService) {
    this.instructionsStart = "SMART Goals are Specific, Measurable, Attainable, Realistic, and Timely. ";
    this.instructionsEnd = "Your SMART goal should say specifically what you are going to achieve. You should be able to measure whether you have achieved it. Things you can measure include miles walked or run, pants sizes, pounds, etc. Your SMART goal should be something attainable that you can realistically accomplish. Losing more than two pounds a week or more than 10 percent of your body-weight over the course of the program is neither realistic nor attainable. Lastly, you should know when you plan to achieve your SMART goal. By the end of the program is a timely marker. Setting a goal for a specific event or date is timely as well; for example, maybe you want to be able to hike 10 miles with your kids during your family vacation in April."
  }

  ngOnInit(): void {
    this.getSmartGoal();
  }

  getSmartGoal(): void {
    this.smartGoalService.get().subscribe(resp => this.sgInput = resp.smartGoal);
  }

  saveSmartGoal(): void {
    this.smartGoalService.post(this.sgInput).subscribe(resp => {
      //TODO make sure resp is HTTP 200 before showing this alert.
      console.log(resp);
      alert('Your SMART Goal has been updated.');
    });
  }
}