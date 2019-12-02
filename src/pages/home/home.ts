import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoteService } from '../../app/note.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {
	notes;
	constructor(public navCtrl: NavController, private noteService: NoteService, db: AngularFireDatabase) {
		//console.log(db);
		//this.notes = noteService.notes;
	}

	ngOnInit() {
		this.notes = this.noteService.fetchNotes();
	}

	onItemClick(note) {
		//console.log("item-click", note);
		this.navCtrl.push('DetailPage', {
			noteParam: note
		});
	}

	onAddClick() {
		this.navCtrl.push('DetailPage');
	}

}



