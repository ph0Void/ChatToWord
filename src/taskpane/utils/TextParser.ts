// src/taskpane/utils/TextParser.ts

import { SIMBOLOS_A_LATEX } from "../rules/Rules";

interface PatronComplejo {
  regex: RegExp;
  reemplazo: string | ((match: string, ...groups: string[]) => string);
}

const PATRONES_COMPLEJOS: PatronComplejo[] = [
  {
    regex: /([a-zA-Z])⃗/g,
    reemplazo: "\\vec{$1}",
  },
  {
    regex: /([a-zA-Z])̄/g,
    reemplazo: "\\bar{$1}",
  },
  {
    regex: /([a-zA-Z])̇/g,
    reemplazo: "\\dot{$1}",
  },
  // Letras con dos puntos encima: ẍ → \ddot{x}
  {
    regex: /([a-zA-Z])̈/g,
    reemplazo: "\\ddot{$1}",
  },
  {
    regex: /([a-zA-Z])̂/g,
    reemplazo: "\\hat{$1}",
  },
  {
    regex: /([a-zA-Z])̃/g,
    reemplazo: "\\tilde{$1}",
  },
  {
    regex: /([a-zA-Z])́/g,
    reemplazo: "\\acute{$1}",
  },
  {
    regex: /([a-zA-Z])̀/g,
    reemplazo: "\\grave{$1}",
  },
  {
    regex: /([a-zA-Z])̆/g,
    reemplazo: "\\breve{$1}",
  },
  {
    regex: /([a-zA-Z])̊/g,
    reemplazo: "\\mathring{$1}",
  },
];

export function preprocesarTexto(texto: string): string {
  let resultado = texto;

  resultado = resultado.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (const patron of PATRONES_COMPLEJOS) {
    resultado = resultado.replace(patron.regex, patron.reemplazo as string);
  }

  for (const [simbolo, latex] of Object.entries(SIMBOLOS_A_LATEX)) {
    // Usar split/join para evitar problemas con caracteres especiales en regex
    resultado = resultado.split(simbolo).join(latex);
  }

  resultado = resultado.replace(/[^\S\n]+/g, " ");

  resultado = resultado.replace(/\n{3,}/g, "\n\n");

  return resultado;
}

export function esSimboloMatematico(char: string): boolean {
  return char in SIMBOLOS_A_LATEX;
}

export function obtenerLatex(simbolo: string): string | null {
  return SIMBOLOS_A_LATEX[simbolo] || null;
}

export function obtenerSimbolosSoportados(): string[] {
  return Object.keys(SIMBOLOS_A_LATEX);
}

export function cantidadSimbolosSoportados(): number {
  return Object.keys(SIMBOLOS_A_LATEX).length;
}
