document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mascotRoot')) return;

    const isSubfolder = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/articles/');
    const basePath = isSubfolder ? '../' : '';

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'mascotToggleBtn';
    toggleBtn.innerHTML = '🐾';
    toggleBtn.style.cssText = 'position: fixed !important; bottom: 20px !important; left: 20px !important; z-index: 999999 !important; width: 60px; height: 60px; border-radius: 50%; background: var(--primary); border: 3px solid #fff; font-size: 28px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; transition: transform 0.2s;';
    toggleBtn.onmouseenter = () => toggleBtn.style.transform = 'scale(1.1) rotate(10deg)';
    toggleBtn.onmouseleave = () => toggleBtn.style.transform = 'scale(1) rotate(0deg)';
    document.body.appendChild(toggleBtn);

    const mascot = document.createElement('div');
    mascot.id = 'mascotRoot';
    mascot.style.cssText = 'display: none; position: fixed !important; bottom: 90px !important; left: 20px !important; z-index: 999999 !important;';
    
    mascot.innerHTML = `
        <div id="mascotBubble" style="display:none; position:absolute; bottom:100%; left:0; background:rgba(15,23,42,0.98); border:2px solid var(--secondary); color:#fff; padding:20px; border-radius:15px; width:280px; font-size:0.95rem; font-weight:600; box-shadow:0 10px 25px rgba(0,0,0,0.8); margin-bottom:15px; font-family:'Nunito', sans-serif;">
            <div id="bubbleText" style="margin-bottom: 10px;"></div>
            <button id="repeatTourBtn" style="display:none; background:var(--secondary); color:#000; border:none; padding:8px; border-radius:10px; font-weight:800; cursor:pointer; width:100%;">Пройти обучение заново</button>
        </div>
        <div class="mascot-avatar">
            <img src="${basePath}img/maskot.png" alt="Белка и Стрелка" style="width: 250px !important; height: auto !important; display: block !important; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.6)); transition: transform 0.3s; cursor: pointer;">
        </div>
    `;
    document.body.appendChild(mascot);

    const bubble = document.getElementById('mascotBubble');
    const bubbleText = document.getElementById('bubbleText');
    const repeatBtn = document.getElementById('repeatTourBtn');
    const img = mascot.querySelector('img');
    
    let isVisible = false;
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isVisible = !isVisible;
        mascot.style.display = isVisible ? 'block' : 'none';
        if (isVisible && bubble.style.display === 'none') {
            window.mascotSpeak("Гав! Нажми на нас!");
        }
    });

    window.mascotSpeak = function(text, duration = 5000, showRepeat = false) {
        bubbleText.innerHTML = text;
        bubble.style.display = 'block';
        repeatBtn.style.display = showRepeat ? 'block' : 'none';
        clearTimeout(window.mascotMsgTimeout);
        if (!showRepeat) {
            window.mascotMsgTimeout = setTimeout(() => { bubble.style.display = 'none'; }, duration);
        }
    };

    repeatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        localStorage.removeItem('mascotTourDone');
        window.location.reload();
    });

    img.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.05) rotate(5deg)'; });
    img.addEventListener('mouseleave', () => { img.style.transform = 'scale(1) rotate(0deg)'; });

    mascot.addEventListener('click', (e) => {
        e.stopPropagation();
        const facts = ["Мы — Белка и Стрелка! Первыми слетали в космос!", "В космосе космонавты вырастают на 5 см!", "Гагарин сказал «Поехали!»", "Скафандр весит 100 кг!"];
        // Добавили кнопку "Пройти тур заново"
        window.mascotSpeak(facts[Math.floor(Math.random() * facts.length)], 0, true);
    });

    // Простой тур по страницам
    if (!localStorage.getItem('mascotTourDone')) {
        setTimeout(() => {
            window.mascotSpeak("Привет! Я помогу тебе освоиться. Нажимай на кнопки в меню, чтобы читать и играть! А если забудешь, нажми на меня внизу слева.", 8000);
            localStorage.setItem('mascotTourDone', 'true');
        }, 1500);
    }
});