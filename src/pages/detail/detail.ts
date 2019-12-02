import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NoteService } from '../../app/note.service'

/**
* Generated class for the DetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {
    deleteNoteFlag = false;
    note;
    newNoteFlag = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, private noteService: NoteService, private alertCtrl: AlertController) {
        this.note = this.navParams.get("noteParam");
        if (!this.note) {
            this.note = {
                id: "",
                nome: "",
                modelo: "",
                cor: "",
                placa: ""
            };
            this.newNoteFlag = true;
        }
    }

    onTrash() {
        //constrói o alerta
        let confirm = this.alertCtrl.create({
            title: "Delete?",
            message: `Are you sure you want to delete this note: "${this.note.title}"?`,
            buttons: [
                //primeiro botão, sem handler não faz nada
                {
                    text: "Cancel"
                },
                //segundo botão
                {
                    text: "Confirm",
                    handler: () => {
                        this.deleteNoteFlag = true;
                        this.noteService.removeNote(this.note);
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        //exibe
        confirm.present();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailPage');
    }

    ionViewWillLeave() {
        if (this.newNoteFlag) {
            if (this.note.title != "" && this.note.content != "" && this.note.date != "")
                this.noteService.addNote(this.note);
        }
        else if (!this.deleteNoteFlag) {
            //somente editamos se não for uma remoção
            this.noteService.editNote(this.note);
        }
    }

}
