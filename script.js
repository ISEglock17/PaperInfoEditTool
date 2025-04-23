const papers = [];

function generateOutput() {
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const citation = document.getElementById('citation').value.replace(new RegExp(title, 'g'), `[${title} ${url}]`);
    const conference = document.getElementById('conference').value;
    const year = document.getElementById('year').value;
    const rank = document.getElementById('rank').value;
    const introducer = document.getElementById('introducer').value;
    const comment1 = document.getElementById('comment1').value;
    const comment2 = document.getElementById('comment2').value;
    const abstract = document.getElementById('abstract').value;
    const tags = document.getElementById('tags').value;

    const output =
`${title}

[**** 紹介者]
#${introducer}

[**** 文献情報]
${citation}

[*** 論文内容]
[**** 概要]
>${abstract}

[**** どんな研究か]

[**** 先行研究と比べてどこがすごいか]

[**** 技術や手法の要点は]

[**** どうやって有効性を検証したか]

[**** 不十分な点や弱点は何か]

[**** 用語解説]

[**** タグ]
#${conference}${year}
${tags}`;

    const plainOutput =
`論文タイトル: ${title}
論文URL: ${url}
引用文: ${citation}
国際会議名: ${conference}
公開年: ${year}
オススメランク: ${rank}
紹介者: ${introducer}
コメント: ${comment1}
コメント2: ${comment2}
概要: ${abstract}
タグ: ${tags}`;
        
    document.getElementById('output').textContent = output;
    document.getElementById('plainOutput').textContent = plainOutput;
}


function addPaperToList() {
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const citation = document.getElementById('citation').value;
    const conference = document.getElementById('conference').value;
    const year = document.getElementById('year').value;
    const rank = document.getElementById('rank').value;
    const introducer = document.getElementById('introducer').value;
    const comment1 = document.getElementById('comment1').value;
    const comment2 = document.getElementById('comment2').value;
    const abstract = document.getElementById('abstract').value;
    const tags = document.getElementById('tags').value;

    const paper = { title, url, citation, conference, year, rank, introducer, comment1, comment2, abstract, tags };
    papers.push(paper);

    const paperList = document.getElementById('paperList');
    const button = document.createElement('button');
    button.textContent = title;
    button.onclick = () => displayPaper(paper);
    paperList.appendChild(button);
}

function clearInputs() {
    const ids = ['title', 'url', 'citation', 'conference', 'year', 'rank', 'introducer', 'comment1', 'comment2', 'abstract', 'tags'];
    ids.forEach(id => document.getElementById(id).value = '');
    document.getElementById('output').textContent = '';
    document.getElementById('plainOutput').textContent = '';
}

function displayPaper(paper) {
    document.getElementById('title').value = paper.title;
    document.getElementById('url').value = paper.url;
    document.getElementById('citation').value = paper.citation;
    document.getElementById('conference').value = paper.conference;
    document.getElementById('year').value = paper.year;
    document.getElementById('rank').value = paper.rank;
    document.getElementById('introducer').value = paper.introducer;
    document.getElementById('comment1').value = paper.comment1;
    document.getElementById('comment2').value = paper.comment2;
    document.getElementById('abstract').value = paper.abstract;
    document.getElementById('tags').value = paper.tags;

    generateOutputFromPaper(paper);  // 出力エリアも更新
    // 編集後にその論文を更新できるようにする
    const saveButton = document.getElementById('saveButton');
    saveButton.onclick = () => saveEditedPaper(paper);
}
        
function generateOutputFromPaper(paper) {
    const citationWithLink = paper.citation.replace(new RegExp(paper.title, 'g'), `[${paper.title} ${paper.url}]`);
    const output = 
`${paper.title}

[**** 紹介者]
#${paper.introducer}

[**** 文献情報]
${citationWithLink}

[*** 論文内容]
[**** 概要]
>${paper.abstract}

[**** どんな研究か]

[**** 先行研究と比べてどこがすごいか]

[**** 技術や手法の要点は]

[**** どうやって有効性を検証したか]

[**** 不十分な点や弱点は何か]

[**** 用語解説]

[**** タグ]
#${paper.conference}${paper.year}
${paper.tags}
`;

    const plainOutput = `
論文タイトル: ${paper.title}
論文URL: ${paper.url}
引用文: ${paper.citation}
国際会議名: ${paper.conference}
公開年: ${paper.year}
オススメランク: ${paper.rank}
紹介者: ${paper.introducer}
コメント: ${paper.comment1}
コメント2: ${paper.comment2}
概要: ${paper.abstract}
タグ: ${paper.tags}
`;
        
    document.getElementById('output').textContent = output;
    document.getElementById('plainOutput').textContent = plainOutput;
}

