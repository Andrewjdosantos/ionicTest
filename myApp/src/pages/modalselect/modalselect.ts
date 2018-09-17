import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateHorizonPage } from '../create-horizon/create-horizon';
import { EditmoisturePage } from '../editmoisture/editmoisture';
import { EditcolourPage } from '../editcolour/editcolour';
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


closeModal() {
        this.navCtrl.pop();
    };

}

  