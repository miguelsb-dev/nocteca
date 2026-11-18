import fs from "node:fs";

const path = "src/lib/demo.ts";
let t = fs.readFileSync(path, "utf8");

function strip(s) {
  return s
    .replace(/\n*\*\*\d+([.,]\d+)?(\s*\/\s*10)?\.?\*\*\s*$/gim, "")
    .replace(/\n*\d+([.,]\d+)?\s*\/\s*10\.?\s*$/gim, "")
    .replace(/[ \t]*Un\s+\d+([.,]\d+)?\.?\s*$/gim, "")
    .replace(/[ \t]*un\s+\d+([.,]\d+)?\.?\s*$/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function replaceQuoted(field) {
  const re = new RegExp(
    `(${field}:\\s*)(\`(?:\\\\.|[^\\\\\`])*\`|"(?:\\\\.|[^"])*")`,
    "g",
  );
  t = t.replace(re, (_m, prefix, lit) => {
    const q = lit[0];
    const inner = lit.slice(1, -1);
    return prefix + q + strip(inner) + q;
  });
}

replaceQuoted("description");
replaceQuoted("review");
fs.writeFileSync(path, t);
console.log("cleaned", path);
