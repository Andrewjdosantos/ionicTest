import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SampledetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sampledetails',
  templateUrl: 'sampledetails.html',
})
export class SampledetailsPage {
	private todo : FormGroup; 
	horizon : any;
	Horizon : any;
	Project :any;
	TestPit : any;
	PrimarySampleType :any;
	SecondarySampleType : any;
	TertiarySampleType : any;
	PrimarySampleNumber :any;
	SecondarySampleNumber : any;
	TertiarySampleNumber : any;
	id: any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    // this.getDataSelect('GroundWaterDescriptor');
    this.id = this.horizon.id;
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    this.Horizon = this.horizon.Horizon
    try {
    this.PrimarySampleType = this.horizon.PrimarySampleType
    this.SecondarySampleType = this.horizon.SecondarySampleType
    this.TertiarySampleType = this.horizon.TertiarySampleType
    this.PrimarySampleNumber = this.horizon.PrimarySampleNumber
    this.SecondarySampleNumber = this.horizon.SecondarySampleNumber
    this.TertiarySampleNumber = this.horizon.TertiarySampleNumber
	}
    catch(TypeError) {
	}
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      PrimarySampleType: [''],
      SecondarySampleType: [''],
      TertiarySampleType: [''],
      PrimarySampleNumber: [''],
      SecondarySampleNumber: [''],
      TertiarySampleNumber: [''],
    });



  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditmoisturePage');
  }

  // getDataSelect(FieldName) {
  //   this.restProvider.getDataSelect(FieldName)
  //   .then(data => {
  //     this.GWDescritpros = data;
  //   });
  // }

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