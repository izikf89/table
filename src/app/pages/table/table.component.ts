import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImgData } from 'src/app/public/services/http/img-http/img-http.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableLogicDataService } from './table-logic-data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  @ViewChild('table', { static: false }) tableRef: ElementRef<HTMLTableElement>;

  displayedColumns: string[] = ['id', 'title', 'albumId', 'url', 'btn'];
  dataSource = new MatTableDataSource<ImgData>();
  leftImg: string;
  dataSource$: Observable<MatTableDataSource<ImgData>> = this.dataService.dataSourceUpdate$;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private dataService: TableLogicDataService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.subscribeDataSourceUpdate();
    await this.dataService.initTable();
    this.selectDefaultImg();
  }

  selectDefaultImg(): void {
    if (this.dataSource.data?.length)
      this.selectRow(this.dataSource.data[0])
    else
      this.leftImg = '';
  }

  private subscribeDataSourceUpdate(): void {
    this.dataService.dataSourceUpdate$.subscribe((data:  MatTableDataSource<ImgData>) => {
      this.dataSource = data;
    });
  }

  editRow(element: ImgDataRow): void {
    element.edit = true;
    element.oldRow = JSON.parse(JSON.stringify(element));
  }

  cancelEditRow(element: ImgDataRow): void {
    element.title = element.oldRow.title;
    element.edit = false;
  }

  saveEditRow(row: ImgDataRow): void {
    row.edit = false;
    this.dataService.editRow(row);
  }

  deleteRow(id: number): void {
    let index = this.dataSource.data.findIndex((x: ImgDataRow) => x.id == id);
    this.dataSource.data.splice(index, 1);
    this.dataService.deleteRow(id, index);

    this.dataSource._updateChangeSubscription();
  }

  selectRow(row: ImgData): void {
    this.leftImg = row.url;
    this.changeDetectorRefs.detectChanges();
  }

  applyFilter = (event: Event) => this.dataService.applyFilter(event);
  openAddRowDialog = () => this.dataService.openAddRowDialog(this.dataSource.data);
  onTableScroll = this.dataService.AddGroupRow;  
}

export type ImgDataRow = ImgData & {
  edit: boolean
  oldRow: any
  active: boolean
}
