import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImgHttpService {

  constructor(
    private http: HttpClient,
  ) { }

  getImg(): Observable<ImgData[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/photos') as Observable<ImgData[]>;
  }
}


export type ImgData = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}