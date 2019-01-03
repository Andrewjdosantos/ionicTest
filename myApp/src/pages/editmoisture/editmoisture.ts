import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the EditmoisturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editmoisture',
  templateUrl: 'editmoisture.html',
})
export class EditmoisturePage {
	private todo : FormGroup; 
	horizon : any;
	Project :any;
	TestPit : any;
	PrimMoisture :any;
	SecMoisture : any;
	MoistureVariant : any;
	Horizon : any;
	MoistureOptions :any;
	id: any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.getDataSelect('Moisture');
    this.id = this.horizon.id;
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    this.Horizon = this.horizon.Horizon
    try {
    this.PrimMoisture = this.horizon.PrimaryMoisture.id
    this.SecMoisture = this.horizon.SecondaryMoisture.id
    this.MoistureVariant = this.horizon.MoistureVariant
	}
    catch(TypeError) {
	}
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      PrimaryMoisture: ['', Validators.required],
      SecondaryMoisture: [''],
      MoistureVariant: [''],
    });
    console.log(this.todo)



  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditmoisturePage');
  }

  getDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.MoistureOptions = data;
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
  }


}

