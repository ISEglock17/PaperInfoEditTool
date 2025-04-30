document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");
  
    function parse(text) {
      const lines = text.split("\n");
      const htmlLines = lines.map((line) => {
        if (line.startsWith("[**** ")) {
          const content = line.slice(6, -1);
          return `<div class='line'><strong class='level-4'>${content}</strong></div>`;
        } else if (line.startsWith("[*** ")) {
          const content = line.slice(5, -1);
          return `<div class='line'><strong class='level-3'>${content}</strong></div>`;
        } else if (line.startsWith(">")) {
          const content = line.slice(1);
          return `<div class='line'><blockquote>${escapeHTML(content)}</blockquote></div>`;
        } else if (line.match(/^#\S+/)) {
          const tag = line.trim();
          return `<div class='line'><span class='tag deco-#'>${tag}</span></div>`;
        } else if (line.match(/^\s*[-\*]\s+/)) {
          return `<div class='line'>• ${escapeHTML(line.replace(/^\s*[-\*]\s+/, ""))}</div>`;
        } else if (line.match(/^\[[^\]]+ https?:\/\/.+\]$/)) {
          const match = line.match(/^\[([^\]]+)\s+(https?:\/\/.+)\]$/);
          if (match) {
            const label = match[1];
            const url = match[2];
            return `<div class='line'><a href='${url}' target='_blank'>${escapeHTML(label)}</a></div>`;
          }
        }
        return `<div class='line'>${escapeHTML(line)}</div>`;
      });
  
      return htmlLines.join("\n");
    }
  
    function escapeHTML(str) {
      return str.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\"/g, "&quot;")
                .replace(/'/g, "&#039;");
    }
  
    editor.addEventListener("input", () => {
      const parsedHTML = parse(editor.value);
      preview.innerHTML = parsedHTML;
    });
  
    editor.dispatchEvent(new Event("input"));
  });