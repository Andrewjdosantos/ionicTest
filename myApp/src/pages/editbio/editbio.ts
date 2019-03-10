import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { SampledetailsPage } from '../sampledetails/sampledetails';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
/**
 * Generated class for the EditbioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
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
  BioNote:any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = this.restProvider.currenthorizon;
    this.getBioTypeDataSelect('BiologicalType');
    this.getBioFreqDataSelect('BiologicalFrequency');
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
        try {
    this.BioNote = this.horizon.BioNote
      }
    catch(TypeError) {
  }
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
    BioNote:['']
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

  gotoNextPage(params){
    this.navCtrl.push(SampledetailsPage,{horizon:params});
  };

  postDataLine() {
    // console.log(JSON.stringify(this.todo.value))
    if (this.id){
     this.restProvider.putDataLine(JSON.stringify(this.todo.value),this.id)
    .then(data => {
      this.horizon = this.restProvider.currenthorizon;
    });
    } 
  }

  NavHorizons(){
    this.navCtrl.setRoot(ListhorizonsPage,{project:this.horizon.TestPit,projectdets:this.horizon.Project});
  }

    showPageModal(params) {
    const modal = this.modalCtrl.create(ModalselectPage,{horizon:params});
    modal.present();
  }


}

