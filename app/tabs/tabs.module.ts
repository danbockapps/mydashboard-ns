import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeComponent } from "./home/home.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";
import { WeightGraphComponent } from "~/weight-graph/weight-graph.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { MessagesComponent } from "~/tabs/messages/messages.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DropDownModule } from "nativescript-drop-down/angular";
import { SmartGoalComponent } from "~/tabs/smartGoal/smartGoal.component";
import { MoreComponent } from "~/tabs/more/more.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptHttpModule,
        NativeScriptUIChartModule,
        NativeScriptFormsModule,
        TabsRoutingModule,
        DropDownModule,
        ReactiveFormsModule,
    ],
    declarations: [
        TabsComponent,
        HomeComponent,
        MessagesComponent,
        SmartGoalComponent,
        MoreComponent,
        WeightGraphComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
