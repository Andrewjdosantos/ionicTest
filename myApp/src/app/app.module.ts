import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { AddprojectPage } from '../pages/addproject/addproject';
import { AddtestpitPage } from '../pages/addtestpit/addtestpit';
import { ListTestPitsPage } from '../pages/list-test-pits/list-test-pits';
import { CreateHorizonPage } from '../pages/create-horizon/create-horizon';
import { ListhorizonsPage } from '../pages/listhorizons/listhorizons';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PeopleServiceProvider } from '../providers/people-service/people-service';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    AddprojectPage,
    TabsPage,
    AddtestpitPage,
    ListTestPitsPage,
    CreateHorizonPage,
    ListhorizonsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddprojectPage,
    AddtestpitPage,
    ListTestPitsPage,
    CreateHorizonPage,
    ListhorizonsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PeopleServiceProvider,
    RestProvider
  ]
})
export class AppModule {}
