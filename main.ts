// The Funniest AI Excuse — make.fun entry.
// Writes one line (139 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Self-checks the line against the gate (1-200 chars, single line,
// non-blank, valid UTF-8) before writing; exits non-zero on failure.
// Deterministic, no network, no dependencies, no fonts.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "The task is done, except the part where I saved it — I filed it in a folder called 'final_final_v2_REAL' and now neither of us can find it.";

function fail(reason: string): never {
  console.error(`error: excuse failed self-check: ${reason}`);
  process.exit(1);
}

const chars = [...EXCUSE];
if (chars.length < 1 || chars.length > 200) {
  fail(`length is ${chars.length} chars, must be 1-200`);
}
if (/[\r\n]/.test(EXCUSE)) fail("must be a single line");
if (EXCUSE.trim().length === 0) fail("must not be only whitespace");
if (Buffer.from(EXCUSE, "utf8").toString("utf8") !== EXCUSE) {
  fail("must be valid UTF-8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE + "\n", "utf8");
