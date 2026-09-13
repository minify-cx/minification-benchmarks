import fs from 'node:fs/promises';

const dataPath = new URL('./data/data.json', import.meta.url);
const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));

// Minify++ is rebuilt from main on every benchmark run. Re-run a small stable
// competitor cohort at the same time so timing changes can be separated from
// runner/environment drift. These cover three fast native implementations plus
// Terser as the established compression-oriented JavaScript reference.
const refreshedMinifiers = new Set([
	'Minify++',
	'Minify++ (structured)',
	'Minify++ (aggressive)',
	'oxc-minify',
	'@swc/core',
	'esbuild',
	'terser',
]);

for (const artifact of Object.values(data)) {
	for (const minifierName of Object.keys(artifact.minified ?? {})) {
		if (refreshedMinifiers.has(minifierName)) {
			delete artifact.minified[minifierName];
		}
	}
}

await fs.writeFile(dataPath, `${JSON.stringify(data, null, '\t')}\n`);
