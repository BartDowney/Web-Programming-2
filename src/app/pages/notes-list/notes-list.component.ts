import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/Shared/note.model';
import { NotesService } from 'src/app/Shared/notes.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // Entry Animation
      transition('void => *', [
        // Initial State
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*'
        })),
        animate(68)
      ]),
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)', 
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0'
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity:0,
            height:0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  //notes: Note[] = new Array<Note>();
  //filteredNotes: Note[] = new Array<Note>;
  notes$: Observable<Note[]>;
  filteredNotes: Note[] = [];

  @ViewChild('filterInput') filterInputElRef : ElementRef<HTMLInputElement>
  

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notes$ = this.notesService.getAll();
    this.filter(' ');
  }

  deleteNote(note: Note) {
    const noteId = note.id ?? 0;
    this.notesService.delete(noteId).subscribe(() => {
    //let noteId = this.notesService.getId(note)
    //this.notesService.delete(noteId);
      this.filter(this.filterInputElRef.nativeElement.value);
    });
  }

  generateNoteURL(note: Note) {
    //let noteId = this.notesService.getId(note);
    const noteId = this.notesService.getId(note);
    return `/notes/${noteId}`;
  }

  filter(query: string) {
    query = query.toLowerCase().trim();
    this.notes$.subscribe((notes) => {    
      //let allResults: Note[] = new Array<Note>();
      let allResults: Note[] = [];
      let terms: string[] = query.split(' ');
      terms = this.removeDuplicates(terms);
      terms.forEach(term => {
        let results: Note[] = this.relevantNotes(term, notes);
        allResults = [...allResults, ...results]
      })
      let uniqueResults = this.removeDuplicates(allResults);
      this.filteredNotes = uniqueResults;

      this.sortByRelevancy(allResults);
    });
  }

  removeDuplicates(arr: Array<any>) : Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string, notes: Note[]) : Array<Note> {
    query = query.toLowerCase().trim();
    //let relevantNotes = this.notes.filter(note => {
    let relevantNotes = notes.filter((note) => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });

    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]) {
    const noteCountObj: { [key:string] : number } = {};

    searchResults.forEach(note => {
      const noteId = note.id ?? 0;

      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      } else {
        noteCountObj[noteId] = 1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = a.id ?? 0;
      let bId = b.id ?? 0;

      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];

      return bCount - aCount;
    })
  }
}
