import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the AddcontactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-addcontact',
  templateUrl: 'addcontact.html',
})
export class AddcontactPage {
	private todo : FormGroup; 
	id:any;
	dataline: any;
  UpperContactRange:any;
	LowerContactRange: any;
	ContactDirection: any;
	Project: any;
	TestPit: any;
	Horizon : any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
  this.dataline = this.restProvider.currenthorizon;
	this.id = this.dataline.id;
	this.TestPit = this.dataline.TestPit.id;
  this.Project = this.dataline.Project.id;
  this.Horizon = this.dataline.Horizon
      try {
  this.UpperContactRange = this.dataline.UpperContactRange;
}
  catch(TypeError) {
    console.log('error')
  } 
      try {
  this.LowerContactRange = this.dataline.LowerContactRange;
}
  catch(TypeError) {
    console.log('error')
  } 
      try {
  this.ContactDirection = this.dataline.ContactDirection;
}
  catch(TypeError) {
    console.log('error')
  } 

  this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      UpperContactRange: ['', Validators.required],
      LowerContactRange: ['', Validators.required],
      ContactDirection: ['', Validators.required],
    });


}


  postDataLine() {
     this.restProvider.putDataLine(JSON.stringify(this.todo.value),this.id)
    .then(data => {
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
  }

 }