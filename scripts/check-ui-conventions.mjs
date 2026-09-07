import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'projects/ui/src/lib');
const violations = [];

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(path);
      continue;
    }
    if (!entry.name.endsWith('.ts') || entry.name.endsWith('.spec.ts')) continue;

    const source = await readFile(path, 'utf8');
    const outputPattern = /\b([A-Za-z_$][\w$]*)\s*=\s*output\s*(?:<[^;]+>)?\s*\(/g;
    for (const match of source.matchAll(outputPattern)) {
      if (!match[1].startsWith('on')) {
        violations.push(`${relative(process.cwd(), path)}: output '${match[1]}' must start with 'on'`);
      }
    }
  }
}

await visit(root);

if (violations.length) {
  console.error(violations.join('\n'));
  process.exitCode = 1;
} else {
  console.log('UI component conventions passed.');
}
