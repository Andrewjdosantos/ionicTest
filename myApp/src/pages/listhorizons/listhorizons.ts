import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { CreateHorizonPage } from '../create-horizon/create-horizon';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
import { ListTestPitsPage } from '../list-test-pits/list-test-pits';
/**
 * Generated class for the ListhorizonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-listhorizons',
  templateUrl: 'listhorizons.html',
})
export class ListhorizonsPage {
	project: any;
	TestPit: any;
	dataline: any;
  TestPitObject:any;
  Project:any;
  ProjectDetails:any;
  constructor(private events:Events,public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.Project = this.restProvider.currenttestpit.TestPitProject;
  	this.TestPit = this.restProvider.currenttestpit.Name;
    this.TestPitObject = this.restProvider.currenttestpit;
    this.ProjectDetails = navParams.get("projectdets")['ProjectName'];
  	this.events.publish('horizon', this.Project);
  	this.getDataLine(this.TestPitObject.id);
   }

   goAnOtherPage(params){
  	this.navCtrl.push(CreateHorizonPage,{project:params});
  }


    showPageModal(params) {
    this.restProvider.currenthorizon = params;
    const modal = this.modalCtrl.create(ModalselectPage,{horizon:params});
    modal.present();
  }


    doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getDataLine(this.TestPitObject.id);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  getDataLine(TestPitObject) {
    console.log(TestPitObject)
  	const filterstring = 'TestPit='+TestPitObject
    this.restProvider.getDataLine(filterstring)
    .then(data => {
      this.dataline = data;
      
      console.log(data)
      
    });
  }

  NavTestPits(){
    this.navCtrl.setRoot(ListTestPitsPage,{projectdets:this.Project});
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}

