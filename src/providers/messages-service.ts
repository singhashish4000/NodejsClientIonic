import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConfigurationService } from './configuration-service';
import { AuthenticationService } from './authentication-service';

/*
  Generated class for the ContactsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessagesService {

	constructor(
		public http: Http,
		private configurationService: ConfigurationService,
		private authenticationService: AuthenticationService
	) {
	}
	public getListOfMessages(src_userId, dest_userId): Observable<Response> {
		return this.http.get(this.configurationService.getServerUrl() + '/api/get-all-messages', {
			headers: new Headers({
				'Content-Type': 'application/json',
                'x-access-token': this.authenticationService.getUserToken(),
                'src_userId': src_userId,
                'dest_userId': dest_userId
			})
		}).map( (response: Response) => response.json() );
	}

	public pushDataToDb(data): Observable<Response> {
		console.log("in sewervice", data);
		return this.http.post('https://node-server-for-ionic.herokuapp.com/api/save-db-messages', JSON.stringify({
			data: data,
		}), {
			headers: new Headers({
				'Content-Type': 'application/json',
                'x-access-token': this.authenticationService.getUserToken(),
			})
		}).map( (response: Response) => response.json() );
	}

}
