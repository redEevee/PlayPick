
    export type RemoteKeys = 'choicesOfASpringDay/App';
    type PackageType<T> = T extends 'choicesOfASpringDay/App' ? typeof import('choicesOfASpringDay/App') :any;