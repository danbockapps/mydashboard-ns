import * as appSettings from "application-settings";

export class Message {
  constructor(
    public userId: number,
    public recipId: number,
    public messageText: string,
    public createDateTime: Date
  ) { }

  getClass(): string {
    return (this.userId === appSettings.getNumber("userId") ? "me" : "them");
  }

  getColSpan(): string {
    return (this.userId === appSettings.getNumber("userId") ? "0" : "2");
  }

  getHorizAlign(): string {
    return (this.userId === appSettings.getNumber("userId") ? "right" : "left");
  }
}