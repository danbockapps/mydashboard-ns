import { OnInit, Component } from "@angular/core";
import * as appSettings from "application-settings";
import { Router } from "@angular/router";

@Component({
  selector: "More",
  moduleId: module.id,
  templateUrl: "./more.component.html",
  styleUrls: ["./more.component.scss"]
})
export class MoreComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  onSignOutButtonTap(): void {
    appSettings.remove('token');
    appSettings.remove('userId');
    this.router.navigate(['login']);
  }
}