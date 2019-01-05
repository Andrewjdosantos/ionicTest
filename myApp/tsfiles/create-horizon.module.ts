import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateHorizonPage } from './create-horizon';

@NgModule({
  declarations: [
    CreateHorizonPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateHorizonPage),
  ],
})
export class CreateHorizonPageModule {}
