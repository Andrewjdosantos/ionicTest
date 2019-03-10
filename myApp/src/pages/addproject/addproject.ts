import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { AddtestpitPage } from '../addtestpit/addtestpit';
/**
 * Generated class for the AddprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-addproject',
  templateUrl: 'addproject.html',
})
export class AddprojectPage {
  private todo : FormGroup; 
  project: any;

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
    ProjectName: ['', Validators.required],
    ProjectDesc: ['', Validators.required],
    Client: ['', Validators.required],
  });
  }

   postNewProject() {
   this.restProvider.postDataSelect('Project',JSON.stringify(this.todo.value))
    .then(data => {
      console.log(this.todo.value)
    });
     this.navCtrl.pop();
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}
