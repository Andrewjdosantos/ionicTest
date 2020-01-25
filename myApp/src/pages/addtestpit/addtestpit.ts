import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
/**
 * Generated class for the AddtestpitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-addtestpit',
  templateUrl: 'addtestpit.html',
})
export class AddtestpitPage {
  private todo : FormGroup; 
  project: any;
  testpit: any;
  TPNumber:any;
  id:any;
  TestPitNote:any;
  Pictures = [];
  constructor(private plt: Platform,private camera: Camera,private geolocation: Geolocation,public navCtrl: NavController,public restProvider: RestProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.project = navParams.get("project");
    this.testpit = navParams.get("testpit");
    console.log(this.testpit)
    try{
      this.TestPitNote = this.testpit.TestPitNote
    }
    catch(TypeError){
      console.log('no tp')
    }

    try{
      this.id = this.testpit.id
    }
    catch(TypeError){
      console.log('no tp')
    }
    try{
      this.TPNumber = this.testpit.Name
    }
    catch(TypeError){
      console.log('no tp')
    }
    try{
      let x = this.testpit.Pictures.split(',')
      console.log(this.testpit.Pictures.length)
      if (this.testpit.Pictures.length >0){
      for (var i in x){
        this.Pictures.push(x[i])
      }
    }
      // this.Pictures = this.testpit.Pictures
    }
    catch(TypeError){
      console.log('no pictures')
    }
    console.log(this.testpit)
    this.todo = this.formBuilder.group({
    Name: ['', Validators.required],
    TestPitProject: this.project.id,
    TestPitNote:[''],
    Longitude:[''],
    Latitude:[''],
    Pictures:['']
  });
  }




takePicture(){
const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

//   this.camera.getPicture(options).then((imagePath) => {
//  // imageData is either a base64 encoded string or a file URI
//  // If it's base64 (DATA_URL):
//  // let base64Image = 'data:image/jpeg;base64,' + imageData;
//  let base64Image = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
//  this.Pictures.push(base64Image)
//  console.log(base64Image)
// }, (err) => {
//  // Handle error
// });


    this.camera.getPicture(options).then(imagePath => {
        // if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        //     this.filePath.resolveNativePath(imagePath)
        //         .then(filePath => {
        //             let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        //             let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        //             this.Pitctures.push(currentName)
        //             // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        //         });
        // } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            this.Pictures.push(currentName)
        // }
    });



}

deletePic(item){
  let pic = this.Pictures.indexOf(item)
  this.Pictures.splice(item,1)
  // this.alert = this.Pictures[0]
}
   postNewTestPit() {
   this.restProvider.postDataSelect('TestPit',JSON.stringify(this.todo.value))
    .then(data => {
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
  }
  
getGeolocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
 this.todo.controls.Longitude.setValue(resp.coords.longitude)
 this.todo.controls.Latitude.setValue(resp.coords.latitude)
 console.log(resp)
}).catch((error) => {
  console.log('Error getting location', error);
});
}

  postDataLine() {
    // console.log(JSON.stringify(this.todo.value))
    this.todo.value.Pictures = this.Pictures.toString()
    console.log('id')
    console.log(this.id)
    if (this.id){
     this.restProvider.putDataSelect('TestPit',JSON.stringify(this.todo.value),this.id)
    .then(data => {
      this.navCtrl.pop();
      console.log(this.todo.value)
    });
    } 
    else{
    this.restProvider.postDataSelect('TestPit',JSON.stringify(this.todo.value))
    .then(data => {
      
      console.log(this.todo.value)
    });
  }
  this.navCtrl.pop();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprojectPage');
  }

}
