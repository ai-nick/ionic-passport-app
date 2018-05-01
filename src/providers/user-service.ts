import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GlobalServiceProvider } from './global-service';
import { PassportServiceProvider } from './passport-service';

@Injectable()
export class UserServiceProvider {
	_favorites: string[] = [];
	HAS_LOGGED_IN = 'hasLoggedIn';
	HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
	
	constructor(
		public global: GlobalServiceProvider,
		public authProvider: PassportServiceProvider,
		public events: Events,
		private http: Http,
		public storage: Storage,
		public authHttp: HttpClient) {
		console.log('Hello UserServiceProvider Provider');
	}

	login(login: {}) {

		console.log(this.global.apiUrl+this.authProvider.loginUrl);
		return this.http.post(this.global.apiUrl+this.authProvider.loginUrl, login)
		.map(response => response.json())
		.map(data => {
			console.log('userSP@login');
			this.setAuth(data);
			this.getUser();
			return data.token;
		});		
	};

	private setAuth(data) {
		return this.storage.set('token', JSON.stringify(data));
	}

	getUser() {

		this.authHttp.get(this.global.apiUrl+'/user')
		.subscribe(data => {
			console.log(data);
			this.setUser(data);
			return data;
		}, err => console.log(err));
		
	};

	getToken() {
		return this.storage.get('token').then((val) => {
			let token = JSON.parse(val);
		});        	
	};

	private setUser(data) {
		return this.storage.set('user', data);
	}

	hasLoggedIn(): Promise<boolean> {
		return this.storage.get('token').then((val) => {
			if(val) {
				return true;
			}
			return false;
		});
	};

	logout(): void {
		this.storage.remove('token');
		this.storage.remove('user');
		this.events.publish('user:logout');
	};

}
