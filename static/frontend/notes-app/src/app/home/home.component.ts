import { Component, OnInit, HostListener, ChangeDetectorRef, Inject } from '@angular/core';
import { User } from '@notes/core/models/user.model';
import { Note } from '@notes/core/models/notes.model';
import { UserService } from '@notes/core/services/user/user.service';
import { NoteService } from '@notes/core/services/notes/note.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pinnedNotes: Note[] = [];
  notes: Note[] = [];
  user: User;
  columnCount: number = 5;
  colors = [];
  postForm: FormGroup;
  isSaved: boolean = false;

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
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

  initForm(){
    this.postForm = new FormGroup({
     title: new FormControl('', {validators: [Validators.required]}),
     content: new FormControl('', {validators: [Validators.required]}),
    });
    // this.postForm.valueChanges
    //   .pipe(debounceTime(1000), distinctUntilChanged())
    //   .subscribe(
    //     (response) => {
    //       this.isSaved = true;
    //       this.createNote(response);
    //     });
  }

  getAuthUser() {
    this.userService.userInitialized.subscribe(
      (initialized: boolean) => {
        if(initialized) {
          this.userService.user.subscribe(
            (response: User) => {
              this.user = response;
              console.log(this.user);
            })
        }
      })
  }

  getNotes() {
    this.noteService.fetchNotes().subscribe(
      (response: any) => {
        response.forEach(element => {
          if(element.is_pinned){
            this.pinnedNotes.push(element);
          } else {
            this.notes.push(element);
          }
        });;
      })
  }

  createNote() {
    const data = {
      title: this.postForm.controls.title.value,
      content: this.postForm.controls.content.value,
      user: this.user.id
    }
    this.noteService.createNote(data).subscribe(
      (response: any) => {
        this.postForm.reset();
        this.notes.push(response);
      },
      (err: any) => {
        console.log(err.error);
        this.postForm.reset();
      })
  }

  pinNoteEvent(event: any) {
    // Hack for now
    this.getNotes();
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
}
