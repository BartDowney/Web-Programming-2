import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private baseUrl = 'http://localhost:3100/api';

  constructor(private http: HttpClient) { }

  //notes: Note[] = new Array<Note>();

  getAll() {
    //return this.notes;
    return this.http.get<Note[]>(`${this.baseUrl}/notes`);
  }

  get(id: number) {
    //return this.notes[id];
    return this.http.get<Note>(`${this.baseUrl}/notes/${id}`);
  }

  getId(note: Note) {
    //return this.notes.indexOf(note);
    return note.id;
  }

  add(note: Note) {
    //let newLength = this.notes.push(note);
    //let index = newLength - 1;
    //return index;
    return this.http.post(`${this.baseUrl}/notes`, note);
  }

  update(id: number, title: string, body: string) {
    //let note = this.notes[id];
    //note.title = title;
    //note.body = body;
    const note = { id, title, body };
    return this.http.put(`${this.baseUrl}/notes/${id}`, note);
  }

  delete(id: number) {
    //this.notes.splice(id, 1);
    return this.http.delete(`${this.baseUrl}/notes/${id}`);
  }

}
