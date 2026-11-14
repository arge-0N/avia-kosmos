document.addEventListener("DOMContentLoaded", () => {
    const achievementsData = {
        'first_step': { title: 'Первый шаг', icon: '🚀' },
        'quiz_master': { title: 'Знаток', icon: '🏆' },
        'ace_pilot': { title: 'Ас пилотирования', icon: '⭐' },
        'engineer': { title: 'Юный конструктор', icon: '🛠️' },
        'reader': { title: 'Читатель', icon: '📚' }
    };

    window.unlockAchievement = function(id) {
        let unlocked = JSON.parse(localStorage.getItem('achievements') || '[]');
        if (!unlocked.includes(id)) {
            unlocked.push(id);
            localStorage.setItem('achievements', JSON.stringify(unlocked));
            
            const notif = document.createElement('div');
            notif.style.cssText = 'position:fixed; bottom:20px; right:20px; background:var(--card-bg); border:2px solid var(--accent); border-radius:12px; padding:15px 25px; display:flex; align-items:center; gap:15px; z-index:9999; box-shadow:0 10px 30px rgba(0,0,0,0.5); transform: translateX(150%); transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);';
            notif.innerHTML = `<div style="font-size:2.5rem;">${achievementsData[id].icon}</div>
                               <div><div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Получено достижение!</div>
                               <div style="font-weight:bold; color:var(--accent); font-size:1.2rem;">${achievementsData[id].title}</div></div>`;
            document.body.appendChild(notif);
            
            setTimeout(() => notif.style.transform = 'translateX(0)', 100);
            setTimeout(() => { notif.style.transform = 'translateX(150%)'; setTimeout(() => notif.remove(), 500); }, 4000);
        }
    };

    // Логика чтения статей
    if (window.location.pathname.includes('/articles/')) {
        let readArticles = JSON.parse(localStorage.getItem('readArticles') || '[]');
        let articleName = window.location.pathname.split('/').pop();
        if (!readArticles.includes(articleName)) {
            readArticles.push(articleName);
            localStorage.setItem('readArticles', JSON.stringify(readArticles));
        }
        if (readArticles.length >= 3) setTimeout(() => window.unlockAchievement('reader'), 1000);
    }
});// Автоматическая выдача достижения за посещение игровой зоны
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('games.html')) {
        let unlocked = JSON.parse(localStorage.getItem('unlocked_achievements')) || [];
        if (!unlocked.includes('games_visited')) {
            unlocked.push('games_visited');
            localStorage.setItem('unlocked_achievements', JSON.stringify(unlocked));
            console.log('Достижение "В игровой зоне" получено!');
            if (window.mascotSpeak) window.mascotSpeak("Ура! Ты зашел в игровую зону! Достижение получено! 🎮");
        }
    }
});
