import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AddprojectPage } from '../addproject/addproject';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	projects: any;
  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
	this.getProjects();
  }
  getProjects() {
    this.restProvider.getProjects()
    .then(data => {
      this.projects = data;
      console.log(this.projects);
    });
  }

  goAnOtherPage(params){
  	this.navCtrl.push(AddprojectPage,{project:params});
  }
}
