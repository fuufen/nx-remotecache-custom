import { RemoteCacheImplementation } from "./types/remote-cache-implementation";
export declare const retrieveSuccess: ({ name }: RemoteCacheImplementation, file: string) => void;
export declare const retrieveFailure: ({ name }: RemoteCacheImplementation, file: string, error: any) => void;
export declare const setupFailure: (error?: any) => void;
export declare const storeSuccess: ({ name }: RemoteCacheImplementation, file: string) => void;
export declare const storeFailure: ({ name }: RemoteCacheImplementation, file: string, error: any) => void;
export declare const checkFailure: ({ name }: RemoteCacheImplementation, file: string, error: any) => void;
