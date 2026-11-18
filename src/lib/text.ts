/** Quita menciones sueltas de nota; la puntuación vive solo en el badge. */
export function stripScoreMentions(text: string): string {
  return text
    .replace(/^\*\*\d+([.,]\d+)?(\s*\/\s*10)?\.?\*\*\s*/gim, "")
    .replace(/\n*\*\*\d+([.,]\d+)?(\s*\/\s*10)?\.?\*\*\s*$/gim, "")
    .replace(/\n*\d+([.,]\d+)?\s*\/\s*10\.?\s*$/gim, "")
    .replace(/[ \t]*Un\s+\d+([.,]\d+)?\.?\s*$/gim, "")
    .replace(/[ \t]*un\s+\d+([.,]\d+)?\.?\s*$/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}
