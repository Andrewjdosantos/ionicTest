import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { EditpedocretePage } from '../editpedocrete/editpedocrete';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
/**
 * Generated class for the EditgroundwaterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-editgroundwater',
  templateUrl: 'editgroundwater.html',
})
export class EditgroundwaterPage {
	private todo : FormGroup; 
	horizon : any;
	Project :any;
	TestPit : any;
	GroundwaterSeepageDepth :any;
	GroundwaterSeepageRate : any;
	GroundWaterDescriptors : any;
	Horizon : any;
	GWDescritpros :any;
	id: any;
  GroundWaterNote:any;
  jsoner:any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = this.restProvider.currenthorizon;
    this.getDataSelect('GroundWaterDescriptor');
    this.id = this.horizon.id;
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    this.Horizon = this.horizon.Horizon
    try {
    this.GroundwaterSeepageDepth = this.horizon.GroundwaterSeepageDepth
      }
    catch(TypeError) {
  }
  try {
    this.GroundwaterSeepageRate = this.horizon.GroundwaterSeepageRate
          }
    catch(TypeError) {
  }
    try {
    this.GroundWaterDescriptors = this.horizon.GroundWaterDescriptors.id
              }
    catch(TypeError) {
  }
      try {
    this.GroundWaterNote = this.horizon.GroundWaterNote
	}
    catch(TypeError) {
	}
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      GroundwaterSeepageDepth: null,
      GroundwaterSeepageRate: null,
      GroundWaterDescriptors: [''],
      GroundWaterNote: ['']
    });



  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditmoisturePage');
  }

  getDataSelect(FieldName) {
    this.restProvider.getDataSelect(FieldName)
    .then(data => {
      this.GWDescritpros = data;
    });
  }

  gotoNextPage(params){
    this.navCtrl.push(EditpedocretePage,{horizon:params});
  };

  postDataLine() {
    this.jsoner = JSON.stringify(this.todo.value)
    if (this.todo.value['GroundwaterSeepageRate'] == ''){
      console.log(this.jsoner)
      this.todo.value['GroundwaterSeepageRate']= null;
    }
    if (this.todo.value['GroundwaterSeepageDepth'] == ''){
      console.log(this.jsoner)
      this.todo.value['GroundwaterSeepageDepth']= null;
    }
    
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

 DeleteElement(FormElement){
  console.log(FormElement)
  // console.log(this.todo['value'][FormElement])
  this.todo['value'][FormElement] = null
  this[FormElement] = null
  // this.todo['controls'][event]['value'] = undefined
 }

  NavHorizons(){
    this.navCtrl.setRoot(ListhorizonsPage,{project:this.horizon.TestPit,projectdets:this.horizon.Project});
  }


}

