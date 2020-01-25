import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { CreateHorizonPage } from '../create-horizon/create-horizon';
import { ModalController } from 'ionic-angular';
import { ModalselectPage } from '../modalselect/modalselect';
import { ListTestPitsPage } from '../list-test-pits/list-test-pits';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the ListhorizonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-listhorizons',
  templateUrl: 'listhorizons.html',
})
export class ListhorizonsPage {
	project: any;
	TestPit: any;
	dataline: any;
  TestPitObject:any;
  Project:any;
  ProjectDetails:any;
  CreateHorizon:any;

  constructor(private geolocation: Geolocation,private alertCtrl: AlertController,private events:Events,public modalCtrl: ModalController,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
        try{
    this.CreateHorizon = navParams.get("CreateHorizon");
  }catch{
    this.CreateHorizon = false
  }

    console.log(this.CreateHorizon)
    this.Project = this.restProvider.currenttestpit.TestPitProject;
  	this.TestPit = this.restProvider.currenttestpit.Name;
    this.TestPitObject = this.restProvider.currenttestpit;
    this.ProjectDetails = navParams.get("projectdets")['ProjectName'];
  	this.events.publish('horizon', this.Project);
  	this.getDataLine(this.TestPitObject.id);
   }

   goAnOtherPage(params){
  	this.navCtrl.push(CreateHorizonPage,{project:params});
  }


    showPageModal(params) {
    this.restProvider.currenthorizon = params;
    const modal = this.modalCtrl.create(ModalselectPage,{horizon:params});
    modal.present();
  }


    doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getDataLine(this.TestPitObject.id);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


getGeolocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
 console.log(resp)
}).catch((error) => {
  console.log('Error getting location', error);
});
}


  getDataLine(TestPitObject) {
    var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};
    console.log(TestPitObject)
  	const filterstring = 'TestPit='+TestPitObject
    this.restProvider.getDataLine(filterstring)
    .then((data:any) => {
      this.dataline = data.sort(sortByProperty('PitDepth'));
      console.log(data)
      
    });
  }

  postDuplicate(horizon){
    this.restProvider.postDataLine(JSON.stringify(horizon))
    .then(data => {
      this.showPageModal(data)
      console.log('duplicate',data)
    });
    this.CreateHorizon = false;
    this.getDataLine(this.TestPitObject.id);
  }

  presentConfirm(horizon) {
  let alert = this.alertCtrl.create({
    title: 'Confirm duplicate',
    message: 'Are you sure you want to duplicate:'+horizon['PitDepth']+'m | '+horizon['Label'],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Duplicate',
        handler: () => {
          this.duplicate(horizon)
        }
      }
    ]
  });
  alert.present();
}

 



  duplicate(horizon) {
    var origHorizon = horizon

    var IgnoreFields = ['NoteNote','PrimarySampleNumber','PrimarySampleType','SampleNote','SecondarySampleNumber','SecondarySampleType','TertiarySampleNumber','TertiarySampleType']

    for (var property in this.CreateHorizon){
      horizon[property] = this.CreateHorizon[property]
    }
    if (typeof(horizon['Contact']) !== undefined){
      horizon['Contact'] = null;
      horizon['UpperContactRange'] = null;
      horizon['LowerContactRange'] = null;
    }
    for (var property in horizon){
      if (horizon[property] !== null && typeof(horizon[property]) !== undefined){
        console.log(property)
        if (horizon[property].hasOwnProperty('id')){
          horizon[property] = horizon[property].id
          console.log(property)
        }
    }
    }

    for (var i in IgnoreFields){
      console.log(i)
      delete horizon[IgnoreFields[i]];
    }
    console.log(JSON.stringify(horizon)) 
    this.postDuplicate(horizon)
  }

  NavTestPits(){
    this.navCtrl.setRoot(ListTestPitsPage,{projectdets:this.Project});
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}

