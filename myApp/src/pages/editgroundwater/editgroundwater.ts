import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { EditpedocretePage } from '../editpedocrete/editpedocrete';
/**
 * Generated class for the EditgroundwaterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  constructor(public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.horizon = navParams.get("horizon");
    this.getDataSelect('GroundWaterDescriptor');
    this.id = this.horizon.id;
    this.Project = this.horizon.Project.id
    this.TestPit = this.horizon.TestPit.id
    this.Horizon = this.horizon.Horizon
    try {
    this.GroundwaterSeepageDepth = this.horizon.GroundwaterSeepageDepth
    this.GroundwaterSeepageRate = this.horizon.GroundwaterSeepageRate
    this.GroundWaterDescriptors = this.horizon.GroundWaterDescriptors.id
	}
    catch(TypeError) {
	}
    this.todo = this.formBuilder.group({
  	  id:[this.id],
  	  Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.Horizon],
      GroundwaterSeepageDepth: ['', Validators.required],
      GroundwaterSeepageRate: ['',Validators.required],
      GroundWaterDescriptors: ['',Validators.required],
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

