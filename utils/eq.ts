
export type Eq<T> = (a: T, b: T) => boolean

export function EqByRef<T>(a: T, b: T): boolean {
    return a === b
}

export function EqArrayByRef<T>(a: T[], b: T[]): boolean {
    if (a === b) {
        return true
    }

    if (a.length !== b.length) {
        return false
    }

    return a.every((v,i) => v === b[i])
}

export function EqArrayOptByRef<T>(a: T[] | undefined, b: T[] | undefined) {
    if (a === b) {
        return true
    }

    if (a === undefined || b === undefined) {
        return false
    }

    return EqArrayByRef(a, b)
}

export function EqArrayByFunction<T>(a: T[], b: T[], eq: Eq<T>): boolean {
    if (a === b) {
        return true
    }

    if (a.length !== b.length) {
        return false
    }

    return a.every((v,i) => v === b[i] || eq(v, b[i]))
}

export function MakeEqArrayByFunction<T>(eq: Eq<T>): Eq<T[]> {
    return (a: T[], b: T[]) => EqArrayByFunction(a, b, eq)
}