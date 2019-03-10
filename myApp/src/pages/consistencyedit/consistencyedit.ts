import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { EditstructurePage } from '../editstructure/editstructure';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
/**
 * Generated class for the ConsistencyeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-consistencyedit',
  templateUrl: 'consistencyedit.html',
})
export class ConsistencyeditPage {
	private todo : FormGroup; 
	horizon : any;
	id: any;
	Horizon : any;
	Project :any;
	TestPit : any;
	ConsistencyVariation :any;
	PrimaryCohesiveCharacter :any;
	SecondaryCohesiveCharacter : any;
	PrimaryCohesive : any;
	SecondaryCohesive :any;	
	PrimConsistencyOptions :any;
	SecConsistencyOptions :any;
	AllConsOptions: any;
	AllConsVariants:any;
	ConsistencyNote:any;
	checked: any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = this.restProvider.currenthorizon;
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon;
    this.Project = this.horizon.Project.id;
    this.TestPit = this.horizon.TestPit.id;
    this.checked = false;
    try {
	this.ConsistencyNote = this.horizon.ConsistencyNote;
}
	catch(TypeError) {
		console.log('error')
	}    

    try {
	this.PrimaryCohesiveCharacter = this.horizon.PrimaryCohesiveCharacter.id;
}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.SecondaryCohesiveCharacter = this.horizon.SecondaryCohesiveCharacter.id;
}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.PrimaryCohesive = this.horizon.PrimaryCohesiveCharacter.Cohesive;
}
	catch(TypeError) {
		console.log('error')
	}
	try {
	this.SecondaryCohesive = this.horizon.SecondaryCohesiveCharacter.Cohesive;
}
	catch(TypeError) {
		console.log('error')
	}
	try{	
	this.ConsistencyVariation = this.horizon.ConsistencyVariation.id;
	console.log('ConsVar')
	console.log(this.horizon.ConsistencyVariation.id)
	}
	catch(TypeError) {
		console.log(this.horizon)
	}
	this.getConsDataSelect('Consistency');
	this.getConsVariantDataSelect('ConsistencyVariant');
	console.log(this.PrimaryCohesive)
	// this.notify(this.PrimaryCohesive,1);
	// this.notify(this.SecondaryCohesive,0);
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.horizon.id],
      PrimaryCohesiveCharacter :['', Validators.required],
	  SecondaryCohesiveCharacter : [''],
      PrimaryCohesive :[''],
	  SecondaryCohesive : [''],
	  ConsistencyVariation : [''],
	  ConsistencyNote:['']
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
      this.PrimConsistencyOptions = data;
      this.SecConsistencyOptions = data;
      this.AllConsOptions = data;
    }).then(data => {
		this.notify(this.PrimaryCohesive,1)
		this.notify(this.SecondaryCohesive,0)
    })
  }

  getConsVariantDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.AllConsVariants = data;
      console.log(this.AllConsVariants)
    })
  }


	notify(checked,Options)
	  {
	  	console.log(checked)
	  	if (checked == undefined){
	  		checked = false
	  	}
	    var options =  this.AllConsOptions.filter(function(option) {
			return option.Cohesive == checked;
		});
		if (Options == 1){
			this.PrimConsistencyOptions = options
		}
		if (Options == 0){
			this.SecConsistencyOptions = options
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
    this.navCtrl.push(EditstructurePage,{horizon:params});
  };

    showPageModal(params) {
    const modal = this.modalCtrl.create(ModalselectPage,{horizon:params});
    modal.present();
  }

  NavHorizons(){
    this.navCtrl.setRoot(ListhorizonsPage,{project:this.horizon.TestPit,projectdets:this.horizon.Project});
  }

}


