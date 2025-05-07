import {
    ChangeDetectionStrategy,
    Component,
    inject,
    viewChildren,
} from '@angular/core';

import { AssetNodeComponent } from '../asset-node/asset-node.component';
import { AssetsStore } from '@ops/assets-store';
import { CommonModule } from '@angular/common';
import { SelectionResultComponent } from '../selection-result/selection-result.component';

/**
 * This component serves as the main container for asset visualization and management,
 */
@Component({
    selector: 'lib-assets-dashboard',
    imports: [CommonModule, AssetNodeComponent, SelectionResultComponent],
    templateUrl: './assets-dashboard.component.html',
    styleUrl: './assets-dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsDashboardComponent {
    readonly data = inject(AssetsStore).data;
    readonly assetNodeChildren = viewChildren(AssetNodeComponent, {
        read: AssetNodeComponent,
    });
    protected clearSelection() {
        this.assetNodeChildren().forEach((child) => child.toggleChecked(false));
    }
}
