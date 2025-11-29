interface PatronComplejo {
  regex: RegExp;
  reemplazo: string | ((match: string, ...groups: string[]) => string);
}

export const PATRONES_COMPLEJOS: PatronComplejo[] = [
  { regex: /([a-zA-Z])⃗/g, reemplazo: "\\vec{$1}" },
  { regex: /([a-zA-Z])̄/g, reemplazo: "\\bar{$1}" },
  { regex: /([a-zA-Z])̇/g, reemplazo: "\\dot{$1}" },
  { regex: /([a-zA-Z])̈/g, reemplazo: "\\ddot{$1}" },
  { regex: /([a-zA-Z])̂/g, reemplazo: "\\hat{$1}" },
  { regex: /([a-zA-Z])̃/g, reemplazo: "\\tilde{$1}" },
  { regex: /([a-zA-Z])́/g, reemplazo: "\\acute{$1}" },
  { regex: /([a-zA-Z])̀/g, reemplazo: "\\grave{$1}" },
  { regex: /([a-zA-Z])̆/g, reemplazo: "\\breve{$1}" },
  { regex: /([a-zA-Z])̊/g, reemplazo: "\\mathring{$1}" },
  { regex: /ℝ/g, reemplazo: "\\mathbb{R}" },
  { regex: /ℕ/g, reemplazo: "\\mathbb{N}" },
  { regex: /ℤ/g, reemplazo: "\\mathbb{Z}" },
  { regex: /ℚ/g, reemplazo: "\\mathbb{Q}" },
  { regex: /ℂ/g, reemplazo: "\\mathbb{C}" },
  { regex: /≤/g, reemplazo: "\\le" },
  { regex: /≥/g, reemplazo: "\\ge" },
  { regex: /≠/g, reemplazo: "\\neq" },
  { regex: /≈/g, reemplazo: "\\approx" },
  { regex: /×/g, reemplazo: "\\times" },
  { regex: /÷/g, reemplazo: "\\div" },
  { regex: /±/g, reemplazo: "\\pm" },
  { regex: /∓/g, reemplazo: "\\mp" },
  { regex: /∞/g, reemplazo: "\\infty" },
  { regex: /∂/g, reemplazo: "\\partial" },
  { regex: /∇/g, reemplazo: "\\nabla" },
  { regex: /√/g, reemplazo: "\\sqrt" },
  { regex: /→/g, reemplazo: "\\to" },
  { regex: /←/g, reemplazo: "\\leftarrow" },
  { regex: /⇒/g, reemplazo: "\\Rightarrow" },
  { regex: /⇔/g, reemplazo: "\\Leftrightarrow" },
  { regex: /↦/g, reemplazo: "\\mapsto" },
  { regex: /∈/g, reemplazo: "\\in" },
  { regex: /∉/g, reemplazo: "\\notin" },
  { regex: /⊂/g, reemplazo: "\\subset" },
  { regex: /⊃/g, reemplazo: "\\supset" },
  { regex: /∪/g, reemplazo: "\\cup" },
  { regex: /∩/g, reemplazo: "\\cap" },
  { regex: /∅/g, reemplazo: "\\emptyset" },
  { regex: /∀/g, reemplazo: "\\forall" },
  { regex: /∃/g, reemplazo: "\\exists" },
  { regex: /∑/g, reemplazo: "\\sum" },
  { regex: /∏/g, reemplazo: "\\prod" },
  { regex: /∫/g, reemplazo: "\\int" },
  { regex: /½/g, reemplazo: "\\frac{1}{2}" },
  { regex: /⅓/g, reemplazo: "\\frac{1}{3}" },
  { regex: /¼/g, reemplazo: "\\frac{1}{4}" },
  {
    regex: /([a-zA-Z0-9])([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ]+)/g,
    reemplazo: (_match: string, base: string, sup: string) => {
      const map: { [key: string]: string } = {
        "⁰": "0",
        "¹": "1",
        "²": "2",
        "³": "3",
        "⁴": "4",
        "⁵": "5",
        "⁶": "6",
        "⁷": "7",
        "⁸": "8",
        "⁹": "9",
        "⁺": "+",
        "⁻": "-",
        "⁼": "=",
        "⁽": "(",
        "⁾": ")",
        ⁿ: "n",
      };
      const converted = sup
        .split("")
        .map((c) => map[c] || c)
        .join("");
      return `${base}^{${converted}}`;
    },
  },
  {
    regex: /([a-zA-Z0-9])([₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ]+)/g,
    reemplazo: (_match: string, base: string, sub: string) => {
      const map: { [key: string]: string } = {
        "₀": "0",
        "₁": "1",
        "₂": "2",
        "₃": "3",
        "₄": "4",
        "₅": "5",
        "₆": "6",
        "₇": "7",
        "₈": "8",
        "₉": "9",
        "₊": "+",
        "₋": "-",
        "₌": "=",
        "₍": "(",
        "₎": ")",
        ₐ: "a",
        ₑ: "e",
        ₕ: "h",
        ᵢ: "i",
        ⱼ: "j",
        ₖ: "k",
        ₗ: "l",
        ₘ: "m",
        ₙ: "n",
        ₒ: "o",
        ₚ: "p",
        ᵣ: "r",
        ₛ: "s",
        ₜ: "t",
        ᵤ: "u",
        ᵥ: "v",
        ₓ: "x",
      };
      const converted = sub
        .split("")
        .map((c) => map[c] || c)
        .join("");
      return `${base}_{${converted}}`;
    },
  },
];
