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

/**
 * Component representing a node in the asset tree hierarchy.
 *
 * This component displays a single node (folder or item) in the asset tree structure,
 * handling its expand/collapse state, selection state, and child relationships.
 * It recursively renders itself for child nodes to create the complete tree view.
 */
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
    readonly assetsStore = inject(AssetsStore);
    readonly selection = this.assetsStore.selection;

    /**
     * Signal - internal state of the checked property doesn't represent the final checked state
     * the actual checked state is computed based on the children
     */
    readonly _checked = signal(false);

    /**
     * Computed signal that determines if this node is checked.
     *
     * For leaf nodes, returns the direct checked state.
     * For folder nodes, returns true only if all children are checked.
     *
     * @returns A boolean signal indicating whether this node is checked
     */
    readonly checked: Signal<boolean> = computed<boolean>(() => {
        const node = this.node();
        if (!node.isFolder || !node.children.length) return this._checked();

        return this.childrenChecked().every((child) => child.checked());
    });

    /**
     * Computed signal that determines if this node is in an indeterminate state.
     *
     * A node is in an indeterminate state when it's a folder and some but not all
     * of its children are checked or indeterminate themselves.
     *
     * @returns A boolean signal indicating whether this node is in an indeterminate state
     */
    indeterminate: Signal<boolean> = computed(() => {
        const node = this.node();
        if (!node.isFolder || !node.children?.length) return false;

        return (
            this.childrenChecked().some(
                (child) => child.checked() || child.indeterminate(),
            ) && !this.childrenChecked().every((child) => child.checked())
        );
    });

    /**
     * Reference to all child AssetNodeComponents in the DOM
     *
     * Used to propagate selection changes down the tree
     */
    readonly childrenChecked = viewChildren(AssetNodeComponent, {
        read: AssetNodeComponent,
    });

    /**
     * Initializes the component.
     *
     * Sets the initial checked state based on the global selection state
     * if this node is item not folder and already part of the selection.
     */
    ngOnInit(): void {
        const node = this.node();
        if (!node.isFolder && this.selection().includes(node.id))
            this._checked.update(() => true);
    }

    /**
     * Toggles the expanded/collapsed state of this node.
     *
     * Inverts the current expanded signal value.
     */
    toggleExpanded(): void {
        this.expanded.update((val) => !val);
    }

    /**
     * Toggles the checked state of this node and handles propagation.
     *
     * For folder nodes, propagates the checked state to all children.
     * For leaf nodes, updates the selection in the global store and the checked component state.
     *
     * @param checked - The new checked state to apply
     */
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
}
