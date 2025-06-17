
    export type RemoteKeys = 'spotTheDifference/App';
    type PackageType<T> = T extends 'spotTheDifference/App' ? typeof import('spotTheDifference/App') :any;