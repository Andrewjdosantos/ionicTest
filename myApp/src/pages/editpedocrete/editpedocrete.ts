import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the EditpedocretePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
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
    });
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

