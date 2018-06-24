import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "~/shared/user/user.service";
import { ScrollView } from "ui/scroll-view";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Message } from "~/tabs/messages/message";
import { MessagesService } from "~/tabs/messages/messages.service";

@Component({
  selector: "Messages",
  providers: [UserService, MessagesService],
  moduleId: module.id,
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})

export class MessagesComponent implements OnInit {
  messageList: Array<Message>;
  @ViewChild("chatScrollView") elementRef: ElementRef;
  mForm: FormGroup;
  submitting: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.mForm = this.formBuilder.group({
      message: ['', { validators: Validators.required }]
    });

    this.refreshMessageList();
  }

  private refreshMessageList() {
    this.userService.getMessages().subscribe(
      (data) => {
        this.messageList = [];
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

        // This is an offensive and insulting hack
        // 250 sometimes is not enough in the simulator
        setTimeout(function () {
          scrollView.scrollToVerticalOffset(scrollView.scrollableHeight, false);
        }, 500);
      },
      (error) => {
        console.log(error);
        alert("There was an error retrieving messages");
      }
    );
  }

  onSendTap(): void {
    this.submitting = true;

    this.messagesService.sendMessage(this.mForm.value.message).subscribe(
      () => {
        this.refreshMessageList();
        this.mForm.reset();
        this.submitting = false;
      },
      () => alert("There was an error sending your message.")
    );
  }
}