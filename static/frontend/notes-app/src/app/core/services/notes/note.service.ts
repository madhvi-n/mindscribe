import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@notes/env/environment';
import { User } from '@notes/core/models/user.model';
import { StorageHandlerService } from '../storage/storage-handler.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = `${environment.serverUrl}${environment.baseUrl}`;
  labels: BehaviorSubject<any[]>;
  labelsInitialized = new BehaviorSubject(false);

  colors: BehaviorSubject<any[]>;
  colorsInitialized = new BehaviorSubject(false);

  constructor(
    public http: HttpClient,
  ) {}

  fetchNotes(){
    return this.http.get(this.baseUrl + 'notes/');
  }

  getColors(){
    return this.http.get(this.baseUrl + 'notes/colors/');
  }

  createNote(data){
    return this.http.post(this.baseUrl + 'notes/', data);
  }

  editNote(note_id: number, data){
    return this.http.put(this.baseUrl + `notes/${note_id}/`, data);
  }

  changeColor(note_id: number, data) {
    return this.http.put(this.baseUrl + `notes/${note_id}/change_color/`, data);
  }

  setColors(colors: any[]) {
    this.colors = new BehaviorSubject(colors);
    this.colorsInitialized.next(true);
  }

  deleteNote(note_id: number){
    return this.http.delete(this.baseUrl + `notes/${note_id}/`);
  }

  toggleArchived(note_id: number){
    return this.http.put(this.baseUrl + `notes/${note_id}/toggle_archived/`, {});
  }

  togglePinned(note_id: number){
    return this.http.put(this.baseUrl + `notes/${note_id}/toggle_pinned/`, {});
  }

  filterNotes(user_id: number, label: string | null, pinned: boolean | null, archived: boolean | null) {
    return this.http.get(this.baseUrl + `notes/?user=${user_id}&labels__name=${label}&is_pinned=${pinned}&is_archived=${archived}`);
  }

  getArchived(){
    return this.http.get(this.baseUrl + `notes/archived/`);
  }

  addNoteLabel(note_id: number, data) {
    return this.http.put(this.baseUrl + `notes/${note_id}/add_label/`, data);
  }

  deleteNoteLabel(note_id, data) {
    return this.http.put(this.baseUrl + `notes/${note_id}/remove_label/`, data);
  }

  getUserLabels() {
    return this.http.get(this.baseUrl + 'labels/');
  }

  addLabel(data){
    return this.http.post(this.baseUrl + 'labels/', data);
  }

  editLabel(label_id: number, data){
    return this.http.put(this.baseUrl + `labels/${label_id}/`, data);
  }

  deleteLabel(label_id: number){
    return this.http.delete(this.baseUrl + `labels/${label_id}/`);
  }

  addCollaborator(note_id: number, data){
    return this.http.put(this.baseUrl + `notes/${note_id}/add_collaborator/`, data);
  }

  removeCollaborator(note_id: number, data){
    return this.http.put(this.baseUrl + `notes/${note_id}/remove_collaborator/`, data);
  }
}
