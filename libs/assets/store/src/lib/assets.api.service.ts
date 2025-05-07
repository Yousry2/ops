import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawData } from '@ops/utils';
import { environment } from '@ops/environments';

@Injectable({
    providedIn: 'root',
})
export class AssetsApiService {
    private url = environment.server + '/assets-data';
    private http = inject(HttpClient);

    getAll(): Observable<RawData> {
        return this.http.get<RawData>(this.url);
    }
}
