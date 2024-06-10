import {APP_INITIALIZER,inject,makeEnvironmentProviders,Provider} from "@angular/core";
import {NgxWebstorageConfiguration} from "./config";
import {LIB_CONFIG} from "./module";
import {StrategyIndex} from "../public_api";
import {InMemoryStorageStrategyProvider,LocalStorageStrategyProvider,SessionStorageStrategyProvider} from "./strategies";
import {LocalStorageProvider,SessionStorageProvider} from "./core/nativeStorage";
import {LocalStorageServiceProvider} from "./services/localStorage";
import {SessionStorageServiceProvider} from "./services/sessionStorage";
import {DefaultIsCaseSensitive, DefaultPrefix, DefaultSeparator} from "./constants/config";
import {StorageKeyManager} from "./helpers/storageKeyManager";

enum NgxWebstorageFeatureKind {
	Config,
	LocalStorage,
	SessionStorage,
}

type NgxWebstorageFeature<FeatureKind extends NgxWebstorageFeatureKind> = {
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
	const { configProvider, featureProviders } = parseFeatures(features);
 	return makeEnvironmentProviders([
		configProvider,
		InMemoryStorageStrategyProvider,
		{ provide: APP_INITIALIZER, useFactory: appInit, multi: true },
		...featureProviders,
	]);
}

function parseFeatures(features: NgxWebstorageFeature<NgxWebstorageFeatureKind>[]) {
	let configProvider: Provider;
	const featureProviders: Provider[] = [];

	for (const feature of features) {
		if (feature.kind === NgxWebstorageFeatureKind.Config) configProvider = feature.providers[0];
		else featureProviders.push(...feature.providers);
	}

	return {
		configProvider: configProvider ?? {
			provide: LIB_CONFIG,
			useValue: { prefix: DefaultPrefix, separator: DefaultSeparator, caseSensitive: DefaultIsCaseSensitive }
		},
		featureProviders
	};
}

function makeNgxWebstorageFeature<FeatureKind extends NgxWebstorageFeatureKind>(kind: FeatureKind, providers: Provider[]): NgxWebstorageFeature<FeatureKind> {
	return { kind, providers };
}

export function withNgxWebstorageConfig(config: NgxWebstorageConfiguration) {
	return makeNgxWebstorageFeature(NgxWebstorageFeatureKind.Config, [{ provide: LIB_CONFIG, useValue: config }]);
}

/** Provides everything necessary to use the `LocalStorage` features. */
export function withLocalStorage() {
	return makeNgxWebstorageFeature(NgxWebstorageFeatureKind.LocalStorage, [
		LocalStorageProvider,
		LocalStorageServiceProvider,
		LocalStorageStrategyProvider,
	]);
}

export function withSessionStorage() {
	return makeNgxWebstorageFeature(NgxWebstorageFeatureKind.SessionStorage, [
		SessionStorageProvider,
		SessionStorageServiceProvider,
		SessionStorageStrategyProvider,
	]);
}
