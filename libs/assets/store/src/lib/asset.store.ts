import {
    RawData,
    TreeNode,
    buildFolderTree,
    withTanstackQuery,
} from '@ops/utils';
import { effect, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';

import { AssetsApiService } from './assets.api.service';
import { lastValueFrom } from 'rxjs';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

/**
 * Interface representing the state of the Assets store.
 *
 * @interface AssetsState
 * @property {TreeNode[]} data - Hierarchical tree structure of asset data
 * @property {boolean} loading - Flag indicating if assets are currently being loaded
 * @property {number[]} selection - Array of selected items
 */
interface AssetsState {
    data: TreeNode[];
    loading: boolean;
    selection: number[];
}

/**
 * Initial state for the Assets store.
 *
 * @constant initialState
 * @type {AssetsState}
 * @default
 */
const initialState: AssetsState = {
    data: [],
    loading: false,
    selection: [],
};

/**
 * Signal store for managing asset data and selection state.
 *
 * This store handles loading assets, managing selected assets, and persisting
 * selections to local storage. It integrates with TanStack Query for data fetching.
 */
export const AssetsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => {
        /**
         * converts the raw asset data into a hierarchical DFS tree structure and sets it in the store.
         *
         * @param {RawData} assets - The raw asset data from the API
         */
        const setData = (assets: RawData) => {
            patchState(store, { loading: true });
            const data = buildFolderTree(assets);
            patchState(store, { data, loading: false });
        };

        /**
         * Clears all selected assets from the store.
         */
        const clearSelection = () => {
            console.log('Clearing selection...');
            patchState(store, { selection: [] });
        };

        /**
         * Toggles the selection state of an asset.
         *
         * @param {TreeNode} node - The asset node to toggle
         * @param {boolean} checked - Whether to select or deselect the asset
         */
        const toggleAsset = (node: TreeNode, checked: boolean) => {
            const selection = [...store.selection()];
            if (checked) {
                if (!selection.includes(node.id)) {
                    selection.push(node.id);
                }
            } else {
                const index = selection.indexOf(node.id);
                if (index > -1) {
                    selection.splice(index, 1);
                }
            }

            patchState(store, { selection });
        };

        return {
            toggleAsset,
            setData,
            clearSelection,
        };
    }),

    /**
     * TanStack Query integration for fetching asset data.
     *
     * Configures a query with retry logic each retry has an exponential delay,
     *  and caching using stale time for efficient data loading.
     */
    withTanstackQuery('assets', () => {
        const assetApiService = inject(AssetsApiService);
        return () => {
            return {
                enabled: true,
                retry: 3,
                retryDelay(failureCount, error) {
                    console.error('Retrying...', failureCount, error);
                    return 1000 * Math.pow(2, failureCount);
                },
                queryKey: ['assets'],
                staleTime: 1000 * 60 * 5, // 5 minutes

                queryFn: () => {
                    console.log('Fetching data...');
                    return lastValueFrom(assetApiService.getAll());
                },
            };
        };
    }),

    /**
     * Lifecycle hooks for the store.
     *
     * Sets up an effect to save data when it's received from TanStack Query.
     */
    withHooks({
        /**
         * Initializes the store and sets up data synchronization.
         *
         * @param {typeof AssetsStore} store - The store instance
         */
        onInit: (store) => {
            effect(() => {
                const data = store.assetsTanstackQuery().data();
                if (data) {
                    store.setData(data);
                }
            });
        },
    }),
    /**
     * Local storage synchronization for persisting selection state.
     *
     * Ensures selected assets remain selected across page refreshes.
     */
    withStorageSync({
        key: 'assetsSelection',
        select: (state: AssetsState) => {
            return {
                selection: state.selection,
            };
        },
        parse: (stateString: string) => {
            return {
                ...initialState,
                selection: JSON.parse(stateString).selection,
            };
        },
        autoSync: true,
        storage: () => localStorage,
    }),
);
