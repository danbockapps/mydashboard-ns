import { Component, OnInit } from "@angular/core";
import { UserService } from "~/shared/user/user.service";

@Component({
  selector: "Messages",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./messages.component.html"
})

export class MessagesComponent implements OnInit {
  messageList: Array<Message> = [];

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
    this.userService.getMessages().subscribe(
      (data) => {
        console.log("received data: " + JSON.stringify(data));
        data.messages.forEach((message) => {

          // I'm pretty sure there's an easier way than this
          // to map the rest response to message objects.
          this.messageList.unshift(new Message(
            message.user_id,
            message.recip_id,
            message.message,
            message.create_dttm
          ));
        });

        console.log(JSON.stringify(this.messageList));
      },
      (error) => alert("There was an error retrieving messages")
    );
  }
}

class Message {
  constructor(
    public userId:string,
    public recipId:string,
    public messageText:string,
    public createDateTime:string
  ) {}
}