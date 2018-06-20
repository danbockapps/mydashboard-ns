import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { isAndroid } from "platform";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";
import * as appSettings from "application-settings";

@Component({
  selector: "TabsComponent",
  moduleId: module.id,
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent implements OnInit {
  @ViewChild('tabView') elementRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
    (<TabView>this.elementRef.nativeElement).selectedIndex =
      appSettings.getNumber('currentTab', 0); // default to tab 0 (Home)
  }

  getIconSource(icon: string): string {
    return isAndroid ? "" : "res://tabIcons/" + icon;
  }

  onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    appSettings.setNumber('currentTab', args.newIndex);
  }
}
