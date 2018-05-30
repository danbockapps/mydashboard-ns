import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "~/shared/user/user.service";
import * as appSettings from "application-settings";
import { ScrollView } from "ui/scroll-view";

@Component({
  selector: "Messages",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})

export class MessagesComponent implements OnInit {
  messageList: Array<Message> = [];
  @ViewChild("chatScrollView") elementRef: ElementRef;;

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
    this.userService.getMessages().subscribe(
      (data) => {
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

        let scrollView = <ScrollView>this.elementRef.nativeElement;

        setTimeout(function() {
          scrollView.scrollToVerticalOffset(scrollView.scrollableHeight, false);
        });
      },
      (error) => {
        console.log(error);
        alert("There was an error retrieving messages");
      }
    );
  }
}

class Message {
  constructor(
    public userId:number,
    public recipId:number,
    public messageText:string,
    public createDateTime:Date
  ) {}

  getClass():string {
    return (this.userId === appSettings.getNumber("userId") ? "me" : "them");
  }

  getColSpan():string {
    return (this.userId === appSettings.getNumber("userId") ? "0" : "2");
  }

  getHorizAlign(): string {
    return (this.userId === appSettings.getNumber("userId") ? "right" : "left");
  }
}