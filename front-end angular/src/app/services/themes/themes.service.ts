import { Injectable } from '@angular/core';
import ThemesData from '../../common/types/themesData';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  selectedThemesData: ThemesData[] = []
  constructor(private http: HttpClient) { }
  getThemesData(): Observable<ThemesData[]> {
    return this.http.get<ThemesData[]>('http://localhost:4000/user/getallThemes/')
  }


}
