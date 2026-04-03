#!/usr/bin/env node

/**
 * generate-manifest.mjs
 * Scans public/data/topics/, reads each meta.json, resolves file paths,
 * and outputs public/data/manifest.json.
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', 'public', 'data');
const TOPICS_DIR = join(ROOT, 'topics');
const MANIFEST_PATH = join(ROOT, 'manifest.json');
const AI_SOURCES = ['claude', 'chatgpt', 'gemini', 'perplexity'];

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function getAssets(topicPath) {
  const assetsDir = join(topicPath, 'assets');
  if (!(await exists(assetsDir))) return [];
  
  const entries = await readdir(assetsDir, { withFileTypes: true });
  return entries
    .filter(e => e.isFile())
    .map(e => e.name);
}

async function main() {
  console.log('📦 Generating manifest.json...\n');

  if (!(await exists(TOPICS_DIR))) {
    console.error('❌ Topics directory not found');
    process.exit(1);
  }

  const entries = await readdir(TOPICS_DIR, { withFileTypes: true });
  const topicDirs = entries.filter(e => e.isDirectory()).map(e => e.name).sort();

  const topics = [];

  for (const dir of topicDirs) {
    const topicPath = join(TOPICS_DIR, dir);
    const metaPath = join(topicPath, 'meta.json');

    if (!(await exists(metaPath))) {
      console.warn(`⚠️  Skipping ${dir}/ — no meta.json`);
      continue;
    }

    let meta;
    try {
      const raw = await readFile(metaPath, 'utf-8');
      meta = JSON.parse(raw);
    } catch (e) {
      console.warn(`⚠️  Skipping ${dir}/ — invalid meta.json: ${e.message}`);
      continue;
    }

    // Resolve file paths relative to data root
    const files = {};
    for (const ai of AI_SOURCES) {
      if (meta.files?.[ai]) {
        const filePath = join(topicPath, meta.files[ai]);
        if (await exists(filePath)) {
          files[ai] = `topics/${dir}/${meta.files[ai]}`;
        }
      }
    }

    // Get assets
    const assetNames = await getAssets(topicPath);
    const assets = assetNames.map(name => `topics/${dir}/assets/${name}`);

    topics.push({
      id: meta.id,
      title: meta.title || dir,
      description: meta.description || '',
      tags: meta.tags || [],
      status: meta.status || 'draft',
      created: meta.created || '',
      path: `topics/${dir}`,
      files,
      assets,
    });

    console.log(`  ✅ ${meta.id} — ${Object.keys(files).length} AI files, ${assets.length} assets`);
  }

  const manifest = {
    generated_at: new Date().toISOString(),
    topics,
  };

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`\n📄 Manifest written to ${MANIFEST_PATH}`);
  console.log(`   ${topics.length} topics total\n`);
}

main().catch(e => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
