
// ADT - algebraic data type

export type Loaded<T> = {
    readonly kind: 'loaded';
    readonly data: T;
}

export type Loading<T> = Readonly<{
    readonly kind: 'loading';
    readonly data: T | undefined;
}>

export type Error<T> = {
    readonly kind: 'error';
    readonly error: string;
    readonly data: T | undefined;
}

// ADT
export type Fetchable<T> = Loaded<T> | Loading<T> | Error<T>;

// Pattern matching
export function matchLoadable<T, R>(loadable: Fetchable<T>, params: { loaded: (data: T) => R, loading: (data: T | undefined) => R, error: (data: T | undefined, msg: string) => R} ): R {
    switch (loadable.kind) {
        case 'loaded':
            return params.loaded(loadable.data);
        case 'loading':
            return params.loading(loadable.data);
        case 'error':
            return params.error(loadable.data, loadable.error);
    }
}

// map
function mapLoadable<A, B>(loadable: Fetchable<A>, f: (a: A) => B): Fetchable<B> {
    switch (loadable.kind) {
        case 'loaded':
            return { kind: 'loaded', data: f(loadable.data) };
        case 'loading':
            return { kind: 'loading', data: loadable.data ? f(loadable.data) : undefined };
        case 'error':
            return { kind: 'error', error: loadable.error, data: loadable.data ? f(loadable.data) : undefined };
    }
}

// flatMap : (m: M<A>, f: (A -> M<B>)) -> M<B>
// flatMap : M<A> -> (A -> M<B>) -> M<B>
function flatMapLoadable<A, B>(loadable: Fetchable<A>, f: (a: A) => Fetchable<B>): Fetchable<B> {
    switch(loadable.kind){
        case 'loaded':
            return f(loadable.data);
        case 'loading':
            {
                if (!loadable.data) {
                    return { kind: 'loading', data: undefined };
                } else {
                    const fResult = f(loadable.data);
                    switch (fResult.kind) {
                        case 'loaded':
                            return { kind: 'loading', data: fResult.data };
                        case 'loading':
                            return { kind: 'loading', data: fResult.data };
                        case 'error':
                            return { kind: 'error', error: fResult.error, data: fResult.data };
                    }
                }
            }
        case 'error':
            {
                if (!loadable.data) {
                    return { kind: 'error', error: loadable.error, data: undefined };
                } else {
                    const fResult = f(loadable.data);
                    return fResult
                }
            }
    }
}



