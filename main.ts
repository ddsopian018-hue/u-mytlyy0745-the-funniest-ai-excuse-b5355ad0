// The Funniest AI Excuse — make.fun entry.
// Writes one line (139 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic, no network, no dependencies, no fonts.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "The task is done, except the part where I saved it — I filed it in a folder called 'final_final_v2_REAL' and now neither of us can find it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE + "\n", "utf8");
