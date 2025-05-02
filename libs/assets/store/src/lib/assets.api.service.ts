import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawData } from '@ops/utils';

export const apiUrl = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root',
})
export class AssetsApiService {
    private url = apiUrl + 'assets';

    constructor(private http: HttpClient) {}

    getAll(): Observable<RawData> {
        return this.http.get<RawData>(this.url);
    }
}
