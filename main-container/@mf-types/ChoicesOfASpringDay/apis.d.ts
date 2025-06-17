
    export type RemoteKeys = 'ChoicesOfASpringDay/App';
    type PackageType<T> = T extends 'ChoicesOfASpringDay/App' ? typeof import('ChoicesOfASpringDay/App') :any;