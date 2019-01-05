import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';

import { HomePage } from '../pages/home/home';
import { AddprojectPage } from '../pages/addproject/addproject';
import { AddtestpitPage } from '../pages/addtestpit/addtestpit';
import { ListTestPitsPage } from '../pages/list-test-pits/list-test-pits';
import { CreateHorizonPage } from '../pages/create-horizon/create-horizon';
import { ListhorizonsPage } from '../pages/listhorizons/listhorizons';
import { TabsPage } from '../pages/tabs/tabs';
import { AddcontactPage } from '../pages/addcontact/addcontact';
import { ModalselectPage } from '../pages/modalselect/modalselect';
import { EditmoisturePage } from '../pages/editmoisture/editmoisture';
import { EditcolourPage } from '../pages/editcolour/editcolour';
import { ConsistencyeditPage } from '../pages/consistencyedit/consistencyedit';
import { EditstructurePage } from '../pages/editstructure/editstructure';
import { EdittexturePage } from '../pages/edittexture/edittexture';
import { EditoriginPage } from '../pages/editorigin/editorigin';
import { EditgroundwaterPage } from '../pages/editgroundwater/editgroundwater';
import { EditpedocretePage } from '../pages/editpedocrete/editpedocrete';
import { SampledetailsPage } from '../pages/sampledetails/sampledetails';
import { EditbioPage } from '../pages/editbio/editbio';
import { ContactPage } from '../pages/contact/contact';
import { CreatetestpitPage } from '../pages/createtestpit/createtestpit';

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
    ListhorizonsPage,
    AddcontactPage,
    ModalselectPage,
    EditmoisturePage,
    EditcolourPage,
    ConsistencyeditPage,
    EditstructurePage,
    EdittexturePage,
    EditoriginPage,
    EditgroundwaterPage,
    EditpedocretePage,
    SampledetailsPage,
    EditbioPage,
    CreatetestpitPage
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
    ListhorizonsPage,
    AddcontactPage,
    ModalselectPage,
    EditmoisturePage,
    EditcolourPage,
    ConsistencyeditPage,
    EditstructurePage,
    EdittexturePage,
    EditoriginPage,
    EditgroundwaterPage,
    EditpedocretePage,
    SampledetailsPage,
    EditbioPage,
    CreatetestpitPage
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
