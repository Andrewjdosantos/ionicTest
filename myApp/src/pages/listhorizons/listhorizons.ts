import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { CreateHorizonPage } from '../create-horizon/create-horizon';

/**
 * Generated class for the ListhorizonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
  	
    this.Project = navParams.get("project").TestPitProject;
  	this.TestPit = navParams.get("project").Name;
    this.TestPitObject = navParams.get("project");

  	// console.log(this.TestPitObject)
  	this.getDataLine(this.TestPitObject.id);
  }

   goAnOtherPage(params){
  	this.navCtrl.push(CreateHorizonPage,{project:params});
  }

  getDataLine(TestPitObject) {
    console.log(TestPitObject)
  	const filterstring = 'TestPit='+TestPitObject
    this.restProvider.getDataLine(filterstring)
    .then(data => {
      this.dataline = data;
      
    });
  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}