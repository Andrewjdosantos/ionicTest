import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class RestProvider {


  // apiUrl = 'http://icefyer5004.pythonanywhere.com/api';
  apiUrl = 'http://icefyer5004.pythonanywhere.com/api';
  constructor(public http: HttpClient,public alertCtrl: AlertController) {
    console.log('Hello PeopleServiceProvider Provider');
  }

  	Success() {
  	let alert = this.alertCtrl.create({
    title: 'Data Added',
    buttons: ['Dismiss']
  	});
  	alert.present();
	}
 
  	Failure() {
  	let alert = this.alertCtrl.create({
    title: 'Data Not Added',
    buttons: ['Dismiss']
  	});
  	alert.present();
	}

	getProjects() {
	return new Promise(resolve => {
	this.http.get(this.apiUrl+'/ProjectView').subscribe(data => {
	resolve(data);}, 
	err => {
	console.log(err);
	});
	});
	}

	getTestPits(filter) {
	return new Promise(resolve => {
	this.http.get(this.apiUrl+'/TestPitView?project='+String(filter)).subscribe(data => {
	resolve(data);}, 
	err => {
	console.log(err);
	});
	});
	}


	getDataSelect(FieldName,){
	return new Promise(resolve => {
	this.http.get(this.apiUrl+'/'+FieldName+'View').subscribe(data => {
	resolve(data);}, 
	err => {
	console.log(err);
	});
	});
	}

	// getFilterDataSelect(FieldName,filter){
	// return new Promise(resolve => {
	// this.http.get(this.apiUrl+'/'+FieldName+'View/?'+filter).subscribe(data => {
	// resolve(data);}, 
	// err => {
	// console.log(err);
	// });
	// });
	// }

	postDataSelect(FieldName,body) {
	return new Promise(resolve => {
	this.http.post(this.apiUrl+'/'+FieldName+'View',body,
		{  	headers: { 'Content-Type': 'application/json' }
	}).subscribe(data => {
		this.Success()
		// alert('Data Added');
	}, 
	err => {
		console.log(body)
		this.Failure()
	// alert('Data Not Added');
	});
	});
	}


	getDataLine(filter) {
	return new Promise(resolve => {
	this.http.get(this.apiUrl+'/list/?'+filter).subscribe(data => {
		console.log(this.apiUrl+'/list/?'+filter);
	resolve(data);}, 
	err => {
	console.log(err);
	});
	});
	}

	postDataLine(body) {
	return new Promise(resolve => {
	this.http.post(this.apiUrl+'/listpost/',body,
		{  	headers: { 'Content-Type': 'application/json' }
	}).subscribe(data => {
		this.Success();
		// alert('Data Added');
	}, 
	err => {
		console.log(body);
		this.Failure();
	// alert('Data Not Added');
	});
	});
	}

	putDataLine(body,pk) {
	return new Promise(resolve => {
	this.http.put(this.apiUrl+'/listput/'+pk,body,
		{  	headers: { 'Content-Type': 'application/json' }
	}).subscribe(data => {
		this.Success()
		// alert('Data Added');
	}, 
	err => {
		console.log(body)
		this.Failure()
	// alert('Data Not Added');
	});
	});
	}



}
