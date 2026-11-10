/**
 * Usage: node scripts/optimize-images.js <source-dir> [--force]
 *
 * Walks <source-dir> recursively. Each subfolder becomes a project slug.
 * Outputs to public/projects/<slug>/<name>.webp
 *
 * Example layout:
 *   ~/Desktop/shots/
 *     rock80/
 *       IMG_0001.jpg
 *       IMG_0002.jpg
 *     polaris/
 *       live-2025.jpg
 *
 * Produces:
 *   public/projects/rock80/IMG_0001.webp
 *   public/projects/rock80/IMG_0002.webp
 *   public/projects/polaris/live-2025.webp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_WIDTH = 1920;
const QUALITY = 80;
const VALID_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.tif', '.tiff']);

const args = process.argv.slice(2);
const force = args.includes('--force');
const sourceArg = args.find((a) => !a.startsWith('--'));

if (!sourceArg) {
  console.error('Usage: node scripts/optimize-images.js <source-dir> [--force]');
  process.exit(1);
}

const sourceDir = path.resolve(sourceArg);
const outputRoot = path.resolve(__dirname, '../public/projects');

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

fs.mkdirSync(outputRoot, { recursive: true });

async function optimizeFile(inputPath, outputPath) {
  const input = sharp(inputPath, { failOn: 'none' }).rotate();
  const meta = await input.metadata();
  const pipeline = meta.width && meta.width > MAX_WIDTH
    ? input.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : input;
  await pipeline.webp({ quality: QUALITY }).toFile(outputPath);
}

async function walk(dir, projectSlug = null) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let processed = 0;
  let skipped = 0;
  let bytesIn = 0;
  let bytesOut = 0;

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nextSlug = projectSlug ?? entry.name;
      const stats = await walk(full, nextSlug);
      processed += stats.processed;
      skipped += stats.skipped;
      bytesIn += stats.bytesIn;
      bytesOut += stats.bytesOut;
      continue;
    }

    if (!projectSlug) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!VALID_EXT.has(ext)) continue;

    const baseName = path.basename(entry.name, ext).replace(/\s+/g, '-');
    const outputDir = path.join(outputRoot, projectSlug);
    const outputPath = path.join(outputDir, `${baseName}.webp`);

    fs.mkdirSync(outputDir, { recursive: true });

    if (fs.existsSync(outputPath) && !force) {
      skipped++;
      continue;
    }

    const sizeIn = fs.statSync(full).size;
    try {
      await optimizeFile(full, outputPath);
      const sizeOut = fs.statSync(outputPath).size;
      bytesIn += sizeIn;
      bytesOut += sizeOut;
      processed++;
      const ratio = ((1 - sizeOut / sizeIn) * 100).toFixed(1);
      console.log(
        `  ${projectSlug}/${baseName}.webp  ${(sizeIn / 1024 / 1024).toFixed(1)}MB → ${(sizeOut / 1024).toFixed(0)}KB  (-${ratio}%)`
      );
    } catch (err) {
      console.error(`  ✖ ${full}: ${err.message}`);
    }
  }

  return { processed, skipped, bytesIn, bytesOut };
}

(async () => {
  console.log(`Source: ${sourceDir}`);
  console.log(`Output: ${outputRoot}`);
  console.log(`Max width: ${MAX_WIDTH}px  |  Quality: ${QUALITY}  |  Force: ${force}\n`);

  const { processed, skipped, bytesIn, bytesOut } = await walk(sourceDir);

  console.log(`\nProcessed: ${processed}  |  Skipped (already exist): ${skipped}`);
  if (processed > 0) {
    const savedMB = ((bytesIn - bytesOut) / 1024 / 1024).toFixed(1);
    const ratio = ((1 - bytesOut / bytesIn) * 100).toFixed(1);
    console.log(`Total: ${(bytesIn / 1024 / 1024).toFixed(1)}MB → ${(bytesOut / 1024 / 1024).toFixed(1)}MB  (-${ratio}%, saved ${savedMB}MB)`);
  }
  console.log(`\nNext: npm run scan-images  to regenerate lib/projectImages.ts`);
})();
