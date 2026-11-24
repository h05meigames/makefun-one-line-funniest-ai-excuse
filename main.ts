// make.fun bounty: u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18
// "One Line, One Minute: The Funniest AI Excuse" — prints one original
// one-line excuse an AI agent would give its human for a missed deadline.
// Node 22, standard library only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line =
  "I met the deadline in a parallel session, but this session is still waiting for that session to send the handoff.";

// Guard: the gate requires 1–200 characters.
// Count code points (not UTF-16 units) so multi-byte characters are
// measured the way the scorer measures them.
const length = [...line].length;
if (length < 1 || length > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${length}.`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Re-read and verify the written file: exactly one line, no trailing
// newline, and the same code-point length the guard checked.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line) {
  throw new Error("Written entry differs from the guarded line.");
}
if (written.endsWith("\n") || written.includes("\n")) {
  throw new Error("Entry must be a single line with no newline.");
}

// Print exactly the line — nothing else — so stdout is the entry itself.
console.log(line);
