import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AssetsStore } from '@ops/assets-store';
import { CommonModule } from '@angular/common';

/**
 * Component for displaying the results of asset selection.
 *
 * This component renders the currently selected assets from the AssetsStore
 * and displays them to the user in a consolidated view.
 */
@Component({
    selector: 'lib-selection-result',
    imports: [CommonModule],
    templateUrl: './selection-result.component.html',
    styleUrl: './selection-result.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionResultComponent {
    selection = inject(AssetsStore).selection;
}
