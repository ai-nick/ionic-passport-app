import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalServiceProvider {

	apiUrl = 'http://localhost:8000';

	constructor(public http: HttpClient) {
		console.log('Hello GlobalServiceProvider Provider');
	}
}
