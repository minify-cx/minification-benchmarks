import { loadPackageJson, getPackageJsonMeta } from './package-json.ts';
import { loadComposerInstalled, getMeta } from './composer.ts';

export type MinifierFunction = (
	minifySubject: {
		code: string;
		filePath: string;
	},
) => Promise<string>;

type Instances = Record<string, MinifierFunction>;

export type MetaData = {
	name: string;
	version: string;
	url: string;
	publishDate?: Date;
	registry: 'npm' | 'composer' | 'github';
};

export class Minifier {
	minifierPath?: string;

	name: string;

	instances: Instances;

	meta?: MetaData;

	configHash?: string;

	constructor(
		name: string,
		instances: Instances,
		meta?: MetaData,
	) {
		this.name = name;
		this.instances = instances;
		this.meta = meta;
	}

	async loadMeta(
		minifierPath: string,
		configHash: string,
	) {
		this.minifierPath = minifierPath;
		this.configHash = configHash;
		if (this.meta) {
			return;
		}

		const packageJson = await loadPackageJson(this.name);
		if (packageJson) {
			const response = await fetch(`https://registry.npmjs.org/${packageJson.name}`).catch((error) => {
				console.error(error);
				throw error;
			});
			const json = await response.json() as {
				time: Record<string, string>;
			};
			const publishDate = new Date(json.time[packageJson.version!]);
			this.meta = {
				...getPackageJsonMeta(packageJson),
				publishDate,
			};
			return;
		}

		const composerInstalled = await loadComposerInstalled(this.name);
		if (composerInstalled) {
			this.meta = getMeta(composerInstalled);
		}
	}
}

export type MinifierLoaded = {
	meta: MetaData;
} & Minifier;

export const createMinifier = (
	minifierName: string,
	instances: Instances,
	meta?: MetaData,
) => new Minifier(minifierName, instances, meta);
