import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SampledetailsPage } from './sampledetails';

@NgModule({
  declarations: [
    SampledetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SampledetailsPage),
  ],
})
export class SampledetailsPageModule {}
