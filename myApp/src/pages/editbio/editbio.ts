import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the EditbioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editbio',
  templateUrl: 'editbio.html',
})
export class EditbioPage {
	private todo : FormGroup; 
	horizon : any;
	id: any;
	Horizon : any;
	Project :any;
	TestPit : any;

	BiologicalType :any;
	BiologicalFrequency : any;

	BiologicalTypeOptions :any;
	BiologicalFrequencyOptions :any;

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.getBioTypeDataSelect('BiologicalType');
    this.getBioFreqDataSelect('BiologicalFrequency');
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
        try {
    this.BiologicalType = this.horizon.BiologicalType.id
      }
    catch(TypeError) {
  }
    try {
    this.BiologicalFrequency = this.horizon.BiologicalFrequency.id
          }
    catch(TypeError) {
  }

    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
	    BiologicalType :['', Validators.required],
		BiologicalFrequency : ['', Validators.required],
    });
  }

 DeleteElement(FormElement){
  console.log(FormElement)
  // console.log(this.todo['value'][FormElement])
  this.todo['value'][FormElement] = null
  this[FormElement] = null
  // this.todo['controls'][event]['value'] = undefined
 }

  getBioTypeDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.BiologicalTypeOptions = data;
    });
  }

  getBioFreqDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.BiologicalFrequencyOptions = data;
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

