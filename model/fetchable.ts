
// ADT - algebraic data type

export type Loaded<T> = {
    readonly kind: 'loaded';
    readonly data: T;
}

export type Loading<T> = Readonly<{
    readonly kind: 'loading';
    readonly oldData: T | undefined;
}>

export type Error<T> = {
    readonly kind: 'error';
    readonly error: string;
    readonly oldData: T | undefined;
}

// ADT
export type Fetchable<T> = Loaded<T> | Loading<T> | Error<T>;

// Pattern matching
export function matchLoadable<T, R>(loadable: Fetchable<T>, params: { loaded: (data: T) => R, loading: (oldData: T | undefined) => R, error: (oldData: T | undefined, msg: string) => R} ): R {
    switch (loadable.kind) {
        case 'loaded':
            return params.loaded(loadable.data);
        case 'loading':
            return params.loading(loadable.oldData);
        case 'error':
            return params.error(loadable.oldData, loadable.error);
    }
}

export function extractLoadable<T>(loadable: Fetchable<T>): T | undefined {
    switch (loadable.kind) {
        case 'loaded':
            return loadable.data;
        case 'loading':
            return loadable.oldData;
        case 'error':
            return loadable.oldData;
    }
}

// map
function mapLoadable<A, B>(loadable: Fetchable<A>, f: (a: A) => B): Fetchable<B> {
    switch (loadable.kind) {
        case 'loaded':
            return { kind: 'loaded', data: f(loadable.data) };
        case 'loading':
            return { kind: 'loading', oldData: loadable.oldData ? f(loadable.oldData) : undefined };
        case 'error':
            return { kind: 'error', error: loadable.error, oldData: loadable.oldData ? f(loadable.oldData) : undefined };
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
                if (!loadable.oldData) {
                    return { kind: 'loading', oldData: undefined };
                } else {
                    const fResult = f(loadable.oldData);
                    switch (fResult.kind) {
                        case 'loaded':
                            return { kind: 'loading', oldData: fResult.data };
                        case 'loading':
                            return { kind: 'loading', oldData: fResult.oldData };
                        case 'error':
                            return { kind: 'error', error: fResult.error, oldData: fResult.oldData };
                    }
                }
            }
        case 'error':
            {
                if (!loadable.oldData) {
                    return { kind: 'error', error: loadable.error, oldData: undefined };
                } else {
                    const fResult = f(loadable.oldData);
                    switch (fResult.kind) {
                        case 'loaded':
                            return { kind: 'error', error: loadable.error, oldData: fResult.data };
                        case 'loading':
                            return { kind: 'error', error: loadable.error, oldData: fResult.oldData };
                        case 'error':
                            return { kind: 'error', error: loadable.error, oldData: fResult.oldData };
                    }
                }
            }
    }
}



