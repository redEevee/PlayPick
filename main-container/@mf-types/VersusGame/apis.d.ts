
    export type RemoteKeys = 'VersusGame/App';
    type PackageType<T> = T extends 'VersusGame/App' ? typeof import('VersusGame/App') :any;