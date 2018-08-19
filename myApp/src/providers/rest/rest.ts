import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class RestProvider {
  apiUrl = 'https://jsonplaceholder.typicode.com';
  constructor(public http: HttpClient) {
    console.log('Hello PeopleServiceProvider Provider');
  }
	getUsers() {
	return new Promise(resolve => {
	this.http.get(this.apiUrl+’/users’).subscribe(data => {
	resolve(data);}, 
	err => {
	console.log(err);
	});
	});
	}

}
