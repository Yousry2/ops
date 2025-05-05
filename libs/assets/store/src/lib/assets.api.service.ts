import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ops/environments';
import { RawData } from '@ops/utils';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AssetsApiService {
    private url = environment.server + '/assets-data';

    constructor(private http: HttpClient) {}

    getAll(): Observable<RawData> {
        return this.http.get<RawData>(this.url);
    }
}
