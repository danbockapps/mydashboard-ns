import { OnInit, Component } from "@angular/core";
import * as appSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: "More",
  moduleId: module.id,
  templateUrl: "./more.component.html",
  styleUrls: ["./more.component.scss"]
})
export class MoreComponent implements OnInit {
  constructor(private routerExtensions: RouterExtensions) { }

  ngOnInit(): void { }

  onSignOutButtonTap(): void {
    appSettings.remove('token');
    appSettings.remove('userId');
    this.routerExtensions.navigate(['login'], { clearHistory: true });
  }
}