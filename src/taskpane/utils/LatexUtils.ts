// src/taskpane/utils/LatexUtils.ts
import katex from "katex";
import { escapeHtml } from "./HtmlUtils";

export function limpiarLatex(latex: string): string {
  let limpio = latex
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\\dfrac/g, "\\frac")
    .replace(/\\tfrac/g, "\\frac")
    .replace(/['′]/g, "'")
    .replace(/\s*=\s*/g, " = ")
    .replace(/\s*\+\s*/g, " + ")
    .replace(/\s*-\s*/g, " - ")
    .trim();

  if (limpio.endsWith(".") && !limpio.endsWith("...")) {
    limpio = limpio.slice(0, -1);
  }

  return limpio;
}

export function latexAMathML(latex: string, displayMode: boolean): string {
  try {
    const latexLimpio = limpiarLatex(latex);

    const mathml = katex.renderToString(latexLimpio, {
      output: "mathml",
      displayMode: displayMode,
      throwOnError: false,
      strict: false,
      trust: true,
      macros: {
        // Conjuntos numéricos
        "\\R": "\\mathbb{R}",
        "\\N": "\\mathbb{N}",
        "\\Z": "\\mathbb{Z}",
        "\\Q": "\\mathbb{Q}",
        "\\C": "\\mathbb{C}",
        // Símbolos especiales
        "\\checkmark": "✓",
        "\\qquad": "\\quad\\quad",
        // Funciones adicionales
        "\\sen": "\\sin",
        "\\senh": "\\sinh",
        "\\arctg": "\\arctan",
        "\\tg": "\\tan",
        "\\cotg": "\\cot",
        // Derivadas
        "\\dv": "\\frac{d#1}{d#2}",
        "\\pdv": "\\frac{\\partial#1}{\\partial#2}",
        // Otros
        "\\grad": "\\nabla",
        "\\curl": "\\nabla\\times",
        "\\div": "\\nabla\\cdot",
      },
    });

    let mathmlFinal = mathml
      .replace(/<math>/g, '<math xmlns="http://www.w3.org/1998/Math/MathML">')
      .replace(/class="[^"]*"/g, "");

    return mathmlFinal;
  } catch (error) {
    return `<span style="font-family: 'Cambria Math', 'Times New Roman', serif; font-style: italic; background-color: #fff3cd; padding: 2px 4px;">
            ${escapeHtml(latex)}
        </span>`;
  }
}
