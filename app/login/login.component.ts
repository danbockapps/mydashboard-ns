import { Component, OnInit } from "@angular/core";
import { User } from "~/shared/user/user";
import { UserService } from "~/shared/user/user.service";
import * as connectivity from "tns-core-modules/connectivity";
import { Config } from "~/shared/config";
import { RouterExtensions } from "nativescript-angular/router";
import * as appSettings from "application-settings";

@Component({
  selector: "Login",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService
  ) {
    this.user = Config.defaultUser;
  }

  ngOnInit(): void {
    if (appSettings.getString('token')) {
      this.goToTabs();
    }
  }

  onSigninButtonTap(): void {
    if (connectivity.getConnectionType() === connectivity.connectionType.none) {
      alert("Internet connection not found.");
    }
    else {
      this.userService.login(this.user)
        .subscribe(
          () => this.goToTabs(),
          (error) => alert("Unfortunately we could not find your account.")
        );
    }
  }

  goToTabs(): void {
    this.routerExtensions.navigate(['/tabs'], { clearHistory: true })
  }

  onForgotPasswordTap(): void { }
}
