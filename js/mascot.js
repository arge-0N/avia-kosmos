document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mascotRoot')) return;

    const mascot = document.createElement('div');
    mascot.className = 'mascot-container';
    mascot.id = 'mascotRoot';
    
    // ЖЕСТКО ЗАДАЕМ ПОЗИЦИЮ, ЧТОБЫ НИКАКОЙ CSS НЕ МОГ ЕГО СДВИНУТЬ
    mascot.style.position = 'fixed';
    mascot.style.bottom = '40px';
    mascot.style.left = '20px';
    mascot.style.zIndex = '999999';
    
    const isSubfolder = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/articles/');
    const basePath = isSubfolder ? '../' : '';

    mascot.innerHTML = `
        <div class="mascot-bubble" id="mascotBubble" style="display:none; position:absolute; bottom:100%; left:0; background:rgba(15,23,42,0.95); border:2px solid var(--accent); color:#fff; padding:15px; border-radius:15px; width:280px; font-size:0.9rem; box-shadow:0 10px 25px rgba(0,0,0,0.8); margin-bottom:15px;">
            <div id="bubbleText">Гав! Привет!</div>
        </div>
        <div class="mascot-avatar"><img src="${basePath}img/maskot.png" alt="Белка и Стрелка" style="width: clamp(100px, 10vw, 180px); height: auto; display: block; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6)); transition: transform 0.3s;"></div>
    `;
    
    document.body.appendChild(mascot);

    const bubble = document.getElementById('mascotBubble');
    const bubbleText = document.getElementById('bubbleText');
    
    // Показ пузыря
    function showBubble(text) {
        bubbleText.innerHTML = text;
        bubble.style.display = 'block';
        clearTimeout(window.mascotMsgTimeout);
        window.mascotMsgTimeout = setTimeout(() => {
            bubble.style.display = 'none';
        }, 5000);
    }

    // Наведение и клик
    const avatar = mascot.querySelector('.mascot-avatar');
    avatar.addEventListener('mouseenter', () => { avatar.style.transform = 'scale(1.1) rotate(5deg)'; });
    avatar.addEventListener('mouseleave', () => { avatar.style.transform = 'scale(1) rotate(0deg)'; });

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