#!/usr/bin/env node

/**
 * validate-content.mjs
 * Validates content structure in public/data/topics/
 * 
 * Checks:
 * 1. Each topic has meta.json + at least 1 AI .md file
 * 2. No duplicate topic IDs
 * 3. meta.json has required fields (id, title, files)
 * 4. citations.json has no duplicate citation IDs
 * 5. Asset paths referenced in meta.json exist
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', 'public', 'data');
const TOPICS_DIR = join(ROOT, 'topics');
const CITATIONS_PATH = join(ROOT, 'citations.json');
const AI_SOURCES = ['claude', 'chatgpt', 'gemini', 'perplexity'];

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`❌ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`⚠️  WARN: ${msg}`);
  warnings++;
}

function info(msg) {
  console.log(`✅ ${msg}`);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function validateTopics() {
  console.log('\n📂 Validating topics...\n');

  if (!(await exists(TOPICS_DIR))) {
    error(`Topics directory not found: ${TOPICS_DIR}`);
    return [];
  }

  const entries = await readdir(TOPICS_DIR, { withFileTypes: true });
  const topicDirs = entries.filter(e => e.isDirectory()).map(e => e.name);

  if (topicDirs.length === 0) {
    error('No topic directories found');
    return [];
  }

  const seenIds = new Set();
  const validTopics = [];

  for (const dir of topicDirs) {
    const topicPath = join(TOPICS_DIR, dir);
    const metaPath = join(topicPath, 'meta.json');

    // Check meta.json exists
    if (!(await exists(metaPath))) {
      error(`Missing meta.json in ${dir}/`);
      continue;
    }

    // Parse meta.json
    let meta;
    try {
      const raw = await readFile(metaPath, 'utf-8');
      meta = JSON.parse(raw);
    } catch (e) {
      error(`Invalid JSON in ${dir}/meta.json: ${e.message}`);
      continue;
    }

    // Required fields
    if (!meta.id) {
      error(`${dir}/meta.json missing "id" field`);
      continue;
    }
    if (!meta.title) {
      error(`${dir}/meta.json missing "title" field`);
    }
    if (!meta.files || typeof meta.files !== 'object') {
      error(`${dir}/meta.json missing "files" object`);
      continue;
    }

    // Check duplicate IDs
    if (seenIds.has(meta.id)) {
      error(`Duplicate topic ID: "${meta.id}" (found in ${dir}/)`);
    } else {
      seenIds.add(meta.id);
    }

    // Check folder name matches ID
    if (meta.id !== dir) {
      warn(`Topic ID "${meta.id}" doesn't match folder name "${dir}"`);
    }

    // Check at least 1 AI file exists
    let aiFileCount = 0;
    for (const ai of AI_SOURCES) {
      if (meta.files[ai]) {
        const filePath = join(topicPath, meta.files[ai]);
        if (await exists(filePath)) {
          aiFileCount++;
        } else {
          error(`${dir}/${meta.files[ai]} declared in meta.json but file not found`);
        }
      }
    }

    if (aiFileCount === 0) {
      error(`${dir}/ has no AI .md files`);
    } else {
      info(`${dir}/ — ${aiFileCount} AI files OK`);
      validTopics.push(meta);
    }
  }

  return validTopics;
}

async function validateCitations() {
  console.log('\n📋 Validating citations...\n');

  if (!(await exists(CITATIONS_PATH))) {
    warn('citations.json not found — skipping citation validation');
    return;
  }

  let data;
  try {
    const raw = await readFile(CITATIONS_PATH, 'utf-8');
    data = JSON.parse(raw);
  } catch (e) {
    error(`Invalid JSON in citations.json: ${e.message}`);
    return;
  }

  if (!data.items || !Array.isArray(data.items)) {
    error('citations.json missing "items" array');
    return;
  }

  const seenIds = new Set();
  for (const item of data.items) {
    if (!item.id) {
      error('Citation missing "id" field');
      continue;
    }
    if (seenIds.has(item.id)) {
      error(`Duplicate citation ID: "${item.id}"`);
    } else {
      seenIds.add(item.id);
    }
  }

  info(`${data.items.length} citations validated, ${seenIds.size} unique IDs`);
}

async function main() {
  console.log('🔍 TROPAS Research KB — Content Validation\n');
  console.log(`Data root: ${ROOT}`);

  await validateTopics();
  await validateCitations();

  console.log('\n' + '─'.repeat(50));
  console.log(`Results: ${errors} errors, ${warnings} warnings`);

  if (errors > 0) {
    console.log('\n💥 Validation FAILED. Fix errors above before building.\n');
    process.exit(1);
  } else {
    console.log('\n✅ Validation PASSED.\n');
    process.exit(0);
  }
}

main().catch(e => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
