import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { EditgroundwaterPage } from '../editgroundwater/editgroundwater';
/**
 * Generated class for the EditoriginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editorigin',
  templateUrl: 'editorigin.html',
})
export class EditoriginPage {
	private todo : FormGroup; 
	horizon : any;
	id: any;
	Horizon : any;
	Project :any;
	TestPit : any;
	PrimaryOrigin :any;
	PrimaryOriginTyoe : any;
	PrimaryOriginCharacter :any;
	OriginReworked:any;
	OriginOptions: any;
	OriginTypeOptions: any;
	OriginCharacterOptions: any;
	AllOriginTypeOptions :any;
	AllOriginCharacterOptions :any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    try {
	this.PrimaryOrigin = this.horizon.PrimaryOrigin.id;
		}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.PrimaryOriginTyoe = this.horizon.PrimaryOriginTyoe.id;
			}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.PrimaryOriginCharacter = this.horizon.PrimaryOriginCharacter.id;
			}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.OriginReworked = this.horizon.OriginReworked;
	}
	catch(TypeError) {
		console.log('error')
	}
	this.getOriginDataSelect('Origin');
	this.getOriginTypeDataSelect('OriginType');
	this.getOriginCharDataSelect('OriginCharacter');
	// this.getStructureFilters(this.getConsDataSelect('Structure'))
	// console.log(this.PrimaryCohesive)
	// this.notify(this.PrimaryCohesive,1);
	// this.notify(this.SecondaryCohesive,0);
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      PrimaryOrigin :['', Validators.required],
	  PrimaryOriginTyoe : ['', Validators.required],
      PrimaryOriginCharacter :['', Validators.required],
      OriginReworked :['', Validators.required],
    });
  }


  getOriginDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.OriginOptions = data;
      // console.log(data)
    })
  }

  getOriginTypeDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.AllOriginTypeOptions = data;
    }).then(data => {
    	// console.log()
		this.FilterType(this.PrimaryOrigin)
		
    })
  }

	FilterType(checked)
	  {
	  	// console.log(checked)
	  	if (checked == undefined){
	  		options = this.AllOriginTypeOptions
	  	}else{
	    var options =  this.AllOriginTypeOptions.filter(function(option) {
			return option.RelOrigin == checked;
		});
	    this.OriginTypeOptions = options
		}

	  }

  getOriginCharDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.AllOriginCharacterOptions = data;
    }).then(data => {
    	// console.log()
		this.FilterChar(this.PrimaryOriginTyoe)
		
    })
  }

	FilterChar(checked)
	  {
	  	// console.log(checked)
	  	if (checked == undefined){
	  		options = this.AllOriginCharacterOptions
	  	}else{
	    var options =  this.AllOriginCharacterOptions.filter(function(option) {
			return option.RelOriginType == checked;
		});
	    this.OriginCharacterOptions = options
		}

	  }

	FilterBoth(Origin){
		this.FilterChar(Origin)
		this.FilterType(Origin)
	}

	getStructureFilters(arr){
		
		let unique_array = []
		for(let i = 0;i < arr.length; i++){
	        if(unique_array.indexOf(arr[i].PrimaryClassification) == -1){
	            unique_array.push(arr[i].PrimaryClassification)
	        }
	    }
	    console.log(unique_array)
	    return unique_array
	}



	// Filter(checked,Options)
	//   {
	//   	// console.log(checked)
	//   	if (checked == undefined){
	//   		options = this.AllStructOptions
	//   	}else{
	//     var options =  this.AllStructOptions.filter(function(option) {
	// 		return option.PrimaryClassification == checked;
	// 	});

	// 	}
	// 	if (Options == 1){
	// 		this.OriginTypeOptions = options
	// 	}
	// 	if (Options == 0){
	// 		this.SecStructureOptions = options
	// 	}

	//   }

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
    this.navCtrl.push(EditgroundwaterPage,{horizon:params});
  };
}


