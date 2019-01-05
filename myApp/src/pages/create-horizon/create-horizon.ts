import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { AddtestpitPage } from '../addtestpit/addtestpit';
import { AddcontactPage } from '../addcontact/addcontact';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CreateHorizonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-create-horizon',
  templateUrl: 'create-horizon.html',
})
export class CreateHorizonPage {	
	private todo : FormGroup; 
	project: any;
  id:any;
	Project: any;
	ContactOptions: any;
	TestPit: any;
	PitDepth: any;
	Contact: any;
	Horizon: any;
	Profiler: any;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
  this.project = navParams.get("project");
  console.log('Project')
  console.log(this.project)
  if (this.project.PitDepth){
    try{
      this.id = this.project.id;
          }
      catch(TypeError){
        console.log('no tp')
      }
      try{
      this.Project = this.project.TestPit.TestPitProject.id;
          }
      catch(TypeError){
        console.log('no tp')
      }
      try{
      this.TestPit = this.project.TestPit.id;
          }
      catch(TypeError){
        console.log('no tp')
      }
      try{
      this.PitDepth = this.project.PitDepth;
          }
      catch(TypeError){
        console.log('no tp')
      }
      try{
      this.Contact = this.project.Contact.id;
          }
      catch(TypeError){
        console.log('no tp')
      }
      try{
      this.Horizon = this.project.Horizon;
          }
      catch(TypeError){
        console.log('no tp')
      }
      try{
      this.Profiler = this.project.Profiler;
      }
      catch(TypeError){
        console.log('no tp')
      }
  }else{
    this.Project = this.project.TestPitProject;
    this.TestPit = this.project.id;
  }

  this.getDataSelect('Contact');
  console.log(this)
  this.todo = this.formBuilder.group({
  	  id:[this.id],
      Project: [this.Project],
      TestPit: [this.TestPit],
      PitDepth: ['', Validators.required],
      Contact: [''],
      Horizon: [-1],
      Profiler: [''],
    });
  }

   GOTOcontactDetails(params){
    this.navCtrl.push(AddcontactPage,{dataline:params});
  }


  getDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.ContactOptions = data;
    });
  }

  postDataLine() {
    // console.log(JSON.stringify(this.todo.value))
    if (this.id){
     this.restProvider.putDataLine(JSON.stringify(this.todo.value),this.id)
    .then(data => {
      this.presentAlert()
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
    } 
    else{
    this.restProvider.postDataLine(JSON.stringify(this.todo.value))
    .then(data => {
      this.presentAlert()
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
  }
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Low battery',
    subTitle: '10% of battery remaining',
    buttons: ['Dismiss']
  });
  alert.present();
}


  logForm(){
  	console.log(this.todo.value)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtestpitPage');
  }

}
