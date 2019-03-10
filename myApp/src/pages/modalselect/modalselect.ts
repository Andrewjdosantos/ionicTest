import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { CreateHorizonPage } from '../create-horizon/create-horizon';
import { EditmoisturePage } from '../editmoisture/editmoisture';
import { EditcolourPage } from '../editcolour/editcolour';
import { ConsistencyeditPage } from '../consistencyedit/consistencyedit';
import { EditstructurePage } from '../editstructure/editstructure';
import { EdittexturePage } from '../edittexture/edittexture';
import { EditoriginPage } from '../editorigin/editorigin';
import { EditgroundwaterPage } from '../editgroundwater/editgroundwater';
import { EditpedocretePage } from '../editpedocrete/editpedocrete';
import { SampledetailsPage } from '../sampledetails/sampledetails';
import { EditbioPage } from '../editbio/editbio';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ListhorizonsPage } from '../listhorizons/listhorizons';
/**
 * Generated class for the ModalselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-modalselect',
  templateUrl: 'modalselect.html',
})
export class ModalselectPage {
  private todo : FormGroup; 
  horizon : any;
  NoteNote :any;
  id:any;
  Project:any;
  TestPit:any;
  Horizon:any;
  constructor(public events:Events,public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, private formBuilder: FormBuilder) {
  this.horizon = this.restProvider.currenthorizon
  this.id = this.horizon.Horizon;
  this.Horizon = this.horizon.Horizon
  this.Project = this.horizon.Project.id
  this.TestPit = this.horizon.TestPit.id
  console.log(this.horizon)
    try {
  this.NoteNote = this.horizon.NoteNote;
}
  catch(TypeError) {
    console.log('error')
  }

    this.todo = this.formBuilder.group({
      id:[this.id],
      Project: [this.Project],
      TestPit: [this.TestPit],
      Horizon: [this.horizon.id],
      NoteNote :[''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalselectPage');
  };

  gotoHorizonEditPage(params,horizon){
  	this.navCtrl.push(CreateHorizonPage,{project:params});
  };

  gotoMoistureEditPage(params,horizon){
  	this.navCtrl.push(EditmoisturePage,{horizon:params});
  };

  gotoColourEditPage(params,horizon){
    this.navCtrl.push(EditcolourPage,{horizon:params});
  };

  gotoConsEditPage(params,horizon){
    this.navCtrl.push(ConsistencyeditPage,{horizon:params});
  };

  gotoStructEditPage(params,horizon){
    this.navCtrl.push(EditstructurePage,{horizon:params});
  };

  gotoTextEditPage(params,horizon){
    this.navCtrl.push(EdittexturePage,{horizon:params});
  };
  gotoOriginPage(params,horizon){
    this.navCtrl.push(EditoriginPage,{horizon:params});
  };

  gotoGroundWaterEditPage(params,horizon){
    this.navCtrl.push(EditgroundwaterPage,{horizon:params});
  };

  gotoPedocreteEditPage(params,horizon){
    this.navCtrl.push(EditpedocretePage,{horizon:params});
  };

  gotoSamepleEditPage(params,horizon){
    this.navCtrl.push(SampledetailsPage,{horizon:params});
  };

  gotoBioEditPage(params,horizon){
    this.navCtrl.push(EditbioPage,{horizon:params});
  };

closeModal() {
        this.navCtrl.pop();
    };

  NavHorizons(){
    this.navCtrl.setRoot(ListhorizonsPage,{project:this.horizon.TestPit,projectdets:this.horizon.Project});
  }

  postDataLine() {
    // console.log(JSON.stringify(this.todo.value))
    if (this.id){
     this.restProvider.putDataLine(JSON.stringify(this.todo.value),this.restProvider.currenthorizon.id)
    .then(data => {
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
    } 
  }


}

  