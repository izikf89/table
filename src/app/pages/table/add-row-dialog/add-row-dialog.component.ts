import { Component } from '@angular/core';
import { ImgData } from 'src/app/public/services/http/img-http/img-http.service';

@Component({
  selector: 'app-add-row-dialog',
  template: `
  <h1 mat-dialog-title>Add Row</h1>
  <div mat-dialog-content>
    <mat-form-field class="add-row-title">
      <mat-label>title</mat-label>
      <input matInput [(ngModel)]="newRow.title">
    </mat-form-field>

    <mat-form-field>
      <mat-label> albumId</mat-label>
      <input matInput [(ngModel)]="newRow.albumId">
    </mat-form-field>

    <mat-form-field class="add-row-url">
      <mat-label>url</mat-label>
      <input matInput [(ngModel)]="newRow.url">
    </mat-form-field>

    <mat-form-field>
      <mat-label>thumbnailUrl</mat-label>
      <input matInput [(ngModel)]="newRow.thumbnailUrl">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]>cancel</button>
    <button mat-raised-button color='primary' [mat-dialog-close]="newRow" cdkFocusInitial>save</button>
  </div>
  `,
  styles: [`
    .add-row-url,
    .add-row-title {
      margin-right: 35px;
    }
  `]
})
export class AddRowDialogComponent {
  newRow: ImgData = <ImgData>{};
}
