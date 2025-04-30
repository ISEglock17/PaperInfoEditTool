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
        } else if (line.startsWith("[** ")) {
            const content = line.slice(4, -1); // [** 見出し] を取り出し
            return `<div class='line'><h2 class='level-2'>${content}</h2></div>`;
        } else if (line.startsWith("[* ")) {
            const content = line.slice(3, -1); // [* 見出し] を取り出し
            return `<div class='line'><h1 class='level-1'>${content}</h1></div>`;
        } 
        // 引用部分の処理
        else if (line.startsWith(">")) {
            const content = line.slice(1);
            return `<div class='line'><blockquote>${escapeHTML(content)}</blockquote></div>`;
        }
        // タグの処理
        else if (line.match(/^#\S+/)) {
            const tag = line.trim();
            return `<div class='line'><span class='tag deco-#'>${tag}</span></div>`;
        }
        // 箇条書きの処理 (スペースの数に応じてインデント)
        else if (line.match(/^\s+/)) {
            const spaceCount = line.match(/^(\s*)/)[0].length;  // 先頭のスペースの数を取得
            const content = line.trim();  // スペースを除いた内容
            const indentedContent = `<div class='line' style="padding-left: ${spaceCount * 10}px;">• ${escapeHTML(content)}</div>`;
            return indentedContent;
        }
        // リンクの処理：文の途中に出現するリンクを変換
        else {
            const modifiedLine = line.replace(
                /\[([^\]]+)\s+(https?:\/\/[^\s]+)\]/g,
                (match, text, url) => `<span class="link" onclick="window.open('${url}', '_blank')">${escapeHTML(text)}</span>`
            );
            return `<div class='line'>${modifiedLine}</div>`;
        }
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