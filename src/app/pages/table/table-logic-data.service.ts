import { ChangeDetectorRef, Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ImgData, ImgHttpService } from 'src/app/public/services/http/img-http/img-http.service';
import { AddRowDialogComponent } from './add-row-dialog/add-row-dialog.component';
import { ImgDataRow } from './table.component';

@Injectable()
export class TableLogicDataService {
  newRow: ImgData;

  data: ImgData[];
  dataOrginal: ImgData[];
  bulk: number = 20;
  private _destroyed$ = new Subject();
  private filter$ = new Subject<string>();
  private dataSourceUpdate = new Subject< MatTableDataSource<ImgData>>();
  dataSourceUpdate$ = this.dataSourceUpdate.asObservable();

  constructor(
    private imgHttp: ImgHttpService,
    private dialog: MatDialog,
  ) { }


  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    this.dataSourceUpdate.complete();
    this.filter$.complete();
  }

  async initTable(): Promise<void> {
    this.initFilter();

    this.dataOrginal = await this.getData();
    this.data = this.dataOrginal.slice();
    this.initData(this.data.slice(0, 20) as ImgDataRow[]);
  }

  private initData(data: ImgDataRow[]): void {
    this.bulk = 20;
    this.dataSourceUpdate.next(new MatTableDataSource(data));
  }


  private async getData(): Promise<ImgData[]> {
    return await this.imgHttp.getImg().toPromise();
  }


  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.filter$.next(filterValue);
  }

  initFilter(): void {
    this.filter$.pipe(
      debounceTime(500),
      takeUntil(this._destroyed$)
    ).subscribe((filterValue: string) => {
      this.data = this.dataOrginal.filter(v =>
        (v.id + '').indexOf(filterValue) !== -1 ||
        (v.title && v.title.toLowerCase() || '').indexOf(filterValue) !== -1)

      this.initData(this.data.slice(0, 20) as ImgDataRow[])
    });
  }


  AddGroupRow() {
    this.bulk += 20;
    const data: ImgData[] = this.data.slice(0, this.bulk)
    this.dataSourceUpdate.next(new MatTableDataSource(data));
  }


  private getMaxId(): number {
    return Math.max(...this.dataOrginal.map(o => o.id), 0);
  }

  editRow(element: ImgData) {
    this.dataOrginal.find(x => x.id == element.id).title = element.title;
    this.data.find(x => x.id == element.id).title = element.title;
  }

  deleteRow(id: number, index: number): void {
    this.data.splice(index, 1);

    index = this.dataOrginal.findIndex((x: ImgDataRow) => x.id == id);
    this.dataOrginal.splice(index, 1);
  }

  async openAddRowDialog(dataSource: ImgData[]): Promise<void> {
    const config: MatDialogConfig = { width: '500px', };
    const newRow: ImgDataRow = await this.dialog.open(AddRowDialogComponent, config).afterClosed().toPromise();
    if (newRow) {
      newRow.id = this.getMaxId() + 1;
      this.dataOrginal.push(newRow)
      this.data.push(newRow)

      dataSource.push(newRow);
      this.dataSourceUpdate.next(new MatTableDataSource(dataSource));
    }
  }
}
