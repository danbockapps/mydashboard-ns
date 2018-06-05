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
  constructor(private userService:UserService) {}

  ngOnInit(): void {
    console.log("world... hello");
  }
}