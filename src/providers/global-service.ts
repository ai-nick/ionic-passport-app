import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalServiceProvider {

	apiUrl = 'http://localhost:8000/api';

	constructor(public http: Http) {
		console.log('Hello GlobalServiceProvider Provider');
	}
}
