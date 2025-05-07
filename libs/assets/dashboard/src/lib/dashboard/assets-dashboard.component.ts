import { AssetsApiService, AssetsStore } from '@ops/assets-store';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    viewChildren,
} from '@angular/core';

import { AssetNodeComponent } from '../asset-node/asset-node.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

    clearSelection() {
        this.childrenChecked().forEach((child) => child.toggleChecked(false));
    }
}
