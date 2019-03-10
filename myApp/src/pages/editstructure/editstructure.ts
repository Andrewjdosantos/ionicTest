import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { EdittexturePage } from '../edittexture/edittexture';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
/**
 * Generated class for the EditstructurePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-editstructure',
  templateUrl: 'editstructure.html',
})
export class EditstructurePage {
	private todo : FormGroup; 
	horizon : any;
	id: any;
	Horizon : any;
	Project :any;
	TestPit : any;
	PrimaryStructure :any;
	SecondaryStructure : any;
	PrimStructureOptions : any;
	SecStructureOptions :any;
	PrimFilter :any;
	SecFilter :any;
	StructureOptions: any;
	AllStructOptions: any;
	StructureNote:any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = this.restProvider.currenthorizon;
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    try {
	this.PrimaryStructure = this.horizon.PrimaryStructure.id;
		}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.SecondaryStructure = this.horizon.SecondaryStructure.id;
			}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.PrimFilter = this.horizon.PrimaryStructure.PrimaryClassification;
	}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.SecFilter = this.horizon.SecondaryStructure.PrimaryClassification;
	}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.StructureNote = this.horizon.StructureNote;
	}
	catch(TypeError) {
		console.log('error')
	}
	this.getConsDataSelect('Structure');
	// this.getStructureFilters(this.getConsDataSelect('Structure'))
	// console.log(this.PrimaryCohesive)
	// this.notify(this.PrimaryCohesive,1);
	// this.notify(this.SecondaryCohesive,0);
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      PrimaryStructure :['', Validators.required],
	  SecondaryStructure : ['', Validators.required],
      PrimFilter :['', Validators.required],
	  SecFilter : ['', Validators.required],
	  StructureNote: ['']
    });
  }

 DeleteElement(FormElement){
  console.log(FormElement)
  // console.log(this.todo['value'][FormElement])
  this.todo['value'][FormElement] = null
  this[FormElement] = null
  // this.todo['controls'][event]['value'] = undefined
 }

  getConsDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.PrimStructureOptions = data;
      this.SecStructureOptions = data;
      this.AllStructOptions = data;
      this.StructureOptions= this.getStructureFilters(data)
    }).then(data => {
    	// console.log()
		this.Filter(this.PrimFilter,1)
		this.Filter(this.SecFilter,0)
		
    })
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


	Filter(checked,Options)
	  {
	  	// console.log(checked)
	  	if (checked == undefined){
	  		options = this.AllStructOptions
	  	}else{
	    var options =  this.AllStructOptions.filter(function(option) {
			return option.PrimaryClassification == checked;
		});
		}
		if (Options == 1){
			this.PrimStructureOptions = options
		}
		if (Options == 0){
			this.SecStructureOptions = options
		}

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
    this.navCtrl.push(EdittexturePage,{horizon:params});
  };

    showPageModal(params) {
    const modal = this.modalCtrl.create(ModalselectPage,{horizon:params});
    modal.present();
  }


  NavHorizons(){
    this.navCtrl.setRoot(ListhorizonsPage,{project:this.horizon.TestPit,projectdets:this.horizon.Project});
  }
}


