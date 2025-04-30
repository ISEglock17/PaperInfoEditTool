// parser.js

function parseCosence(text) {
    const lines = text.split('\n');
    const html = lines.map(line => {
      if (line.startsWith('[****')) {
        return `<strong class="line strong level-4">${line.replace(/^\[\*\*\*\* /, '').replace(/\]$/, '')}</strong>`;
      } else if (line.startsWith('[***')) {
        return `<strong class="line strong level-3">${line.replace(/^\[\*\*\* /, '').replace(/\]$/, '')}</strong>`;
      } else if (line.startsWith('>')) {
        return `<blockquote>${line.slice(1).trim()}</blockquote>`;
      } else if (line.match(/^\s*・/)) {
        return `<ul><li>${line.replace(/^\s*・\s*/, '')}</li></ul>`;
      } else if (line.match(/^\s*\-\s+/)) {
        return `<ul><li>${line.replace(/^\s*-\s+/, '')}</li></ul>`;
      } else if (line.match(/^#\S+/)) {
        return `<span class="hashtag">${line.trim()}</span>`;
      } else if (line.match(/^\[(.*?) (https?:\/\/\S+?)\]$/)) {
        const match = line.match(/^\[(.*?) (https?:\/\/\S+?)\]$/);
        return `<a href="${match[2]}" target="_blank">${match[1]}</a>`;
      } else if (line.match(/^\[(.*?)\]$/)) {
        return `<div class="bracket-block">${line.replace(/^\[(.*?)\]$/, '<span>$1</span>')}</div>`;
      } else if (line.trim() === '') {
        return '<br>';
      } else {
        return `<div>${line}</div>`;
      }
    });
    return html.join('\n');
  }
  
  document.getElementById('editor').addEventListener('input', () => {
    const inputText = document.getElementById('editor').innerText;
    const output = parseCosence(inputText);
    document.getElementById('preview').innerHTML = output;
  });