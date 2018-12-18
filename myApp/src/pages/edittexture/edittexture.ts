import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { map, filter, scan } from 'rxjs/operators';
/**
 * Generated class for the EdittexturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edittexture',
  templateUrl: 'edittexture.html',
})
export class EdittexturePage {
	private todo : FormGroup; 
	horizon : any;
	id: any;
	Horizon : any;
	Project :any;
	TestPit : any;
	PrimaryTexture :any;
	SecondaryTexture : any;
	TertiaryTexture : any;
	data :any;
	PrimaryTextureInclusionSize :any;
	SecondaryTextureInclusionSize :any;
	TertiaryTextureInclusionSize : any;

	PrimaryTextureInclusionFrequency : any;
	SecondaryTextureInclusionFrequency :any;	
	TertiaryTextureInclusionFrequency :any;	

	PrimaryTextureInclusionCharacter : any;
	SecondaryTextureInclusionCharacter :any;	
	TertiaryTextureInclusionCharacter :any;	

	TextureInclusionSizeOptions :any;
	TextureInclusionFreqOptions :any;
	TextureInclusionCharacterOptions :any;
	TextureClassificationsOptions :any;
  SecTextureClassificationsOptions :any;
  TertTextureClassificationsOptions :any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.getTextInclSizeDataSelect('TextureInclusionSize');
    this.getTextIncFreqDataSelect('TextureInclusionFreq');
    this.getTextIncCharDataSelect('TextureInclusionCharacter');
    this.getTextClassDataSelect('TextureClassifications');
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    try {
	this.PrimaryTexture = this.horizon.PrimaryTexture.id;
	this.PrimaryTextureInclusionSize = this.horizon.PrimaryTextureInclusionSize.id;
	this.PrimaryTextureInclusionFrequency = this.horizon.PrimaryTextureInclusionFrequency.id;
	this.PrimaryTextureInclusionCharacter = this.horizon.PrimaryTextureInclusionCharacter.id;

	this.SecondaryTexture = this.horizon.SecondaryTexture.id;
	this.SecondaryTextureInclusionSize = this.horizon.SecondaryTextureInclusionSize.id;
	this.SecondaryTextureInclusionFrequency = this.horizon.SecondaryTextureInclusionFrequency.id;
	this.SecondaryTextureInclusionCharacter = this.horizon.SecondaryTextureInclusionCharacter.id;

	this.TertiaryTexture = this.horizon.TertiaryTexture.id;
	this.TertiaryTextureInclusionSize = this.horizon.TertiaryTextureInclusionSize.id;
	this.TertiaryTextureInclusionFrequency = this.horizon.TertiaryTextureInclusionFrequency.id;
	this.TertiaryTextureInclusionCharacter = this.horizon.TertiaryTextureInclusionCharacter.id;
	}
	catch(TypeError) {
		console.log('TypeError')
	}
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
	    PrimaryTexture :['', Validators.required],
		SecondaryTexture : ['', Validators.required],
		TertiaryTexture : ['', Validators.required],
		PrimaryTextureInclusionSize :['', Validators.required],
		SecondaryTextureInclusionSize :['', Validators.required],
		TertiaryTextureInclusionSize : ['', Validators.required],
		PrimaryTextureInclusionFrequency : ['', Validators.required],
		SecondaryTextureInclusionFrequency :['', Validators.required],	
		TertiaryTextureInclusionFrequency :['', Validators.required],	
		PrimaryTextureInclusionCharacter : ['', Validators.required],
		SecondaryTextureInclusionCharacter :['', Validators.required],	
		TertiaryTextureInclusionCharacter :['', Validators.required],	
    });
  }


  getTextInclSizeDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.TextureInclusionSizeOptions = data;
    });
  }

  getTextIncFreqDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.TextureInclusionFreqOptions = data;
    });
  }

  getTextIncCharDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.TextureInclusionCharacterOptions = data;
    });
  }

  getTextClassDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      // console.log(data[0])
      this.data = data;
      this.TextureClassificationsOptions = this.data.filter( element => element.Primary == true)
      this.SecTextureClassificationsOptions = this.data.filter( element => element.Secondary == true)
      this.TertTextureClassificationsOptions = this.data.filter( element => element.Tertiary == true)
    
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

