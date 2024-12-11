import { inject, InjectionToken, makeEnvironmentProviders, Provider, provideAppInitializer } from '@angular/core';
import {NgxWebstorageConfiguration} from './config';
import {StrategyIndex} from '../public_api';
import {InMemoryStorageStrategyProvider, LocalStorageStrategyProvider, SessionStorageStrategyProvider} from './strategies';
import {LocalStorageProvider, SessionStorageProvider} from './core/nativeStorage';
import {LocalStorageServiceProvider} from './services/localStorage';
import {SessionStorageServiceProvider} from './services/sessionStorage';
import {DefaultIsCaseSensitive, DefaultPrefix, DefaultSeparator} from './constants/config';
import {StorageKeyManager} from './helpers/storageKeyManager';

export const LIB_CONFIG: InjectionToken<NgxWebstorageConfiguration> = new InjectionToken<NgxWebstorageConfiguration>('ngx_webstorage_config');

export enum InternalNgxWebstorageFeatureKind {
	Config = 1,
	LocalStorage = 2,
	SessionStorage = 3,
}

export type NgxWebstorageFeatureKind = string | InternalNgxWebstorageFeatureKind;

export type NgxWebstorageFeature<FeatureKind extends NgxWebstorageFeatureKind> = {
	kind: FeatureKind;
	providers: Provider[];
};

function appInit() {
	const config = inject(LIB_CONFIG);
	const index = inject(StrategyIndex);
	return () => {
		StorageKeyManager.consumeConfiguration(config);
		index.indexStrategies();
	};
}

/**
 * Provide ngx-webstorage basic features.
 *
 * - You can customise the configuration with the `withConfiguration` feature.
 * - You can enable the `LocalStorage` features with the `withLocalStorage` feature.
 * - You can enable the `SessionStorage` features with the `withSessionStorage` feature.
 *
 * @default config { prefix: 'ngx-webstorage', separator: '|', caseSensitive: false }
 */
export function provideNgxWebstorage(...features: NgxWebstorageFeature<NgxWebstorageFeatureKind>[]) {
	const {configProvider, featureProviders} = parseFeatures(features);
	return makeEnvironmentProviders([
		configProvider,
		InMemoryStorageStrategyProvider,
		provideAppInitializer(() => {
        const initializerFn = (appInit)();
        return initializerFn();
      }),
		...featureProviders,
	]);
}

function parseFeatures(features: NgxWebstorageFeature<NgxWebstorageFeatureKind>[]) {
	let configProvider: Provider;
	const featureProviders: Provider[] = [];

	const parsedFeatures = new Set<NgxWebstorageFeatureKind>();

	for (const feature of features) {
		if (parsedFeatures.has(feature.kind)) throw new Error(`Feature ${feature.kind} is already provided.`);

		if (feature.kind === InternalNgxWebstorageFeatureKind.Config) {
			configProvider = feature.providers[0];
		} else featureProviders.push(...feature.providers);

		parsedFeatures.add(feature.kind);
	}

	return {
		configProvider: configProvider ?? {
			provide: LIB_CONFIG,
			useValue: {prefix: DefaultPrefix, separator: DefaultSeparator, caseSensitive: DefaultIsCaseSensitive}
		},
		featureProviders
	};
}

export function makeNgxWebstorageFeature<FeatureKind extends NgxWebstorageFeatureKind>(kind: FeatureKind, providers: Provider[]): NgxWebstorageFeature<FeatureKind> {
	return {kind, providers};
}

export function withNgxWebstorageConfig(config: NgxWebstorageConfiguration) {
	return makeNgxWebstorageFeature(InternalNgxWebstorageFeatureKind.Config, [{provide: LIB_CONFIG, useValue: config}]);
}

/** Provides everything necessary to use the `LocalStorage` features. */
export function withLocalStorage() {
	return makeNgxWebstorageFeature(InternalNgxWebstorageFeatureKind.LocalStorage, [
		LocalStorageProvider,
		LocalStorageServiceProvider,
		LocalStorageStrategyProvider,
	]);
}

export function withSessionStorage() {
	return makeNgxWebstorageFeature(InternalNgxWebstorageFeatureKind.SessionStorage, [
		SessionStorageProvider,
		SessionStorageServiceProvider,
		SessionStorageStrategyProvider,
	]);
}
