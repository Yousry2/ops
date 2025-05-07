import { RawData, TreeNode, buildFolderTree } from '@ops/utils';
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
import { withTanstackQuery } from './tanstack';

interface AssetsState {
    filters: string[];
    data: TreeNode[];
    loading: boolean;
    selection: number[];
}

const initialState: AssetsState = {
    filters: [],
    data: [],
    loading: false,
    selection: [],
};

export const AssetsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => {
        // const importData = () => {
        //     patchState(store, { loading: true });
        //     const data = buildFolderTree(assets);
        //     patchState(store, { data, loading: false });
        // };
        const setData = (assets: RawData) => {
            patchState(store, { loading: true });
            const data = buildFolderTree(assets);
            patchState(store, { data, loading: false });
        };

        const clearSelection = () => {
            console.log('Clearing selection...');
            patchState(store, { selection: [] });
        };

        const toggleAsset = (hero: TreeNode, checked: boolean) => {
            const selection = [...store.selection()];
            if (checked) {
                if (!selection.includes(hero.id)) {
                    selection.push(hero.id);
                }
            } else {
                const index = selection.indexOf(hero.id);
                if (index > -1) {
                    selection.splice(index, 1);
                }
            }

            patchState(store, { selection });
        };

        return {
            // importData,
            toggleAsset,
            setData,
            clearSelection,
        };
    }),

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

    withHooks({
        onInit: (store) => {
            effect(() => {
                const data = store.assetsTanstackQuery().data();
                console.log('Data on init', data);
                if (data) {
                    store.setData(data);
                }
            });
        },
    }),
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
