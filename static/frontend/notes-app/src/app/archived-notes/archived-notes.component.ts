import { Component, OnInit, HostListener, ChangeDetectorRef, Inject } from '@angular/core';
import { User } from '@notes/core/models/user.model';
import { Note } from '@notes/core/models/notes.model';
import { UserService } from '@notes/core/services/user/user.service';
import { NoteService } from '@notes/core/services/notes/note.service';

@Component({
  selector: 'app-archived-notes',
  templateUrl: './archived-notes.component.html',
  styleUrls: ['./archived-notes.component.scss']
})
export class ArchivedNotesComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];
  user: User;
  columnCount: number = 5;
  colors = [];

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
    this.getNotes();
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    var element = document.getElementById('grid-breakpoint');
    if (element !== null) {
      var card_limit = Math.floor(element.offsetWidth / 270);
      this.columnCount = card_limit;
    }
    this.changeDetectorRef.detectChanges();
  }

  getAuthUser() {
    this.userService.userInitialized.subscribe(
      (initialized: boolean) => {
        if(initialized) {
          this.userService.user.subscribe(
            (response: User) => {
              this.user = response;
            })
        }
      })
  }

  getNotes() {
    this.noteService.getArchived().subscribe(
      (response: any) => {
        response.forEach(element => {
          if(element.is_pinned) {
            this.pinnedNotes.push(element);
          } else {
            this.notes.push(element);
          }
        });
      })
  }

  archivedEvent(event: any) {
    if(event.is_pinned){
        this.pinnedNotes = this.pinnedNotes.filter((note) => {
          return note.id !== event.note;
        })
    } else {
      this.notes = this.notes.filter((note) => {
        return note.id !== event.note;
      })
    }
  }

  notePinnedEvent(event: any) {
    if(event.is_pinned) {
      this.notes = this.notes.filter((note) => {
        return note.id !== event.note.id;
      })
      event.note.is_pinned = true;
      this.pinnedNotes.push(event.note);
    } else {
      this.pinnedNotes = this.pinnedNotes.filter((note) => {
        return note.id !== event.note.id;
      })
      event.note.is_pinned = false;
      this.notes.push(event.note);
    }
  }

  noteDeleteEvent(event: any){
    console.log(event);
    if(event.is_pinned) {
      this.pinnedNotes = this.pinnedNotes.filter((note) => {
        return note.id !== event.note;
      });
    } else {
      this.notes = this.notes.filter((note) => {
        return note.id !== event.note.id;
      });
    }
  }
}
