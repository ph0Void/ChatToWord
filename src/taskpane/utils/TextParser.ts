// src/taskpane/utils/TextParser.ts

import { PATRONES_COMPLEJOS } from "../rules/PatronRules";
import { SIMBOLOS_A_LATEX } from "../rules/Rules";

export function preprocesarTexto(texto: string): string {
  let resultado = texto;

  resultado = resultado.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (const patron of PATRONES_COMPLEJOS) {
    resultado = resultado.replace(patron.regex, patron.reemplazo as string);
  }

  for (const [simbolo, latex] of Object.entries(SIMBOLOS_A_LATEX)) {
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
