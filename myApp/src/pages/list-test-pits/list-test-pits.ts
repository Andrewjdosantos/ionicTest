import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { AddtestpitPage } from '../addtestpit/addtestpit';
import { CreateHorizonPage } from '../create-horizon/create-horizon';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
/**
 * Generated class for the AddprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-test-pits',
  templateUrl: 'list-test-pits.html',
})
export class ListTestPitsPage {
	project: any;
	dataline: any;

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
  	this.project = navParams.get("project");
  	this.getTestPits(String(this.project.id));
  }

   goAnOtherPage(params){
  	this.navCtrl.push(ListhorizonsPage,{project:params});
  }

  getTestPits(filter) {
    this.restProvider.getTestPits(filter)
    .then(data => {
      this.dataline = data;
    });
  }

  CreateTestPit(params){
    this.navCtrl.push(AddtestpitPage,{project:params});
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}
