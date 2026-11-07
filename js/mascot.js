document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mascotRoot')) return;

    const isSubfolder = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/articles/');
    const basePath = isSubfolder ? '../' : '';

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'mascotToggleBtn';
    toggleBtn.innerHTML = '🐾';
    toggleBtn.title = 'Позвать Белку и Стрелку';
    toggleBtn.style.cssText = 'position: fixed !important; bottom: 20px !important; left: 20px !important; z-index: 999999 !important; width: 50px; height: 50px; border-radius: 50%; background: var(--accent); border: 2px solid #fff; font-size: 24px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; transition: transform 0.2s;';
    toggleBtn.onmouseenter = () => toggleBtn.style.transform = 'scale(1.1)';
    toggleBtn.onmouseleave = () => toggleBtn.style.transform = 'scale(1)';
    document.body.appendChild(toggleBtn);

    const mascot = document.createElement('div');
    mascot.className = 'mascot-container';
    mascot.id = 'mascotRoot';
    mascot.style.cssText = 'display: none; position: fixed !important; bottom: 80px !important; left: 20px !important; z-index: 999999 !important;';

    mascot.innerHTML = `
        <div class="mascot-bubble" id="mascotBubble" style="display:none; position:absolute; bottom:100%; left:0; background:rgba(15,23,42,0.95); border:2px solid var(--accent); color:#fff; padding:15px; border-radius:15px; width:250px; font-size:0.9rem; box-shadow:0 10px 25px rgba(0,0,0,0.8); margin-bottom:15px;">
            <div id="bubbleText">Гав! Привет!</div>
        </div>
        <div class="mascot-avatar">
            <img src="${basePath}img/maskot.png" alt="Белка и Стрелка" style="width: 250px !important; max-width: 250px !important; height: auto !important; display: block !important; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6)); transition: transform 0.3s; cursor: pointer;">
        </div>
    `;
    document.body.appendChild(mascot);

    const bubble = document.getElementById('mascotBubble');
    const bubbleText = document.getElementById('bubbleText');
    const img = mascot.querySelector('img');
    
    let isVisible = false;
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isVisible = !isVisible;
        if (isVisible) {
            mascot.style.display = 'block';
            bubbleText.innerHTML = "Гав! Мы тут! Нажми на нас, чтобы узнать факт!";
            bubble.style.display = 'block';
            clearTimeout(window.mascotMsgTimeout);
            window.mascotMsgTimeout = setTimeout(() => { bubble.style.display = 'none'; }, 3000);
        } else {
            mascot.style.display = 'none';
        }
    });

    window.mascotSpeak = function(text, duration = 5000) {
        bubbleText.innerHTML = text;
        bubble.style.display = 'block';
        clearTimeout(window.mascotMsgTimeout);
        window.mascotMsgTimeout = setTimeout(() => { bubble.style.display = 'none'; }, duration);
    };

    img.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.05) rotate(5deg)'; });
    img.addEventListener('mouseleave', () => { img.style.transform = 'scale(1) rotate(0deg)'; });

    mascot.addEventListener('click', (e) => {
        e.stopPropagation();
        const facts = ["Мы — Белка и Стрелка! Первыми слетали в космос!", "В космосе космонавты вырастают на 5 см!", "Гагарин сказал «Поехали!»", "Скафандр весит 100 кг!"];
        window.mascotSpeak(facts[Math.floor(Math.random() * facts.length)]);
    });

    setTimeout(() => {
        const regex = /(Белка|Стрелка|Белки|Стрелки|собак[аи]|собаки)/gi;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => (['SCRIPT', 'STYLE', 'A', 'BUTTON', 'SPAN'].includes(node.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
        });
        let node; const nodes = [];
        while (node = walker.nextNode()) { if (node.nodeValue.match(regex)) nodes.push(node); }
        nodes.forEach(textNode => {
            const span = document.createElement('span');
            span.innerHTML = textNode.nodeValue.replace(regex, match => `<span class="mascot-mention" style="cursor:pointer; color:var(--accent); border-bottom:1px dashed var(--accent);">${match}</span>`);
            textNode.parentNode.replaceChild(span, textNode);
        });
    }, 1000);

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('mascot-mention')) {
            window.mascotSpeak("Гав! Это мы! Мы очень рады, что ты читаешь про нас! 🐶");
        }
    });
});