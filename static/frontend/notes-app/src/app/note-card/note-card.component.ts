import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter, HostListener, ChangeDetectorRef, Inject } from '@angular/core';
import { User } from '@notes/core/models/user.model';
import { Note } from '@notes/core/models/notes.model';
import { UserService } from '../core/services/user/user.service';
import { NoteService } from '../core/services/notes/note.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoteDialogComponent } from '@notes/app/components/note-dialog/note-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() note: Note;
  @Input() user: User;
  @Input() detail: boolean = false;
  colors: [] = [];
  @Output() archiveEvent = new EventEmitter();
  @Output() pinNoteEvent = new EventEmitter();
  postForm: FormGroup;

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getColors();
    this.initForm();
  }

  getColors() {
    this.noteService.colorsInitialized.subscribe(
      (initialized: boolean) => {
        if(initialized) {
          this.noteService.colors.subscribe(
            (response: any) => {
              this.colors = response;
          })
        }
      })
  }

  initForm(){
    this.postForm = new FormGroup({
     title: new FormControl(this.note.title),
     content: new FormControl(this.note.content),
    });
    this.postForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(
        (response) => {
          this.updateNote(response);
        });
  }

  updateNote(response) {
    const data = {
      title: response.title,
      content: response.content,
      user: this.user.id
    }
    this.noteService.editNote(this.note.id, data).subscribe(
      (response: any) => {
        console.log(response);
      },
      (err: any) => {
        console.log(err.error);
        this.postForm.reset();
      })
  }

  openDialog(note: Note) {
    this.dialog.open(NoteDialogComponent, {
      data: {
        note: note,
        user: this.user,
      },
      width: '600px',
    })
  }

  changeColor(note_id, color){
    const data = {
      color: color
    }

    this.noteService.changeColor(note_id, data).subscribe(
      (response: any) => {
        if(response?.success) {
          this.note.color = color.toUpperCase();
        }
      })
  }

  togglePinned(){
    this.noteService.togglePinned(this.note.id).subscribe(
      (response: any) => {
        if(response?.success) {
          this.pinNoteEvent.emit({'note': this.note.id, 'is_pinned': !this.note.is_pinned });
        }
      })
  }

  archive() {
    this.noteService.toggleArchived(this.note.id).subscribe(
      (response: any) => {
        if(response.success) {
          this.archiveEvent.emit({'note': this.note.id, 'is_pinned': this.note.is_pinned });
        }
      })
  }
}
