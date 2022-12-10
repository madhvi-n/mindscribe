import { Component, OnInit, HostListener, ChangeDetectorRef, Inject } from '@angular/core';
import { User } from '@notes/core/models/user.model';
import { Note } from '@notes/core/models/notes.model';
import { UserService } from '@notes/core/services/user/user.service';
import { NoteService } from '@notes/core/services/notes/note.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];
  user: User;
  columnCount: number = 5;
  colors = [];

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
    this.getNotes(this.route.snapshot.params.label);
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    var element = document.getElementById('grid-breakpoint');
    if (element !== null) {
      var card_limit = Math.ceil(element.offsetWidth / 270);
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

  getNotes(label: string) {
    this.noteService.getNotesByLabel(label).subscribe(
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

}
