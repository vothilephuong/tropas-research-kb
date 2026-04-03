#!/usr/bin/env node

/**
 * kb-prepare.mjs
 * Runs the full content pipeline:
 *   1. validate-content.mjs
 *   2. generate-manifest.mjs
 *   3. build-search-index.mjs (Phase 3 — when available)
 */

import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';

const SCRIPTS_DIR = resolve(import.meta.dirname);

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function run(script, label) {
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`▶ ${label}`);
  console.log('═'.repeat(50));
  
  try {
    execSync(`node ${script}`, { 
      cwd: SCRIPTS_DIR,
      stdio: 'inherit' 
    });
  } catch (e) {
    console.error(`\n💥 ${label} failed with exit code ${e.status}`);
    process.exit(e.status || 1);
  }
}

async function main() {
  console.log('🚀 TROPAS Research KB — Content Pipeline\n');

  // Step 1: Validate
  run(resolve(SCRIPTS_DIR, 'validate-content.mjs'), 'Step 1: Validate Content');

  // Step 2: Generate manifest
  run(resolve(SCRIPTS_DIR, 'generate-manifest.mjs'), 'Step 2: Generate Manifest');

  // Step 3: Build search index (Phase 3 — optional)
  const searchScript = resolve(SCRIPTS_DIR, 'build-search-index.mjs');
  if (await exists(searchScript)) {
    run(searchScript, 'Step 3: Build Search Index');
  } else {
    console.log('\n⏭️  Skipping search index (build-search-index.mjs not found — Phase 3)');
  }

  console.log('\n' + '═'.repeat(50));
  console.log('✅ Content pipeline completed successfully!');
  console.log('═'.repeat(50) + '\n');
}

main().catch(e => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
