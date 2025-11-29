export const PATRONES_MACROS: Record<string, string> = {
  // ═══════════════════════════════════════════════════════════════
  // CONJUNTOS NUMÉRICOS
  // ═══════════════════════════════════════════════════════════════
  "\\R": "\\mathbb{R}",
  "\\N": "\\mathbb{N}",
  "\\Z": "\\mathbb{Z}",
  "\\Q": "\\mathbb{Q}",
  "\\C": "\\mathbb{C}",
  "\\K": "\\mathbb{K}",
  "\\F": "\\mathbb{F}",
  "\\P": "\\mathbb{P}",
  "\\E": "\\mathbb{E}",
  "\\iff": "\\Longleftrightarrow",
  "\\implies": "\\Longrightarrow",

  // ═══════════════════════════════════════════════════════════════
  // FUNCIONES TRIGONOMÉTRICAS
  // ═══════════════════════════════════════════════════════════════
  "\\sen": "\\sin",
  "\\senh": "\\sinh",
  "\\tg": "\\tan",
  "\\tgh": "\\tanh",
  "\\cotg": "\\cot",
  "\\arctg": "\\arctan",
  "\\arcsen": "\\arcsin",
  "\\arccos": "\\arccos",
  "\\cosec": "\\csc",

  // ═══════════════════════════════════════════════════════════════
  // CÁLCULO Y DERIVADAS
  // ═══════════════════════════════════════════════════════════════

  "\\d": "\\mathrm{d}",
  "\\dd": "\\mathrm{d}",
  "\\dx": "\\mathrm{d}x",
  "\\dt": "\\mathrm{d}t",

  "\\dv": "\\frac{d#1}{d#2}",
  "\\pdv": "\\frac{\\partial#1}{\\partial#2}",
  "\\fdv": "\\frac{\\delta#1}{\\delta#2}",

  // ═══════════════════════════════════════════════════════════════
  // ÁLGEBRA LINEAL Y VECTORES
  // ═══════════════════════════════════════════════════════════════
  "\\grad": "\\nabla",
  "\\div": "\\nabla\\cdot",
  "\\curl": "\\nabla\\times",
  "\\rot": "\\nabla\\times",
  "\\laplacian": "\\nabla^2",
  "\\norm": "\\left\\|#1\\right\\|",
  "\\abs": "\\left|#1\\right|",
  "\\inner": "\\left\\langle#1,#2\\right\\rangle",
  "\\Tr": "\\operatorname{Tr}",
  "\\rank": "\\operatorname{rank}",
  "\\det": "\\operatorname{det}",
  "\\dim": "\\operatorname{dim}",
  "\\Ker": "\\operatorname{Ker}",
  "\\Im": "\\operatorname{Im}",

  // ═══════════════════════════════════════════════════════════════
  // FÍSICA CUÁNTICA
  // ═══════════════════════════════════════════════════════════════
  "\\ket": "\\left|#1\\right\\rangle",
  "\\bra": "\\left\\langle#1\\right|",
  "\\braket": "\\left\\langle#1\\middle|#2\\right\\rangle",
  "\\ketbra": "\\left|#1\\right\\rangle\\left\\langle#2\\right|",
  "\\expval": "\\left\\langle#1\\right\\rangle",

  // ═══════════════════════════════════════════════════════════════
  // ESTADÍSTICA
  // ═══════════════════════════════════════════════════════════════
  "\\Var": "\\operatorname{Var}",
  "\\Cov": "\\operatorname{Cov}",
  "\\Corr": "\\operatorname{Corr}",

  // ═══════════════════════════════════════════════════════════════
  // OTROS SÍMBOLOS Y UTILIDADES
  // ═══════════════════════════════════════════════════════════════
  "\\checkmark": "✓",
  "\\qquad": "\\quad\\quad",
  "\\text": "\\mathrm{#1}",
  "\\bm": "\\boldsymbol{#1}",
  "\\unit": "\\mathrm{#1}",
};
