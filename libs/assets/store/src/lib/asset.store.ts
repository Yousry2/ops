import {
    patchState,
    signalStore,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';
import { RawData, TreeNode, buildFolderTree } from '@ops/utils';

import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AssetsApiService } from './assets.api.service';
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
                queryKey: ['assets'],
                queryFn: () =>
                    lastValueFrom(assetApiService.getAll()).catch((error) => {
                        console.error(error);
                        return null;
                    }),
            };
        };
    }),
    withHooks({
        onInit: (store) => {
            // A workaround could be fixed by implementing a custom hook in the future if i have time
            // Due to limitation of hooks in ngrx signals there is no afterInit hook, we need to use timer to sync with store first
            // and then we can fetch data from json

            // if (!store.data() || store.data().length === 0) {
            console.log('Initializing store...');
            // store.setData();
            // }
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
    })
);
