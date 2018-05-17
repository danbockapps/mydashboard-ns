import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BrowseComponent } from "./browse/browse.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";
import { WeightGraphComponent } from "~/weight-graph/weight-graph.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

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
        BrowseComponent,
        SearchComponent,
        WeightGraphComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
