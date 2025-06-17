
    export type RemoteKeys = 'LandingPageApp/App';
    type PackageType<T> = T extends 'LandingPageApp/App' ? typeof import('LandingPageApp/App') :any;