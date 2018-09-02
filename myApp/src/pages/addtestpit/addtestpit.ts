import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
/**
/**
 * Generated class for the AddtestpitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtestpit',
  templateUrl: 'addtestpit.html',
})
export class AddtestpitPage {
  private todo : FormGroup; 
  project: any;

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.project = navParams.get("project");
    this.todo = this.formBuilder.group({
    Name: ['', Validators.required],
    TestPitProject: this.project.id,
  });
  }

   postNewTestPit() {
   this.restProvider.postDataSelect('TestPit',JSON.stringify(this.todo.value))
    .then(data => {
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}
