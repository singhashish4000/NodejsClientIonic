import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthenticationService } from '../../providers/authentication-service';
import { SocketioService } from '../../providers/socketio-service';
import { MessagesService } from '../../providers/messages-service';

/*
  Generated class for the ContactsChat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contacts-chat',
  templateUrl: 'contacts-chat.html'
})
export class ContactsChatPage {
	private contact: any;
	private message: string;
	private messages: any[];
	private tmp_messages: any[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authenticationService: AuthenticationService,
		private socketioService: SocketioService,
		private messageService: MessagesService
	) {
		this.contact = this.navParams.get('contact');

		this.message = '';
		this.messages = [];
		//console.log(this.messages)

		this.socketioService.getSocket().on('private-message', (data) => {
			//console.log(data);
		
			console.log("Got Socket Messages");
			 this.messages.push(data);
		});

		//

	
		console.log(this.messages);

		// this.tmp_messages.push(db_messages)
		
		// for(let i=0; i<= this.tmp_messages.length; i++) {

		// 	console.log("aa",db_messages["message"].data["result"][i]);
		// 	this.messages.push(db_messages["message"].data["result"][i])			

		// }


	
		// console.log("COUNT",this.messages.length);

		// for(let i=0; i >= this.messages.length; i++) {

		// 	console.log(this.messages[i]);
		// 	this.tmp_messages.push(this.messages[i])			

		// }

		// this.messages.forEach(msg=>{
		// 	debugger;
		// 	console.log("aa",msg);
		// 	this.tmp_messages.push(msg);
		// })

		// console.log("Aaa",this.messages);

	}

	getDbMessages() {
		let db_messages = this.messageService.getListOfMessages(6, 5);
		db_messages.forEach(db_message => {
			//console.log(db_message);
			if (db_message["message"].data !== undefined) {
				let db = db_message["message"].data["result"]
				db.forEach((element, index) => {
					//console.log(element);
					this.messages.push(element);
				});
		   }			
		});	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ContactsChatPage');
		this.getDbMessages();
		
	}

	public sendMessage(): void {
		if (this.message !== '') {
			this.socketioService.emitPrivateMessage(this.contact.userId, this.message);

			this.message = '';
		}
	}
	public getUserLogin(): string {
		return this.authenticationService.getUserLogin();
	}
	public formatMessageTime(time: any): string {
		let res = '';
		let messageDate = new Date(time).toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' });
		let messageTime = new Date(time).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
		let currDate = new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' });

		if (messageDate === currDate) {
			res = messageTime;
		}
		else {
			res = messageDate;
		}

		return res;
	}
}
