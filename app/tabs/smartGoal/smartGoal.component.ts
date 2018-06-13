import { OnInit, Component } from "@angular/core";
import { UserService } from "~/shared/user/user.service";

@Component({
  selector: "SmartGoal",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./smartGoal.component.html",
  styleUrls: ["./smartGoal.component.scss"]
})

export class SmartGoalComponent implements OnInit {
  instructionsStart: string;
  showInstructionsEnd: boolean = false;
  instructionsEnd: string;
  sgInput: string = "I will lose some weight by losing some weight and also losing weight without losing too much weight yadda yadda";

  constructor(private userService: UserService) {
    this.instructionsStart = "SMART Goals are Specific, Measurable, Attainable, Realistic, and Timely. ";
    this.instructionsEnd = "Your SMART goal should say specifically what you are going to achieve. You should be able to measure whether you have achieved it. Things you can measure include miles walked or run, pants sizes, pounds, etc. Your SMART goal should be something attainable that you can realistically accomplish. Losing more than two pounds a week or more than 10 percent of your body-weight over the course of the program is neither realistic nor attainable. Lastly, you should know when you plan to achieve your SMART goal. By the end of the program is a timely marker. Setting a goal for a specific event or date is timely as well; for example, maybe you want to be able to hike 10 miles with your kids during your family vacation in April."
  }

  ngOnInit(): void {
  }
}