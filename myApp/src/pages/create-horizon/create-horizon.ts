import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { AddtestpitPage } from '../addtestpit/addtestpit';
import { AddcontactPage } from '../addcontact/addcontact';
/**
 * Generated class for the CreateHorizonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
  this.project = navParams.get("project");
  console.log('Project')
  console.log(this.project)
  if (this.project.Horizon){
    this.id = this.project.id;
  	this.Project = this.project.TestPit.TestPitProject.id;
  	this.TestPit = this.project.TestPit.id;
  	this.PitDepth = this.project.PitDepth;
  	this.Contact = this.project.Contact.id;
  	this.Horizon = this.project.Horizon;
  	this.Profiler = this.project.Profiler;
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
      Contact: ['',Validators.required],
      Horizon: ['',Validators.required],
      Profiler: ['',Validators.required],
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
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
    } 
    else{
    this.restProvider.postDataLine(JSON.stringify(this.todo.value))
    .then(data => {
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
  }
  }

  logForm(){
  	console.log(this.todo.value)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtestpitPage');
  }

}
