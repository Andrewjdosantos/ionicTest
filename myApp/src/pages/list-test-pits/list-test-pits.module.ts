import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTestPitsPage } from './list-test-pits';

@NgModule({
  declarations: [
    ListTestPitsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTestPitsPage),
  ],
})
export class ListTestPitsPageModule {}