function saveEditedPaper(originalPaper) {
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const citation = document.getElementById('citation').value;
    const conference = document.getElementById('conference').value;
    const year = document.getElementById('year').value;
    const rank = document.getElementById('rank').value;
    const introducer = document.getElementById('introducer').value;
    const comment1 = document.getElementById('comment1').value;
    const comment2 = document.getElementById('comment2').value;
    const abstract = document.getElementById('abstract').value;
    const tags = document.getElementById('tags').value;

    // 編集した内容で論文を更新
    const updatedPaper = { title, url, citation, conference, year, rank, introducer, comment1, comment2, abstract, tags };
    
    // 論文を元の位置で更新
    const index = papers.indexOf(originalPaper);
    if (index > -1) {
        papers[index] = updatedPaper;
    }

    // リストを再描画
    renderPaperList();
}

function copyToClipboard(inputId) {
    // コピーする対象の入力フィールドを取得
    const inputElement = document.getElementById(inputId);
    
    // 入力フィールドの内容を選択
    inputElement.select();
    inputElement.setSelectionRange(0, 99999); // モバイル端末用

    // コピー操作
    document.execCommand('copy');

    // フィードバックメッセージを表示
    const feedback = document.createElement('span');
    feedback.classList.add('copy-feedback');
    feedback.textContent = 'コピーしました！';
    
    // 入力フィールドの下にフィードバックを追加
    const container = inputElement.closest('.input-container');
    container.appendChild(feedback);

    // 3秒後にフィードバックを非表示にする
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

function copyToClipboard4Info(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('コピーしました');
    });
}

function exportPapers() {
    const dataStr = JSON.stringify(papers, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'papers.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importPapers() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const importedPapers = JSON.parse(e.target.result);
        papers.push(...importedPapers);
        
        // インポート後に論文リストを再描画
        renderPaperList();
    };
    
    reader.readAsText(file);
}


function addPaperToList() {
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const citation = document.getElementById('citation').value;
    const conference = document.getElementById('conference').value;
    const year = document.getElementById('year').value;
    const rank = document.getElementById('rank').value;
    const introducer = document.getElementById('introducer').value;
    const comment1 = document.getElementById('comment1').value;
    const comment2 = document.getElementById('comment2').value;
    const abstract = document.getElementById('abstract').value;
    const tags = document.getElementById('tags').value;

    const paper = { title, url, citation, conference, year, rank, introducer, comment1, comment2, abstract, tags };
    papers.push(paper);

    renderPaperList();  // 新しい表示関数を呼び出す
}

function renderPaperList() {
    const paperList = document.getElementById('paperList');
    paperList.innerHTML = ''; // クリアして再描画

    papers.forEach((paper, index) => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.justifyContent = 'space-between';
        container.style.alignItems = 'center';
        container.style.gap = '10px';

        const button = document.createElement('button');
        button.textContent = paper.title;
        button.onclick = () => displayPaper(paper);  // 論文を選択してフォームに表示
        button.style.flexGrow = '1';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.style.backgroundColor = '#e03131';  // 赤色で削除っぽさを
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '6px';
        deleteBtn.style.padding = '6px 10px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.onclick = () => {
            // 確認ダイアログを出す
            if (confirm(`「${paper.title}」を削除しますか？`)) {
                papers.splice(index, 1);  // 配列から削除
                renderPaperList();       // 一覧を再描画
                clearInputs();           // フォームもリセット
            }
        };

        container.appendChild(button);
        container.appendChild(deleteBtn);
        paperList.appendChild(container);
    });
}



