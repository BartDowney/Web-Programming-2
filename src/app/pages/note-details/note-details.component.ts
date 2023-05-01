import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/Shared/note.model';
//import { NotesService } from 'src/app/Shared/notes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note;
  noteId: number;
  new: boolean;

  //constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) {}
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() { 

    this.route.params.subscribe((params: Params) => {
      this.note = {id: null, title: '', body: ''}; 
      if (params.id) {
        //this.note = this.notesService.get(params.id);
        //this.noteId = params.id;
        //this.new = false;
        this.http.get<{ note: Note }>(`http://localhost:3100/api/notes/${params.id}`).subscribe(responseData => {
          this.note = responseData.note;
          this.noteId = params.id;
          this.new = false;
        });
      } else {
        this.new = true;
        
      }
    });
  
  }

  onSubmit(form: NgForm) {
    if (this.new) {
      this.http.post<{ message: string, note: Note }>('http://localhost:3100/api/notes/', form.value).subscribe(responseData => {
        console.log(responseData.message);
        this.router.navigateByUrl('/');
      });
    } else {
      this.http.put<{ message: string }>('http://localhost:3100/api/notes/' + this.noteId, form.value).subscribe(responseData => {
        console.log(responseData.message);
        this.router.navigateByUrl('/');
      });
    }
  }

  onDelete() {
    if (this.noteId) {
      this.http.delete<{ message: string }>(`http://localhost:3100/api/notes/${this.noteId}`).subscribe(responseData => {
        console.log(responseData.message);
        this.router.navigateByUrl('/');
      });
    }
  }
    //this.notesService.add(form.value);
    //} else {
      //this.notesService.update(this.noteId, form.value.title, form.value.body);
    //}
    //this.router.navigateByUrl('/');
  //}

  cancel() {
    this.router.navigateByUrl('/');
  }
}
