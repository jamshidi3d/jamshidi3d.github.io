// Copies the built interactive bundles (the private repo's dist/) into public/i3d/, where the site serves them under /i3d/.
// Usage: node scripts/sync-i3d.mjs [sourceDir]   (default ../interactive3d/dist)
// If the source is missing it only warns and exits 0: the site builds and runs without the private repo (posters only).
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = resolve(root, process.argv[2] ?? '../interactive3d/dist');
const target = resolve(root, 'public/i3d');

if (!existsSync(source)) {
  console.warn(`sync-i3d: ${source} not found, public/i3d left as it is (interactive pieces show their posters)`);
  process.exit(0);
}
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });
console.log(`sync-i3d: ${source} -> public/i3d`);
