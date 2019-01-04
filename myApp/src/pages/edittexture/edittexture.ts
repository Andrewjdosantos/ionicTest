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

  Angularity :any;
  Fabric: any;
  AngularityOptions :any;
  FabricOptions :any;

  requiresMoreInfo:any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.getTextInclSizeDataSelect('TextureInclusionSize');
    this.getTextIncFreqDataSelect('TextureInclusionFreq');
    this.getTextIncCharDataSelect('TextureInclusionCharacter');
    this.getTextClassDataSelect('TextureClassifications');
    this.getAngDataSelect('AngularityClass');
    this.getFabricDataSelect('FabricClass');
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    this.requiresMoreInfo = false
    try {
	this.PrimaryTexture = this.horizon.PrimaryTexture.id;
} catch(TypeError) {
    console.log('TypeError')
  }
 try {
	this.PrimaryTextureInclusionSize = this.horizon.PrimaryTextureInclusionSize.id;
} catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.PrimaryTextureInclusionFrequency = this.horizon.PrimaryTextureInclusionFrequency.id;
} catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.PrimaryTextureInclusionCharacter = this.horizon.PrimaryTextureInclusionCharacter.id;
} catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.SecondaryTexture = this.horizon.SecondaryTexture.id;
  } catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.SecondaryTextureInclusionSize = this.horizon.SecondaryTextureInclusionSize.id;
  } catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.SecondaryTextureInclusionFrequency = this.horizon.SecondaryTextureInclusionFrequency.id;
  } catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.SecondaryTextureInclusionCharacter = this.horizon.SecondaryTextureInclusionCharacter.id;
  } catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.TertiaryTexture = this.horizon.TertiaryTexture.id;
  } catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.TertiaryTextureInclusionSize = this.horizon.TertiaryTextureInclusionSize.id;
  } catch(TypeError) {
    console.log('TypeError')
  }
try{
	this.TertiaryTextureInclusionFrequency = this.horizon.TertiaryTextureInclusionFrequency.id;
} catch(TypeError) {
    console.log('TypeError')
  }
try{
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
		SecondaryTexture : [''],
		TertiaryTexture : [''],
		PrimaryTextureInclusionSize :[''],
		SecondaryTextureInclusionSize :[''],
		TertiaryTextureInclusionSize : [''],
		PrimaryTextureInclusionFrequency : [''],
		SecondaryTextureInclusionFrequency :[''],	
		TertiaryTextureInclusionFrequency :[''],	
		PrimaryTextureInclusionCharacter : [''],
		SecondaryTextureInclusionCharacter :[''],	
		TertiaryTextureInclusionCharacter :[''],	
    Angularity :[''],
    Fabric :[''],
    });
  }

  checkReqInfo(){
    console.log(this.todo.controls.PrimaryTexture.value)
    console.log(this.TextureClassificationsOptions)
    try{
    this.requiresMoreInfo = this.TextureClassificationsOptions.filter( element => element.id == this.todo.controls.PrimaryTexture.value)[0]['ReqExtraInfo']
    console.log(this.requiresMoreInfo)
    if (this.requiresMoreInfo == False){
      this.todo.value.Angularity = null;
      this.todo.value.Fabric = null;
    }
  }catch(TypeError){
    console.log('no option')
  }
  }

  getTextInclSizeDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.TextureInclusionSizeOptions = data;
    });
  }

  getAngDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.AngularityOptions = data;
    });
  }

  getFabricDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.FabricOptions = data;
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

