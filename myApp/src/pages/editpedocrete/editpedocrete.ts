import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { EditbioPage } from '../editbio/editbio';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
/**
 * Generated class for the EditpedocretePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-editpedocrete',
  templateUrl: 'editpedocrete.html',
})
export class EditpedocretePage {
	private todo : FormGroup; 
	horizon : any;
	id: any;
	Horizon : any;
	Project :any;
	TestPit : any;

	PedocreteType :any;
	PedocreteFrequency : any;
	PedocreteCharacter : any;

	PedocreteTypeOptions :any;
	PedocreteFrequencyOptions :any;
	PedocreteCharacterOptions :any;
  PedoCreteNote: any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = this.restProvider.currenthorizon;
    this.getTextInclSizeDataSelect('PedocreteType');
    this.getTextIncFreqDataSelect('PedocreteFrequency');
    this.getTextIncCharDataSelect('PedocreteCharacter');
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id

        try {
    this.PedocreteType = this.horizon.PedocreteType.id
      }
    catch(TypeError) {
  }
    try {
    this.PedocreteFrequency = this.horizon.PedocreteFrequency.id
          }
    catch(TypeError) {
  }
    try {
    this.PedocreteCharacter = this.horizon.PedocreteCharacter.id
          }
    catch(TypeError) {
  }  
        try {
    this.PedoCreteNote = this.horizon.PedoCreteNote
      }
    catch(TypeError) {
  }
 //    try {
	// this.PrimaryTexture = this.horizon.PrimaryTexture.id;
	// this.PrimaryTextureInclusionSize = this.horizon.PrimaryTextureInclusionSize.id;
	// this.PrimaryTextureInclusionFrequency = this.horizon.PrimaryTextureInclusionFrequency.id;
	// this.PrimaryTextureInclusionCharacter = this.horizon.PrimaryTextureInclusionCharacter.id;

	// this.SecondaryTexture = this.horizon.SecondaryTexture.id;
	// this.SecondaryTextureInclusionSize = this.horizon.SecondaryTextureInclusionSize.id;
	// this.SecondaryTextureInclusionFrequency = this.horizon.SecondaryTextureInclusionFrequency.id;
	// this.SecondaryTextureInclusionCharacter = this.horizon.SecondaryTextureInclusionCharacter.id;

	// this.TertiaryTexture = this.horizon.TertiaryTexture.id;
	// this.TertiaryTextureInclusionSize = this.horizon.TertiaryTextureInclusionSize.id;
	// this.TertiaryTextureInclusionFrequency = this.horizon.TertiaryTextureInclusionFrequency.id;
	// this.TertiaryTextureInclusionCharacter = this.horizon.TertiaryTextureInclusionCharacter.id;
	// }
	// catch(TypeError) {
	// 	console.log('TypeError')
	// }
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
	    PedocreteType :['', Validators.required],
		PedocreteFrequency : ['', Validators.required],
		PedocreteCharacter : ['', Validators.required],	
    PedoCreteNote:['']
    });
  }

 DeleteElement(FormElement){
  console.log(FormElement)
  // console.log(this.todo['value'][FormElement])
  this.todo['value'][FormElement] = null
  this[FormElement] = null
  // this.todo['controls'][event]['value'] = undefined
 }

  getTextInclSizeDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.PedocreteTypeOptions = data;
    });
  }

  getTextIncFreqDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.PedocreteFrequencyOptions = data;
    });
  }

  getTextIncCharDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.PedocreteCharacterOptions = data;
    });
  }

  gotoNextPage(params){
    this.navCtrl.push(EditbioPage,{horizon:params});
  };

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


    showPageModal(params) {
    const modal = this.modalCtrl.create(ModalselectPage,{horizon:params});
    modal.present();
  }

  NavHorizons(){
    this.navCtrl.setRoot(ListhorizonsPage,{project:this.horizon.TestPit,projectdets:this.horizon.Project});
  }

}

