import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ConsistencyeditPage } from '../consistencyedit/consistencyedit';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
/**

/**
 * Generated class for the EditcolourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-editcolour',
  templateUrl: 'editcolour.html',
})
export class EditcolourPage {
	private todo : FormGroup; 
	horizon : any;
	id: any;
	Horizon : any;
	Project :any;
	TestPit : any;
	PrimaryColour :any;
	SecondaryColour : any;
	TertiaryColour : any;
	PrimaryInclusionColour :any;
	SecondaryInclusionColour :any;
	TertiaryInclusionColour : any;
	PrimaryInclusionCharacter : any;
	SecondaryInclusionCharacter :any;	
	TertiaryInclusionCharacter :any;	
  SecColourOptions :any;
  PrimColourOptions :any;
  TertColourOptions :any;
	InclusionOptions :any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.getPrimColDataSelect('PrimColour');
    this.getSecColDataSelect('SecColour');
    this.getTertColDataSelect('TertColour');
    this.getIncDataSelect('Inclusion');
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    try {
	this.PrimaryColour = this.horizon.PrimaryColour.id;
    }
  catch(TypeError) {
  }
   try {
	this.SecondaryColour = this.horizon.SecondaryColour.id;
      }
  catch(TypeError) {
  }
   try {
	this.TertiaryColour = this.horizon.TertiaryColour.id;
      }
  catch(TypeError) {
  }
   try {
	this.PrimaryInclusionColour = this.horizon.PrimaryInclusionColour.id;
      }
  catch(TypeError) {
  }
   try {
	this.SecondaryInclusionColour = this.horizon.SecondaryInclusionColour.id;
      }
  catch(TypeError) {
  }
   try {
	this.TertiaryInclusionColour = this.horizon.TertiaryInclusionColour.id;
      }
  catch(TypeError) {
  }
   try {
	this.PrimaryInclusionCharacter = this.horizon.PrimaryInclusionCharacter.id;
      }
  catch(TypeError) {
  }
   try {
	this.SecondaryInclusionCharacter = this.horizon.SecondaryInclusionCharacter.id;
      }
  catch(TypeError) {
  }
   try {
	this.TertiaryInclusionCharacter = this.horizon.TertiaryInclusionCharacter.id;
	}
	catch(TypeError) {
	}
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      PrimaryColour :['', Validators.required],
	  SecondaryColour : [''],
	  TertiaryColour :[''],
	  PrimaryInclusionColour :[''],
	  SecondaryInclusionColour :[''],
	  TertiaryInclusionColour : [''],
	  PrimaryInclusionCharacter : [''],
	  SecondaryInclusionCharacter :[''],	
	  TertiaryInclusionCharacter :[''],
    });
  }

 DeleteElement(FormElement){
  console.log(FormElement)
  // console.log(this.todo['value'][FormElement])
  this.todo['value'][FormElement] = null
  this[FormElement] = null
  // this.todo['controls'][event]['value'] = undefined
 }

  getPrimColDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.PrimColourOptions = data;
    });
  }

  getSecColDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.SecColourOptions = data;
    });
  }

  getTertColDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.TertColourOptions = data;
    });
  }

  getIncDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.InclusionOptions = data;
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

  gotoNextPage(params){
    this.navCtrl.push(ConsistencyeditPage,{horizon:params});
  };

    showPageModal(params) {
    const modal = this.modalCtrl.create(ModalselectPage,{horizon:params});
    modal.present();
  }


}

