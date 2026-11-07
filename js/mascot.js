document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mascotRoot')) return;

    const mascot = document.createElement('div');
    mascot.className = 'mascot-container';
    mascot.id = 'mascotRoot';
    
    // Жестко фиксируем контейнер
    mascot.style.cssText = 'position: fixed !important; bottom: 30px !important; left: 20px !important; z-index: 999999 !important; width: 120px !important;';
    
    const isSubfolder = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/articles/');
    const basePath = isSubfolder ? '../' : '';

    mascot.innerHTML = `
        <div class="mascot-bubble" id="mascotBubble" style="display:none; position:absolute; bottom:100%; left:0; background:rgba(15,23,42,0.95); border:2px solid var(--accent); color:#fff; padding:15px; border-radius:15px; width:250px; font-size:0.9rem; box-shadow:0 10px 25px rgba(0,0,0,0.8); margin-bottom:15px;">
            <div id="bubbleText">Гав! Привет!</div>
        </div>
        <div class="mascot-avatar">
            <img src="${basePath}img/maskot.png" alt="Белка и Стрелка" style="width: 100% !important; max-width: 120px !important; height: auto !important; max-height: 120px !important; object-fit: contain !important; display: block !important; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6)); transition: transform 0.3s; cursor: pointer;">
        </div>
    `;
    
    document.body.appendChild(mascot);

    const bubble = document.getElementById('mascotBubble');
    const bubbleText = document.getElementById('bubbleText');
    const img = mascot.querySelector('img');
    
    function showBubble(text) {
        bubbleText.innerHTML = text;
        bubble.style.display = 'block';
        clearTimeout(window.mascotMsgTimeout);
        window.mascotMsgTimeout = setTimeout(() => {
            bubble.style.display = 'none';
        }, 5000);
    }

    img.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.1) rotate(5deg)'; });
    img.addEventListener('mouseleave', () => { img.style.transform = 'scale(1) rotate(0deg)'; });

    mascot.addEventListener('click', () => {
        const facts = [
            "Мы — Белка и Стрелка! Первыми слетали в космос!",
            "В космосе космонавты вырастают на 5 см!",
            "Гагарин сказал «Поехали!»",
            "Скафандр весит 100 кг!"
        ];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        showBubble(randomFact);
    });
});