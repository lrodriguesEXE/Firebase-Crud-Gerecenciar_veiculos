import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NoteService {

    constructor(private db: AngularFireDatabase) {

    }

    /*notes = [
        {
            id: '1',
            nome: 'Fiat Palio',
            modelo: 'Adventure',
            cor: 'Prata',
            placa: 'DUD-5555'
        },
        {
            id: '2',
            nome: 'Fiat Palio',
            modelo: 'Fire',
            cor: 'Preto',
            placa: 'FUC-3333'
        }
    ]*/


    removeNote(note) {
        this.db.object("/notes/" + note.$key).remove()
            .then(
                x => console.log("Note deleted successfully")
            ).
            catch(error => {
                console.log("Could not delete car");
                alert("Could not delete car")
            });
    }

    addNote(note) {
        //this.notes.push(note);
        this.db.list("/notes/").push({
            nome: note.nome,
            modelo: note.modelo,
            cor: note.cor,
            placa: note.placa
        });
    }

    fetchNotes() {
        return this.db.list("/notes/");
    }

    editNote(note) {
        this.db.object("/notes/" + note.$key).update({
            nome: note.nome,
            modelo: note.modelo,
            cor: note.cor,
            placa: note.placa
        });
    }


}