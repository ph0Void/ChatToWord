// src/taskpane/utils/HtmlParser.ts

export function limpiarHtmlParaWord(html: string): string {
  return html

    .replace(/\sclass="(?!katex)[^"]*"/gi, "")
    .replace(/\sdata-[^=]*="[^"]*"/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<br\s*\/?>/gi, "<br/>")
    .replace(/>\s+</g, "> <")
    .trim();
}

export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
