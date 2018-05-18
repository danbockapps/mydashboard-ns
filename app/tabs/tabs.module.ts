import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeComponent } from "./home/home.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";
import { WeightGraphComponent } from "~/weight-graph/weight-graph.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { MessagesComponent } from "~/tabs/messages/messages.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptHttpModule,
        NativeScriptUIChartModule,
        TabsRoutingModule
    ],
    declarations: [
        TabsComponent,
        HomeComponent,
        MessagesComponent,
        WeightGraphComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
