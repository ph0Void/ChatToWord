// src/taskpane/utils/Utils.ts

export function generarPlaceholder(index: number): string {
  return `⟦FORMULA_${index}_PLACEHOLDER⟧`;
}

export function esContenidoMatematico(texto: string): boolean {
  const patronesMatematicos = [
    /\\[a-zA-Z]+/,
    /\^\{[^}]+\}/,
    /_\{[^}]+\}/,
    /\^[0-9a-zA-Z]/,
    /_[0-9a-zA-Z]/,
    /\{[^{}]*\}/,
    /[=<>≤≥≠±∞∈]/,
    /\d+\/\d+/,
    /e\^/,
    /\\checkmark/,
  ];

  return patronesMatematicos.some((patron) => patron.test(texto));
}

export function esExpresionFuncion(texto: string): boolean {
  return /^[a-zA-Z]['′]?\([^)]+\)\s*=/.test(texto.trim());
}
