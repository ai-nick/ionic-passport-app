import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GlobalServiceProvider } from './global-service';

@Injectable()
export class PassportServiceProvider {
	
	constructor(public http: HttpClient, public global: GlobalServiceProvider) {
		console.log('Hello PassportServiceProvider Provider');
	}

}
