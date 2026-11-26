// NusaStats — Indonesia in Numbers. Entry program (Node 22, standard library only).
// Copies app/ and screenshots/ beside this file into /output (or $MAKEFUN_OUTPUT_DIR)
// and writes /output/dossier.json with buildDossier from vendor/makefun-frontend.ts,
// exactly as the starter's main.ts does. Deterministic: no timestamps, no randomness,
// stable key order — two runs write identical bytes. It never deletes its own output
// folder; it only clears the files inside it.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The site must exist before anything is handed in: fail loudly rather than
// writing an empty dossier.
if (!existsSync(join(here, 'app'))) throw new Error('app/ is missing from the repository');
if (!existsSync(join(here, 'screenshots'))) throw new Error('screenshots/ is missing from the repository');

mkdirSync(out, { recursive: true });
// Clear only the files inside the output folder, never the folder itself.
for (const entry of readdirSync(out)) {
  rmSync(join(out, entry), { recursive: true, force: true });
}

cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
