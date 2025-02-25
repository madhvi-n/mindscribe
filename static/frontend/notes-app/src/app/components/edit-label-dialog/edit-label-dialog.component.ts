import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@notes/core/services/user/user.service';
import { NoteService } from '@notes/core/services/notes/note.service';

@Component({
  selector: 'app-edit-label-dialog',
  templateUrl: './edit-label-dialog.component.html',
  styleUrls: ['./edit-label-dialog.component.scss']
})
export class EditLabelDialogComponent implements OnInit {
  labelForm: FormGroup;

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<EditLabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.labelForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      })
    });

    if(this.data.label) {
      this.labelForm.controls.name.setValue(this.data.label.name);
    }
  }

  submit() {
    const data = {
      user: this.data.user.id,
      name: this.labelForm.controls.name.value
    }

    if(this.data.label) {
      this.update(data);
    } else {
      this.create(data);
    }
  }

  create(data) {
    console.log(data);
    this.noteService.addLabel(data).subscribe(
      (response: any) => {
        this.dialogRef.close(response);
      });
  }

  update(data) {
    console.log(data);
    this.noteService.editLabel(this.data?.label.id, data).subscribe(
      (response: any) => {
        this.dialogRef.close(response);
      });
  }

  close(){
    this.dialogRef.close();
  }
}
