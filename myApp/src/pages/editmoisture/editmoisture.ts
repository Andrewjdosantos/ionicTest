import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { EditcolourPage } from '../editcolour/editcolour';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
/**
 * Generated class for the EditmoisturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-editmoisture',
  templateUrl: 'editmoisture.html',
})
export class EditmoisturePage {
	private todo : FormGroup; 
	horizon : any;
	Project :any;
	TestPit : any;
	PrimMoisture :any;
	SecMoisture : any;
	MoistureVariant : any;
	Horizon : any;
	MoistureOptions :any;
	id: any;
  MoistureNote:any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = this.restProvider.currenthorizon;
    this.getDataSelect('Moisture');
    this.id = this.horizon.id;
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    this.Horizon = this.horizon.Horizon
    try {
    this.PrimMoisture = this.horizon.PrimaryMoisture.id
      }
    catch(TypeError) {
  }
    try {
    this.SecMoisture = this.horizon.SecondaryMoisture.id
          }
    catch(TypeError) {
  }
    try {
    this.MoistureVariant = this.horizon.MoistureVariant
	}
    catch(TypeError) {
	}
    try {
    this.MoistureNote = this.horizon.MoistureNote
  }
    catch(TypeError) {
  }
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      PrimaryMoisture: ['', Validators.required],
      SecondaryMoisture: [''],
      MoistureVariant: [''],
      MoistureNote: [''],
    });
    console.log(this.todo)
  }
 
 DeleteElement(FormElement){
  console.log(FormElement)
  // console.log(this.todo['value'][FormElement])
  this.todo['value'][FormElement] = null
  this[FormElement] = null
  // this.todo['controls'][event]['value'] = undefined
 }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditmoisturePage');
  }

  getDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.MoistureOptions = data;
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
    this.navCtrl.push(EditcolourPage,{horizon:params});
  };

    showPageModal(params) {
    const modal = this.modalCtrl.create(ModalselectPage,{horizon:params});
    modal.present();
  }

  NavHorizons(){
    this.navCtrl.setRoot(ListhorizonsPage,{project:this.horizon.TestPit,projectdets:this.horizon.Project});
  }
}

