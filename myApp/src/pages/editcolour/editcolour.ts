import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
/**

/**
 * Generated class for the EditcolourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
	ColourOptions :any;
	InclusionOptions :any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.getColDataSelect('Colour');
    this.getIncDataSelect('Inclusion');
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    try {
	this.PrimaryColour = this.horizon.PrimaryColour.id;
	this.SecondaryColour = this.horizon.SecondaryColour.id;
	this.TertiaryColour = this.horizon.TertiaryColour.id;
	this.PrimaryInclusionColour = this.horizon.PrimaryInclusionColour.id;
	this.SecondaryInclusionColour = this.horizon.SecondaryInclusionColour.id;
	this.TertiaryInclusionColour = this.horizon.TertiaryInclusionColour.id;
	this.PrimaryInclusionCharacter = this.horizon.PrimaryInclusionCharacter.id;
	this.SecondaryInclusionCharacter = this.horizon.SecondaryInclusionCharacter.id;
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
	  SecondaryColour : ['', Validators.required],
	  TertiaryColour :['', Validators.required],
	  PrimaryInclusionColour :['', Validators.required],
	  SecondaryInclusionColour :['', Validators.required],
	  TertiaryInclusionColour : ['', Validators.required],
	  PrimaryInclusionCharacter : ['', Validators.required],
	  SecondaryInclusionCharacter :['', Validators.required],	
	  TertiaryInclusionCharacter :['', Validators.required],
    });
  }


  getColDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.ColourOptions = data;
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


}
