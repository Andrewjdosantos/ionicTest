import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateHorizonPage } from '../create-horizon/create-horizon';
import { EditmoisturePage } from '../editmoisture/editmoisture';
import { EditcolourPage } from '../editcolour/editcolour';
import { ConsistencyeditPage } from '../consistencyedit/consistencyedit';
import { EditstructurePage } from '../editstructure/editstructure';
import { EdittexturePage } from '../edittexture/edittexture';
import { EditoriginPage } from '../editorigin/editorigin';
import { EditgroundwaterPage } from '../editgroundwater/editgroundwater';
import { EditpedocretePage } from '../editpedocrete/editpedocrete';
import { SampledetailsPage } from '../sampledetails/sampledetails';
import { EditbioPage } from '../editbio/editbio';
/**
 * Generated class for the ModalselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalselect',
  templateUrl: 'modalselect.html',
})
export class ModalselectPage {
  horizon : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.horizon = navParams.get("horizon")
  // console.log(this.horizon)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalselectPage');
  };

  gotoHorizonEditPage(params,horizon){
  	this.navCtrl.push(CreateHorizonPage,{project:params});
  };

  gotoMoistureEditPage(params,horizon){
  	this.navCtrl.push(EditmoisturePage,{horizon:params});
  };

  gotoColourEditPage(params,horizon){
    this.navCtrl.push(EditcolourPage,{horizon:params});
  };

  gotoConsEditPage(params,horizon){
    this.navCtrl.push(ConsistencyeditPage,{horizon:params});
  };

  gotoStructEditPage(params,horizon){
    this.navCtrl.push(EditstructurePage,{horizon:params});
  };

  gotoTextEditPage(params,horizon){
    this.navCtrl.push(EdittexturePage,{horizon:params});
  };
  gotoOriginPage(params,horizon){
    this.navCtrl.push(EditoriginPage,{horizon:params});
  };

  gotoGroundWaterEditPage(params,horizon){
    this.navCtrl.push(EditgroundwaterPage,{horizon:params});
  };

  gotoPedocreteEditPage(params,horizon){
    this.navCtrl.push(EditpedocretePage,{horizon:params});
  };

  gotoSamepleEditPage(params,horizon){
    this.navCtrl.push(SampledetailsPage,{horizon:params});
  };

  gotoBioEditPage(params,horizon){
    this.navCtrl.push(EditbioPage,{horizon:params});
  };

closeModal() {
        this.navCtrl.pop();
    };

}

  