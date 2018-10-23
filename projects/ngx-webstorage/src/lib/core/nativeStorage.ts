import {FactoryProvider, InjectionToken} from '@angular/core';

export const LOCAL_STORAGE: InjectionToken<Storage> = new InjectionToken<Storage>('window_local_storage');

export function getLocalStorage() {
	return (typeof window !== 'undefined') ? window.localStorage : null;
}

export const LocalStorageProvider: FactoryProvider = {provide: LOCAL_STORAGE, useFactory: getLocalStorage};

export const SESSION_STORAGE: InjectionToken<Storage> = new InjectionToken<Storage>('window_session_storage');

export function getSessionStorage() {
	return (typeof window !== 'undefined') ? window.sessionStorage : null;
}

export const SessionStorageProvider: FactoryProvider = {provide: SESSION_STORAGE, useFactory: getSessionStorage};
