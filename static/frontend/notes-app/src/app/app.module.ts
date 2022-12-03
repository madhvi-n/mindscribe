import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientXsrfModule, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignOutComponent } from './auth/sign-out/sign-out.component';
import { LabelComponent } from './label/label.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { ArchivedNotesComponent } from './archived-notes/archived-notes.component';
import { ReminderComponent } from './reminder/reminder.component';
import { SearchComponent } from './search/search.component';

import { AuthInterceptor } from './auth.interceptor';
import { HttpXsrfInterceptor } from './auth.header.interceptor';

import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { EditLabelDialogComponent } from './components/edit-label-dialog/edit-label-dialog.component';
import { AddCollaboratorDialogComponent } from './components/add-collaborator-dialog/add-collaborator-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LabelComponent,
    SearchComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    ArchivedNotesComponent,
    NoteCardComponent,
    ReminderComponent,
    NoteDialogComponent,
    EditLabelDialogComponent,
    AddCollaboratorDialogComponent
  ],
  entryComponents: [
    NoteDialogComponent,
    EditLabelDialogComponent,
    AddCollaboratorDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXsrfInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
