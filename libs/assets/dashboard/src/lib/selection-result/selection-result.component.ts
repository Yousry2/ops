import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AssetsStore } from '@ops/assets-store';

@Component({
    selector: 'lib-selection-result',
    imports: [CommonModule],
    templateUrl: './selection-result.component.html',
    styleUrl: './selection-result.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionResultComponent {
    assetStore = inject(AssetsStore);
    selection = this.assetStore.selection;

    clearSelecion() {
        this.assetStore.clearSelection();
    }
}
