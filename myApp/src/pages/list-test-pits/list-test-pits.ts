import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { AddtestpitPage } from '../addtestpit/addtestpit';
import { CreateHorizonPage } from '../create-horizon/create-horizon';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
import { HomePage } from '../home/home';
/**
 * Generated class for the AddprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-list-test-pits',
  templateUrl: 'list-test-pits.html',
})
export class ListTestPitsPage {
	project: any;
	dataline: any;
  CreateHorizon :any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
  	this.project = this.restProvider.currentproject;
    try{
    this.CreateHorizon = navParams.get("dataline");
  }catch{
    this.CreateHorizon = false
  }

    console.log(this.CreateHorizon)
  	this.getTestPits(String(this.project.id));
  }

   goAnOtherPage(params,project){
    this.restProvider.currenttestpit = params
  	this.navCtrl.push(ListhorizonsPage,{project:params,projectdets:project,CreateHorizon:this.CreateHorizon});
  }

  getTestPits(filter) {
    this.restProvider.getTestPits(filter)
    .then(data => {
      this.dataline = data;
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getTestPits(String(this.project.id));
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  CreateTestPit(params){
    this.navCtrl.push(AddtestpitPage,{project:params});
  }

  EditTestpit(params,testpitid){
    this.navCtrl.push(AddtestpitPage,{project:params,testpit:testpitid});
  } 

  Navhome(){
    this.navCtrl.setRoot(HomePage);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}
