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
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private router: Router, private userService: UserService) {
    /* ***********************************************************
    * Use the constructor to inject app services that you need in this component.
    *************************************************************/

    this.user = Config.defaultUser;
  }

  ngOnInit(): void {
    /* ***********************************************************
    * Use the "ngOnInit" handler to initialize data for this component.
    *************************************************************/
  }

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

    this.router.navigate(['tabs']);
  }

  onForgotPasswordTap(): void {
    /* ***********************************************************
    * Call your Forgot Password logic here.
    *************************************************************/
  }
}
