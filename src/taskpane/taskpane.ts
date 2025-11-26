// src/taskpane/taskpane.ts
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

import { preprocesarTexto } from "./utils/TextParser";
import { limpiarHtmlParaWord } from "./utils/HtmlUtils";
import { esContenidoMatematico, esExpresionFuncion, generarPlaceholder } from "./utils/Utils";
import { latexAMathML } from "./utils/LatexUtils";
import { insertarEnWord, envolverParaWord, aplicarEstilosWord } from "./utils/WordUtils";

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
    document.getElementById("clear").onclick = () => {
      const textarea = document.getElementById("markdown-input") as HTMLTextAreaElement;
      textarea.value = "";
    };
  }
});

interface FormulaInfo {
  latex: string;
  displayMode: boolean;
  placeholder: string;
  original: string; // Para debugging
}

function extraerFormulasLatex(texto: string): { textoLimpio: string; formulas: FormulaInfo[] } {
  const formulas: FormulaInfo[] = [];
  let textoLimpio = texto;
  let index = 0;

  textoLimpio = textoLimpio.replace(/\$\$([\s\S]+?)\$\$/g, (match, latex) => {
    const placeholder = generarPlaceholder(index++);
    formulas.push({
      latex: latex.trim(),
      displayMode: true,
      placeholder,
      original: match,
    });
    return `\n${placeholder}\n`;
  });

  textoLimpio = textoLimpio.replace(/\\\[([\s\S]+?)\\\]/g, (match, latex) => {
    const placeholder = generarPlaceholder(index++);
    formulas.push({
      latex: latex.trim(),
      displayMode: true,
      placeholder,
      original: match,
    });
    return `\n${placeholder}\n`;
  });

  textoLimpio = textoLimpio.replace(/\[\s*([\s\S]+?)\s*\]/g, (match, contenido) => {
    if (/\]\s*\(/.test(match.substring(match.indexOf("]")))) {
      return match;
    }

    if (/^\[\^?\d+\]$/.test(match)) {
      return match;
    }

    if (/^\[\s*[xX\s]?\s*\]$/.test(match)) {
      return match;
    }

    if (esContenidoMatematico(contenido)) {
      const placeholder = generarPlaceholder(index++);
      formulas.push({
        latex: contenido.trim(),
        displayMode: true,
        placeholder,
        original: match,
      });
      return `\n${placeholder}\n`;
    }

    return match;
  });

  textoLimpio = textoLimpio.replace(/(?<!\$)\$([^\$\n]+?)\$(?!\$)/g, (match, latex) => {
    if (/^\d+([.,]\d{2})?$/.test(latex.trim())) {
      return match;
    }

    const placeholder = generarPlaceholder(index++);
    formulas.push({
      latex: latex.trim(),
      displayMode: false,
      placeholder,
      original: match,
    });
    return placeholder;
  });

  textoLimpio = textoLimpio.replace(/\\\(([\s\S]+?)\\\)/g, (match, latex) => {
    const placeholder = generarPlaceholder(index++);
    formulas.push({
      latex: latex.trim(),
      displayMode: false,
      placeholder,
      original: match,
    });
    return placeholder;
  });

  textoLimpio = textoLimpio.replace(/\(([^()]+(?:\([^()]*\)[^()]*)*)\)/g, (match, contenido) => {
    const esMatematico = esContenidoMatematico(contenido);
    const esFuncion = esExpresionFuncion(contenido);

    const tieneIgualdad = /=/.test(contenido);
    const tieneComandoLatex = /\\[a-zA-Z]+/.test(contenido);
    const tieneOperacionesComplejas = /[\^_]/.test(contenido) && tieneIgualdad;

    if (
      tieneComandoLatex ||
      (esMatematico && (tieneIgualdad || esFuncion)) ||
      tieneOperacionesComplejas
    ) {
      const placeholder = generarPlaceholder(index++);
      formulas.push({
        latex: contenido.trim(),
        displayMode: false,
        placeholder,
        original: match,
      });
      return placeholder;
    }

    return match;
  });

  textoLimpio = textoLimpio.replace(
    /^(\s*\*\s*)\(([^()]+(?:\([^()]*\)[^()]*)*=[\s\S]+?)\)(\s*(?:\\checkmark|✓|✔)?)/gm,
    (match, prefijo, contenido, sufijo) => {
      if (esContenidoMatematico(contenido)) {
        const placeholder = generarPlaceholder(index++);
        formulas.push({
          latex: contenido.trim(),
          displayMode: false,
          placeholder,
          original: `(${contenido})`,
        });
        return `${prefijo}${placeholder}${sufijo}`;
      }
      return match;
    }
  );

  textoLimpio = textoLimpio.replace(
    /([a-zA-Z]['′]?\([^)]+\)\s*=\s*)([-+]?[^,.\n]+(?:\\[a-zA-Z]+[^,.\n]*)+)/g,
    (match, funcion, expresion) => {
      const contenidoCompleto = funcion + expresion;
      if (esContenidoMatematico(contenidoCompleto)) {
        const placeholder = generarPlaceholder(index++);
        formulas.push({
          latex: contenidoCompleto.trim(),
          displayMode: false,
          placeholder,
          original: match,
        });
        return placeholder;
      }
      return match;
    }
  );

  return { textoLimpio, formulas };
}

function configurarMarkdownParser(): MarkdownIt {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const highlighted = hljs.highlight(str, { language: lang }).value;
          return `<pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; font-family: 'Consolas', 'Courier New', monospace; font-size: 10pt; border: 1px solid #ddd; overflow-x: auto; white-space: pre-wrap;"><code>${highlighted}</code></pre>`;
        } catch (err) {
          console.error("Error en highlight:", err);
        }
      }
      return `<pre style="background-color: #f4f4f4; padding: 12px; border-radius: 6px; font-family: 'Consolas', 'Courier New', monospace; font-size: 10pt; border: 1px solid #ddd; white-space: pre-wrap;"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });

  return md;
}

function reemplazarFormulasConMathML(html: string, formulas: FormulaInfo[]): string {
  let resultado = html;

  for (const formula of formulas) {
    const mathml = latexAMathML(formula.latex, formula.displayMode);

    if (formula.displayMode) {
      resultado = resultado.replace(
        formula.placeholder,
        `<div style="text-align: center; margin: 12pt 0; page-break-inside: avoid;">${mathml}</div>`
      );
    } else {
      resultado = resultado.replace(formula.placeholder, mathml);
    }
  }

  resultado = resultado.replace(/⟦FORMULA_\d+_PLACEHOLDER⟧/g, "");

  return resultado;
}

function procesarContenido(texto: string): string {
  const textoPreprocesado = preprocesarTexto(texto);

  const { textoLimpio, formulas } = extraerFormulasLatex(textoPreprocesado);

  const md = configurarMarkdownParser();
  let html = md.render(textoLimpio);

  html = aplicarEstilosWord(html);

  html = reemplazarFormulasConMathML(html, formulas);

  html = limpiarHtmlParaWord(html);

  html = envolverParaWord(html);

  return html;
}

function mostrarMensaje(mensaje: string, tipo: "success" | "error" | "warning" | "info"): void {
  const container = document.getElementById("status-container");
  const label = document.getElementById("item-subject");

  if (label && container) {
    container.classList.remove("hidden");

    label.className = "text-sm flex items-center gap-2 p-3 rounded-lg";

    switch (tipo) {
      case "success":
        label.classList.add("bg-green-50", "text-green-700", "border", "border-green-200");
        break;
      case "error":
        label.classList.add("bg-red-50", "text-red-700", "border", "border-red-200");
        break;
      case "warning":
        label.classList.add("bg-amber-50", "text-amber-700", "border", "border-amber-200");
        break;
      case "info":
      default:
        label.classList.add("bg-blue-50", "text-blue-700", "border", "border-blue-200");
        break;
    }

    label.textContent = mensaje;
  }
}

export async function run() {
  try {
    mostrarMensaje("Procesando contenido...", "info");

    const textarea = document.getElementById("markdown-input") as HTMLTextAreaElement;

    if (!textarea) {
      mostrarMensaje("Error: No se encontró el área de texto", "error");
      return;
    }

    const textoOriginal = textarea.value;

    if (!textoOriginal || textoOriginal.trim() === "") {
      mostrarMensaje("El área de texto está vacía", "warning");
      alert(
        "Por favor, pega el contenido de tu chatbot (ChatGPT, Claude, Gemini, Copilot, etc.) en el área de texto."
      );
      return;
    }

    const html = procesarContenido(textoOriginal);

    await insertarEnWord(html);

    mostrarMensaje("Contenido insertado correctamente", "success");
  } catch (error) {
    mostrarMensaje("Error: " + (error as Error).message, "error");
  }
}
