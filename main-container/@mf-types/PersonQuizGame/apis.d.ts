
    export type RemoteKeys = 'PersonQuizGame/App';
    type PackageType<T> = T extends 'PersonQuizGame/App' ? typeof import('PersonQuizGame/App') :any;