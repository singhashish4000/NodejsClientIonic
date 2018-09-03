import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigurationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigurationService {
	private config: any;

	constructor(public http: Http) {
		// this.config = {
		// 	serverUrl: 'https://node-server-for-ionic.herokuapp.com/'
		// };
	}
	public getServerUrl(): string {
		let serverUrl = 'https://node-server-for-ionic.herokuapp.com';
		// if (String(this.config.serverUrl).substr(this.config.serverUrl.length - 1, 1) === '/') {
		// 	serverUrl = String(this.config.serverUrl).substr(0, this.config.serverUrl.length - 1);
		// }
		console.log(serverUrl);
		return serverUrl;
	}
}
