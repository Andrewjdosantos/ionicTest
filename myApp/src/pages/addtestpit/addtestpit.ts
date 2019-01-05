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

// @IonicPage()
@Component({
  selector: 'page-addtestpit',
  templateUrl: 'addtestpit.html',
})
export class AddtestpitPage {
  private todo : FormGroup; 
  project: any;
  testpit: any;
  TPNumber:any;
  id:any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.project = navParams.get("project");
    this.testpit = navParams.get("testpit");
    try{
      this.id = this.testpit.id
    }
    catch(TypeError){
      console.log('no tp')
    }
    try{
      this.TPNumber = this.testpit.Name
    }
    catch(TypeError){
      console.log('no tp')
    }
    console.log(this.testpit)
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
  
  postDataLine() {
    // console.log(JSON.stringify(this.todo.value))
    console.log('id')
    console.log(this.id)
    if (this.id){
     this.restProvider.putDataSelect('TestPit',JSON.stringify(this.todo.value),this.id)
    .then(data => {
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
    } 
    else{
    this.restProvider.postDataSelect('TestPit',JSON.stringify(this.todo.value))
    .then(data => {
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
  }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}
