// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GlobalServiceProvider } from './global-service';

@Injectable()
export class UserServiceProvider {
	_favorites: string[] = [];
	HAS_LOGGED_IN = 'hasLoggedIn';
	HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
	
	constructor(
		public global: GlobalServiceProvider,
		public events: Events,
		public storage: Storage) {
		console.log('Hello UserServiceProvider Provider');
	}



	hasLoggedIn(): Promise<boolean> {
		return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
			return value === true;
		});
	};

}
