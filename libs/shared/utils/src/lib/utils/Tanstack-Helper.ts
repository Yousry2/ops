
/* 
** I didn't implement this code, it is from another initiative to connect signal store with tanstack query
*/

import {
    type EmptyFeatureResult,
    type Prettify,
    signalStoreFeature,
    type SignalStoreFeature,
    type SignalStoreFeatureResult,
    type StateSignals,
    withMethods,
    type WritableStateSource,
} from '@ngrx/signals';

import {
    type CreateQueryOptions,
    type CreateQueryResult,
    injectQuery,
    type QueryKey,
} from '@tanstack/angular-query-experimental';

const lowerFirstLetter = <T extends string>(value: T): Uncapitalize<T> => {
    if (typeof value !== 'string') {
        return value;
    }

    const trimmed = value.trim();

    const first: string = trimmed.charAt(0).toLowerCase();
    const rest: string = trimmed.slice(1);

    return `${first}${rest}` as Uncapitalize<T>;
};

export type QueryStore<Input extends SignalStoreFeatureResult> = Prettify<
    StateSignals<Input['state']> &
        Input['props'] &
        Input['methods'] &
        WritableStateSource<Prettify<Input['state']>>
>;

export type CreateQueryFn<
    TDataFn = unknown,
    TError = Error,
    TData = TDataFn,
    TQueryKey extends QueryKey = QueryKey,
    Input extends SignalStoreFeatureResult = SignalStoreFeatureResult
> = (
    store: QueryStore<Input>
) => () => CreateQueryOptions<TDataFn, TError, TData, TQueryKey>;

export type QueryProp<Name extends string> =
    `${Uncapitalize<Name>}TanstackQuery`;

export type QueryMethod<
    TData = unknown,
    TError = Error
> = (() => CreateQueryResult<TData, TError>) & CreateQueryResult<TData, TError>;
export const withTanstackQuery = <
    Name extends string,
    TDataFn = unknown,
    TError = Error,
    TData = TDataFn,
    TQueryKey extends QueryKey = QueryKey,
    Input extends SignalStoreFeatureResult = SignalStoreFeatureResult
>(
    name: Name,
    createQueryFn: CreateQueryFn<
        TDataFn,
        TError,
        TData,
        TQueryKey,
        NoInfer<Input>
    >
): SignalStoreFeature<
    Input,
    EmptyFeatureResult & {
        methods: Record<
            QueryProp<NoInfer<Name>>,
            QueryMethod<NoInfer<TData>, NoInfer<TError>>
        >;
    }
> => {
    const prop: QueryProp<NoInfer<Name>> = `${lowerFirstLetter(
        name
    )}TanstackQuery`;

    return signalStoreFeature(
        withMethods((store) => {
            const query = injectQuery(
                createQueryFn(store as QueryStore<NoInfer<Input>>)
            );

            return {
                [prop]: new Proxy(() => query, {
                    get: (_, prop) => Reflect.get(query, prop),
                    has: (_, prop) => Reflect.has(query, prop),
                }),
            } as Record<
                QueryProp<NoInfer<Name>>,
                QueryMethod<NoInfer<TData>, NoInfer<TError>>
            >;
        })
    );
};