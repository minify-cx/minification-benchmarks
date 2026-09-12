import fs from 'node:fs/promises';

const dataPath = new URL('./data/data.json', import.meta.url);
const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));

for (const artifact of Object.values(data)) {
	for (const minifierName of Object.keys(artifact.minified ?? {})) {
		if (minifierName === 'Minify++' || minifierName.startsWith('Minify++ (')) {
			delete artifact.minified[minifierName];
		}
	}
}

await fs.writeFile(dataPath, `${JSON.stringify(data, null, '\t')}\n`);
