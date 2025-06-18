
    export type RemoteKeys = 'AuthenticationApp/App';
    type PackageType<T> = T extends 'AuthenticationApp/App' ? typeof import('AuthenticationApp/App') :any;