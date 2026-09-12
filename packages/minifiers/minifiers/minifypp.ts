import { spawn } from 'child_process';
import { collectStream } from '@minification-benchmarks/utils/collect-stream.ts';
import { createMinifier } from '../utils/create-minifier.ts';

const executable = new URL('../../../.benchmark-dependencies/minifypp-benchmark', import.meta.url).pathname;

const runMinify = async (code: string, mode: 'conservative' | 'structured' | 'aggressive') => {
	const minify = spawn(executable, [mode]);
	minify.stdin.end(code);

	const [error, minified] = await Promise.all([
		collectStream(minify.stderr),
		collectStream(minify.stdout),
	]);

	if (error) {
		throw new Error(error.trim());
	}

	return minified;
};

export default createMinifier(
	'Minify++',
	{
		default: async ({ code }) => runMinify(code, 'conservative'),
		structured: async ({ code }) => runMinify(code, 'structured'),
		aggressive: async ({ code }) => runMinify(code, 'aggressive'),
	},
	{
		name: 'Minify++',
		version: '1.1.3-dev.ec01a1e',
		url: 'https://github.com/minify-cx/minify',
		registry: 'github',
	},
);
