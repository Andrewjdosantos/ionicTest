import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ConsistencyeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
	PrimaryCohesiveCharacter :any;
	SecondaryCohesiveCharacter : any;
	PrimaryCohesive : any;
	SecondaryCohesive :any;	
	PrimConsistencyOptions :any;
	SecConsistencyOptions :any;
	AllConsOptions: any;
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.id = this.horizon.id;
    this.Horizon = this.horizon.Horizon
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    try {
	this.PrimaryCohesiveCharacter = this.horizon.PrimaryCohesiveCharacter.id;
	this.SecondaryCohesiveCharacter = this.horizon.SecondaryCohesiveCharacter.id;
	this.PrimaryCohesive = this.horizon.PrimaryCohesiveCharacter.Cohesive;
	this.SecondaryCohesive = this.horizon.SecondaryCohesiveCharacter.Cohesive;
	}
	catch(TypeError) {
		console.log('error')
	}
	this.getConsDataSelect('Consistency');
	console.log(this.PrimaryCohesive)
	// this.notify(this.PrimaryCohesive,1);
	// this.notify(this.SecondaryCohesive,0);
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      PrimaryCohesiveCharacter :['', Validators.required],
	  SecondaryCohesiveCharacter : ['', Validators.required],
      PrimaryCohesive :['', Validators.required],
	  SecondaryCohesive : ['', Validators.required],
    });
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


	notify(checked,Options)
	  {
	  	console.log(checked)
	  	if (checked == undefined){
	  		checked = true
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


}


