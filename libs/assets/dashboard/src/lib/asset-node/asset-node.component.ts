import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Signal,
    computed,
    inject,
    input,
    signal,
    viewChildren,
} from '@angular/core';

import { AssetsStore } from '@ops/assets-store';
import { CommonModule } from '@angular/common';
import { TreeNode } from '@ops/utils';

@Component({
    selector: 'lib-asset-node',
    imports: [CommonModule],
    templateUrl: './asset-node.component.html',
    styleUrl: './asset-node.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    })
export class AssetNodeComponent implements OnInit {
    readonly node = input.required<TreeNode>();
    readonly level = input(1);
    readonly expanded = signal(true);
    readonly _checked = signal(false);
    readonly assetsStore = inject(AssetsStore);
    readonly selection = this.assetsStore.selection;

    readonly checked: Signal<boolean> = computed<boolean>(() => {
        const node = this.node();
        if (!node.isFolder || !node.children.length) return this._checked();

        return this.childrenChecked().every((child) => child.checked());
    });

    readonly childrenChecked = viewChildren(AssetNodeComponent, {
        read: AssetNodeComponent,
    });

    ngOnInit(): void {
        const node = this.node();
        if (!node.isFolder && this.selection().includes(node.id))
            this._checked.update(() => true);
    }

    toggleExpanded(): void {
         this.expanded.update((val) => !val);
    }

    toggleChecked(checked: boolean): void {
        const node = this.node();
        if (node.isFolder && node.children) {
            this.childrenChecked().forEach((child) =>
                child.toggleChecked(checked),
            );
        } else {
            this.assetsStore.toggleAsset(node, checked);
        }
        this._checked.update(() => checked);
    }

    indeterminate: Signal<boolean> = computed(() => {
        const node = this.node();
        if (!node.isFolder || !node.children?.length) return false;

        return (
            this.childrenChecked().some(
                (child) => child.checked() || child.indeterminate(),
            ) && !this.childrenChecked().every((child) => child.checked())
        );
    });
}
