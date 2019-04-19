import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: []
})
export class EditarComponent {

  titulo: string;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public builder: FormBuilder) {
    this.form = builder.group({
      'titulo': data.titulo,
      'desc': data.desc
    });
  }

  editar(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

}
