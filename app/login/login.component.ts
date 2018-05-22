import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "~/shared/user/user";
import { UserService } from "~/shared/user/user.service";
import * as connectivity from "tns-core-modules/connectivity";
import { Config } from "~/shared/config";

@Component({
  selector: "Login",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private router: Router, private userService: UserService) {
    this.user = Config.defaultUser;
  }

  ngOnInit(): void {}

  onSigninButtonTap(): void {
    if (connectivity.getConnectionType() === connectivity.connectionType.none) {
      alert("Internet connection not found.");
    }
    else {
      this.userService.login(this.user)
        .subscribe(
          () => this.router.navigate(["/tabs"]),
          (error) => alert("Unfortunately we could not find your account.")
        );
    }
  }

  onForgotPasswordTap(): void {}
}
