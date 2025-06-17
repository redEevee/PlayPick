
    export type RemoteKeys = 'NavigationBar/App';
    type PackageType<T> = T extends 'NavigationBar/App' ? typeof import('NavigationBar/App') :any;