import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    viewChildren,
} from '@angular/core';
import { AssetsApiService, AssetsStore } from '@ops/assets-store';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RawData } from '@ops/utils';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { AssetNodeComponent } from '../asset-node/asset-node.component';
import { SelectionResultComponent } from '../selection-result/selection-result.component';

@Component({
    selector: 'lib-assets-dashboard',
    imports: [CommonModule, AssetNodeComponent, SelectionResultComponent],
    templateUrl: './assets-dashboard.component.html',
    styleUrl: './assets-dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsDashboardComponent {
    readonly assetStore = inject(AssetsStore);
    readonly data = this.assetStore.data;
    readonly http = inject(HttpClient);
    readonly assetApiService = inject(AssetsApiService);

    readonly childrenChecked = viewChildren(AssetNodeComponent, {
        read: AssetNodeComponent,
    });
    readonly query = injectQuery(() => ({
        enabled: true,
        retry: 3,
        retryDelay(failureCount, error) {
            console.error('Retrying...', failureCount, error);
            return 1000 * Math.pow(2, failureCount);
        },
        queryKey: ['assets'],
        staleTime: 1000 * 60 * 5, // 5 minutes
        queryFn: () => lastValueFrom(this.assetApiService.getAll()),

        onError: (error: any) => {
            console.error(error);
            this.assetStore.setData({} as RawData);
        },
    }));

    constructor() {
        effect(() => {
            const data = this.query.data();
            if (data) {
                this.assetStore.setData(data);
            }
        });
    }

    clearSelection() {
        this.childrenChecked().forEach((child) => child.toggleChecked(false));
    }
}
