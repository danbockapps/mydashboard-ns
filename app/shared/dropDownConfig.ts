import { ValueList } from "nativescript-drop-down";

export class DropDownConfig {
  constructor(
    public items: ValueList<string> = null,
    public cssClass: string = "default",
    public currentWeek: number = 0
  ) {};
}