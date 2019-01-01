import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { ShowCaseItemComponent } from './showcase/show-case-item/show-case-item.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainBgComponent } from './main-bg/main-bg.component';
import { PageSectionComponent } from './main-page/page-section/page-section.component';
import { SpaComponent } from './main-page/spa/spa.component';
import { FilterDropdownComponent } from './main-page/spa/filter-dropdown/filter-dropdown.component';
import { NavigationMenuComponent } from './main-page/navigation-menu/navigation-menu.component';
import { TopMenuComponent } from './main-page/spa/top-menu/top-menu.component';
import { ChartDemoComponent } from './main-page/spa/chart-demo/chart-demo.component';
import { PcWrapperComponent } from './main-page/wrappers/pc-wrapper/pc-wrapper.component';
import { MyDropdownComponent } from './my-ui/my-dropdown/my-dropdown.component';
import { MyChkboxGroupComponent } from './my-ui/my-chkbox-group/my-chkbox-group.component';
import { MyCardComponent } from './my-ui/my-card/my-card.component';
import { MyChartComponent } from './my-ui/my-chart/my-chart.component';
import { SpaService } from './main-page/spa/spa.service';
import { HttpClientModule } from '@angular/common/http';
import { GamesPlatform1Component } from './main-page/games-platform1/games-platform1.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileWrapperComponent } from './main-page/wrappers/mobile-wrapper/mobile-wrapper.component';
import { MyChipsComponent } from './my-ui/my-chips/my-chips.component';
import { LoginComponent } from './main-page/spa/login/login.component';
import { FormsModule } from '@angular/forms';
import { SlotMachineModule } from './slot-machine/slot-machine.module';
import { MachineComponent } from './slot-machine/machine/machine.component';


const appRoutes: Routes = [
  { path: 'page1', component: SpaComponent, data: { animation: 'page1' } },
  { path: 'page2', component: GamesPlatform1Component, data: { animation: 'page2' } },
  {
    path: '',
    redirectTo: '/page1',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    MachineComponent,
    AppComponent,
    TabComponent,
    ShowcaseComponent,
    ShowCaseItemComponent,
    MainHeaderComponent,
    MainPageComponent,
    MainBgComponent,
    PageSectionComponent,
    SpaComponent,
    FilterDropdownComponent,
    NavigationMenuComponent,
    TopMenuComponent,
    ChartDemoComponent,
    PcWrapperComponent,
    MyDropdownComponent,
    MyChkboxGroupComponent,
    MyCardComponent,
    MyChartComponent,
    GamesPlatform1Component,
    MobileWrapperComponent,
    MyChipsComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    
  ],
  providers: [SpaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
