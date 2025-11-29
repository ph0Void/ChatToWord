// src/taskpane/utils/WordUtils.ts

export async function insertarEnWord(html: string): Promise<void> {
  return Word.run(async (context) => {
    const selection = context.document.getSelection();

    selection.insertHtml(html, Word.InsertLocation.replace);

    await context.sync();
  });
}

export function envolverParaWord(html: string): string {
  return `
    <div style="font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5;">
      ${html}
    </div>
  `.trim();
}

export function aplicarEstilosWord(html: string): string {
  return html

    .replace(/<table>/gi, '<table style="border-collapse: collapse; width: 100%; margin: 10pt 0;">')
    .replace(
      /<th>/gi,
      '<th style="border: 1pt solid #333; padding: 6pt; background-color: #e8e8e8; font-weight: bold; text-align: left;">'
    )
    .replace(/<td>/gi, '<td style="border: 1pt solid #333; padding: 6pt; vertical-align: top;">')

    .replace(
      /<h1>/gi,
      '<h1 style="font-size: 20pt; font-weight: bold; margin: 14pt 0 8pt 0; color: #1a1a1a; border-bottom: 2pt solid #1a1a1a; padding-bottom: 4pt;">'
    )
    .replace(
      /<h2>/gi,
      '<h2 style="font-size: 16pt; font-weight: bold; margin: 12pt 0 6pt 0; color: #2a2a2a; border-bottom: 1pt solid #ccc; padding-bottom: 3pt;">'
    )
    .replace(
      /<h3>/gi,
      '<h3 style="font-size: 13pt; font-weight: bold; margin: 10pt 0 5pt 0; color: #3a3a3a;">'
    )
    .replace(/<h4>/gi, '<h4 style="font-size: 11pt; font-weight: bold; margin: 8pt 0 4pt 0;">')
    .replace(/<h5>/gi, '<h5 style="font-size: 10pt; font-weight: bold; margin: 6pt 0 3pt 0;">')

    .replace(/<p>/gi, '<p style="margin: 6pt 0; line-height: 1.5; text-align: justify;">')
    .replace(/<ul>/gi, '<ul style="margin: 8pt 0 8pt 20pt; padding-left: 15pt;">')
    .replace(/<ol>/gi, '<ol style="margin: 8pt 0 8pt 20pt; padding-left: 15pt;">')
    .replace(/<li>/gi, '<li style="margin: 4pt 0; line-height: 1.4;">')

    .replace(
      /<blockquote>/gi,
      '<blockquote style="margin: 10pt 20pt; padding: 8pt 12pt; border-left: 4pt solid #4a90d9; background-color: #f0f7ff; font-style: italic;">'
    )

    .replace(/<a /gi, '<a style="color: #0563c1; text-decoration: underline;" ')

    .replace(/<strong>/gi, '<strong style="font-weight: bold;">')
    .replace(/<em>/gi, '<em style="font-style: italic;">')

    .replace(
      /<code>/gi,
      "<code style=\"font-family: 'Consolas', 'Courier New', monospace; background-color: #f0f0f0; padding: 1pt 4pt; border-radius: 3pt; font-size: 9pt;\">"
    )

    .replace(
      /<hr\s*\/?>/gi,
      '<hr style="border: none; border-top: 1pt solid #ccc; margin: 12pt 0;">'
    )

    .replace(/<img /gi, '<img style="max-width: 100%; height: auto; margin: 8pt 0;" ');
}
