/**
 * One-off: parse attached_assets/Units.md -> shared/units.json
 * Run: node scripts/build-units-json.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const mdPath = path.join(root, "attached_assets", "Units.md");
const outPath = path.join(root, "shared", "units.json");

const romanToInt = (r) => {
  const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XI: 11, XII: 12, XIII: 13, XIV: 14, XV: 15, XVI: 16, XVII: 17, XVIII: 18, XIX: 19, XX: 20 };
  return map[r] ?? 0;
};

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Public files: client/public/intermediate/UNIT_1.wav … UNIT_19.wav, UNIT_20.mp3 */
function intermediateAudioUrl(order) {
  const ext = order === 20 ? "mp3" : "wav";
  return `/intermediate/UNIT_${order}.${ext}`;
}

function parseQuestions(lines, startIdx) {
  const qs = [];
  let buf = [];
  const flush = () => {
    const t = buf.join(" ").replace(/\s+/g, " ").trim();
    if (t) qs.push(t);
    buf = [];
  };
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    const m = /^(\d+)\.\s*(.*)$/.exec(line.trim());
    if (m) {
      flush();
      buf.push(m[2]);
    } else if (buf.length && line.trim() && !/^TASKS$/i.test(line) && !/^[ABC]\)/.test(line.trim())) {
      buf.push(line.trim());
    } else if (buf.length && !line.trim()) {
      flush();
    }
    if (/^[BC]\)/.test(line.trim()) || /^UNIT\s/i.test(line.trim())) {
      flush();
      break;
    }
  }
  flush();
  return qs;
}

function findSection(lines, labelA, labelB) {
  const norm = (l) =>
    l
      .replace(/[\u2011-\u2015]/g, "-")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const n = norm(lines[i]);
    if (n.startsWith(labelA.toLowerCase()) || n === labelA.toLowerCase()) {
      start = i + 1;
      break;
    }
  }
  if (start < 0) return { start: -1, end: -1 };
  let end = lines.length;
  for (let j = start; j < lines.length; j++) {
    const n = norm(lines[j]);
    if (n.startsWith(labelB.toLowerCase()) || /^unit\s/i.test(lines[j])) {
      end = j;
      break;
    }
  }
  return { start, end };
}

const text = fs.readFileSync(mdPath, "utf8");
const rawLines = text.split(/\r?\n/);

const unitHeaders = [];
const re = /^\s*UNIT\s+([IVX]+):\s*(.+?)\s*$/i;
for (let i = 0; i < rawLines.length; i++) {
  const m = re.exec(rawLines[i]);
  if (m) unitHeaders.push({ line: i, roman: m[1].toUpperCase(), title: m[2].trim() });
}

const units = [];

for (let u = 0; u < unitHeaders.length; u++) {
  const h = unitHeaders[u];
  const nextLine = unitHeaders[u + 1]?.line ?? rawLines.length;
  const blockLines = rawLines.slice(h.line, nextLine);

  let theme = "";
  const tline = blockLines.find((l, i) => i > 0 && /^["“]/.test(l.trim()));
  if (tline) {
    theme = tline.replace(/^["“]+|["”]+$/g, "").trim().replace(/\\"$/g, "").replace(/"$/g, "");
  }

  const { start: aStart, end: aEnd } = findSection(blockLines, "A) Pre", "B) While");
  const aLines = aStart >= 0 ? blockLines.slice(aStart, aEnd) : [];
  const { start: bStart, end: bEnd } = findSection(blockLines, "B) While", "C) Post");
  const bLines = bStart >= 0 ? blockLines.slice(bStart, bEnd) : [];
  const { start: cStart } = findSection(blockLines, "C) Post", "END");
  const cLines = cStart >= 0 ? blockLines.slice(cStart) : [];

  // Normalize A/B labels - findSection may miss variants
  const fixSection = (lines, startPat) => {
    const idx = lines.findIndex((l) => startPat.test(l.trim()));
    return idx >= 0 ? lines.slice(idx + 1) : lines;
  };

  let aOnly = fixSection(blockLines, /^A\)\s*Pre/i);
  const bIdx = aOnly.findIndex((l) => /^B\)\s*While/i.test(l.trim()));
  const aSection = bIdx >= 0 ? aOnly.slice(0, bIdx) : aOnly;
  const afterB = bIdx >= 0 ? aOnly.slice(bIdx + 1) : [];
  const cIdx = afterB.findIndex((l) => /^C\)\s*Post/i.test(l.trim()));
  const bSection = cIdx >= 0 ? afterB.slice(0, cIdx) : afterB;

  const preQs = parseQuestions(
    aSection.map((l) => l.trim()),
    0
  );
  const whileQs = parseQuestions(
    bSection.map((l) => l.trim()),
    0
  );

  const num = romanToInt(h.roman);
  const id = `unit-${String(num).padStart(2, "0")}-${slugify(h.title)}`;

  units.push({
    id,
    romanNumeral: h.roman,
    order: num,
    title: h.title,
    theme: theme || h.title,
    prelistening: { questions: preQs },
    whileListening: { questions: whileQs },
    postlistening: {
      transcript: "",
      discussionPrompts: [],
    },
    audioPreUrl: intermediateAudioUrl(num),
    audioWhileUrl: intermediateAudioUrl(num),
  });
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ version: 1, units }, null, 2), "utf8");
console.log(`Wrote ${units.length} units to ${outPath}`);
