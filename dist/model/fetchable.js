"use strict";
// ADT - algebraic data type
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractLoadable = exports.matchLoadable = void 0;
// Pattern matching
function matchLoadable(loadable, params) {
    switch (loadable.kind) {
        case 'loaded':
            return params.loaded(loadable.data);
        case 'loading':
            return params.loading(loadable.oldData);
        case 'error':
            return params.error(loadable.oldData, loadable.error);
    }
}
exports.matchLoadable = matchLoadable;
function extractLoadable(loadable) {
    switch (loadable.kind) {
        case 'loaded':
            return loadable.data;
        case 'loading':
            return loadable.oldData;
        case 'error':
            return loadable.oldData;
    }
}
exports.extractLoadable = extractLoadable;
// map
function mapLoadable(loadable, f) {
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
function flatMapLoadable(loadable, f) {
    switch (loadable.kind) {
        case 'loaded':
            return f(loadable.data);
        case 'loading':
            {
                if (!loadable.oldData) {
                    return { kind: 'loading', oldData: undefined };
                }
                else {
                    var fResult = f(loadable.oldData);
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
                }
                else {
                    var fResult = f(loadable.oldData);
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
