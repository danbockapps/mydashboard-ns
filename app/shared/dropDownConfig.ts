import { ValueList } from "nativescript-drop-down";

export class DropDownConfig {
  constructor(
    public items: ValueList<string> = null,
    public hint: string = "Hint goes here",
    public cssClass: string = "default"
  ) {};
}