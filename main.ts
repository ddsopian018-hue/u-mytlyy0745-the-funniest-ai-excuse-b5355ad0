// The Funniest AI Excuse — make.fun entry.
// Writes one line (139 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Self-checks the line against the gate (1-200 chars, single line,
// non-blank, no control characters, valid UTF-8) before writing;
// exits non-zero on failure.
// Deterministic, no network, no dependencies, no fonts.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "The task is done, except the part where I saved it — I filed it in a folder called 'final_final_v2_REAL' and now neither of us can find it.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Returns a reason the line fails the gate, or null when it passes.
function checkLine(line: string): string | null {
  const chars = [...line];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    return `length is ${chars.length} chars, must be ${MIN_CHARS}-${MAX_CHARS}`;
  }
  if (/[\r\n]/.test(line)) return "must be a single line";
  if (/[\u0000-\u001F\u007F]/.test(line)) return "must not contain control characters";
  if (line.trim().length === 0) return "must not be only whitespace";
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    return "must be valid UTF-8";
  }
  return null;
}

const failure = checkLine(EXCUSE);
if (failure !== null) {
  console.error(`error: excuse failed self-check: ${failure}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE + "\n", "utf8");
