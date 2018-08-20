import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the AddprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproject',
  templateUrl: 'addproject.html',
})
export class AddprojectPage {
	project: any;
	private todo : FormGroup; 

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
  	this.project = navParams.get("project");
  	this.getDataLine(String(this.project));
  	console.log(this.dataline)
	 this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      project: [''],
    });


  }


  getDataLine(filter) {
    this.restProvider.getDataLine(filter)
    .then(data => {
      this.dataline = data;
      console.log(this.projects);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

  logForm(){
    console.log(this.todo.value)
  }
}
