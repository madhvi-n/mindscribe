import { AfterContentChecked, Component, OnInit, HostListener } from '@angular/core';
import { UserService } from './core/services/user/user.service';
import { NoteService } from './core/services/notes/note.service';
import { StorageHandlerService } from './core/services/storage/storage-handler.service';
import { User } from './core/models/user.model';
import { environment } from '@notes/env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditLabelDialogComponent } from '@notes/app/components/edit-label-dialog/edit-label-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  path: string;
  authRoute: boolean = false;
  user: User;
  value = 'Search';
  labels: [] = [];
  searchControl: FormControl = new FormControl();
  colors: [] = [];
  
  constructor(
    private router: Router,
    private userService: UserService,
    private noteService: NoteService,
    private storage: StorageHandlerService,
    private dialog: MatDialog
  ) {
    this.router.events.subscribe(
      () => this.path = this.router.url
    );
    this.path = this.router.url;
  }

  ngOnInit(): void {
    this.userService.fetchUser((user) => this.user = user);
    if(this.user){
      this.getLabels();
    }
    this.getColors();
  }
  @HostListener('window:scroll', ['$event'])
  onResize() {
    var element = document.getElementById('header');
    if (element !== null && document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      // console.log('add class');
    } else {
      // console.log('remove class');
    }
  }

  ngAfterContentChecked(): void {
    if (this.path.includes('/sign-in')
      || this.path.includes('/sign-up')
      || this.path.includes('logout')) {
        this.authRoute = true;
    } else {
      this.authRoute = false;
    }
  }

  getColors() {
    this.noteService.getColors().subscribe(
      (response: any) => {
        this.colors = response.colors;
        this.noteService.setColors(this.colors);
      })
  }

  getLabels(){
    this.noteService.getUserLabels().subscribe(
      (response: any) => {
        this.labels = response;
      })
  }

  editLabel() {

  }

  addLabel() {
    const dialogRef = this.dialog.open(EditLabelDialogComponent, {
      data: {
        user: this.user,
        new: true
      },
      width: '300px'
    })

    dialogRef.afterClosed().subscribe(
      result => { console.log(result) }
    );
  }

  logout() {
    this.userService.logout().subscribe(
      (response) => {
        this.storage.removeItem('user');
        window.location.href = `${environment.loginUrl}`;
      },
      (error) => {
        console.log(error);
      });
  }

  search() {
    this.router.navigate(['search'], {
      queryParams: {
        query: this.searchControl.value,
      },
    });
    this.searchControl.reset();
  }
}
