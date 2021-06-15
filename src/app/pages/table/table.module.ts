import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { ImgHttpService } from 'src/app/public/services/http/img-http/img-http.service';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActiveRowModule } from 'src/app/public/dirctives/active-row/active-row.module';
import { TableLogicDataService } from './table-logic-data.service';
import { AddRowDialogComponent } from './add-row-dialog/add-row-dialog.component';
import { InfiScrollModule } from 'src/app/public/dirctives/infi-scroll/infi-scroll.module';


@NgModule({
  declarations: [TableComponent, AddRowDialogComponent],
  exports: [TableComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ActiveRowModule,
    InfiScrollModule,
  ],
  providers:[
    ImgHttpService,
    TableLogicDataService,
  ]
})
export class TableModule { }
