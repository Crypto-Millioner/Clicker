// Инициализация переменных
let balance = 0;
let coinsPerClick = 1;
let lastBonusTime = localStorage.getItem('lastBonusTime') || 0;
const bonusInterval = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

// Получаем элементы DOM
const balanceDisplay = document.getElementById('balance');
const clickerButton = document.getElementById('clicker');
const bonusButton = document.getElementById('bonus');
const upgradeButton = document.getElementById('upgrade');
const progressBar = document.getElementById('progress');
const leaderboard = document.getElementById('leaderboard');
const referralList = document.getElementById('referrals');
const generateReferralLinkButton = document.getElementById('generateReferralLink');
const referralLinkInput = document.getElementById('referralLink');

// Сохранение прогресса в localStorage
function saveProgress() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('lastBonusTime', lastBonusTime);
    updateLeaderboard();
}

// Загрузка прогресса из localStorage
function loadProgress() {
    balance = parseInt(localStorage.getItem('balance') || 0);
    coinsPerClick = parseInt(localStorage.getItem('coinsPerClick') || 1);
    lastBonusTime = parseInt(localStorage.getItem('lastBonusTime') || 0);
    balanceDisplay.textContent = balance;
    updateProgressBar();
}

// Логика для ежедневного бонуса
bonusButton.addEventListener('click', () => {
    const currentTime = Date.now();
    if (currentTime - lastBonusTime >= bonusInterval) {
        const bonusAmount = 100; // Сумма бонуса
        balance += bonusAmount;
        lastBonusTime = currentTime;
        balanceDisplay.textContent = balance;
        saveProgress();
    } else {
        alert('You have already collected your daily bonus.');
    }
});

// Логика клика
clickerButton.addEventListener('click', () => {
    balance += coinsPerClick;
    balanceDisplay.textContent = balance;
    saveProgress();
    updateProgressBar();
});

// Логика улучшения
upgradeButton.addEventListener('click', () => {
    if (balance >= 100) { // Стоимость улучшения
        balance -= 100;
        coinsPerClick += 1;
        balanceDisplay.textContent = balance;
        saveProgress();
    }
});

// Отображение прогресса
function updateProgressBar() {
    const progress = (balance % 100) / 100 * 100; // Прогресс по достижению следующего уровня
    progressBar.style.width = progress + '%';
}

// Логика лидерборда
function updateLeaderboard() {
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboardData.sort((a, b) => b.score - a.score); // Сортировка по убыванию баланса
    leaderboard.innerHTML = '';
    leaderboardData.forEach((entry, index) => {
        const listItem = document.createElement('li');
        `listItem.textContent = #${index + 1} - ${entry.name}: ${entry.score} coins`;
        leaderboard.appendChild(listItem);
    });
}

// Логика реферальной программы
function updateReferrals() {
    const referrals = JSON.parse(localStorage.getItem('referrals') || '[]');
    referralList.innerHTML = '';
    referrals.forEach(referral => {
        const listItem = document.createElement('li');
        `listItem.textContent = Referral: ${referral.name}`;
        referralList.appendChild(listItem);
    });
}

// Генерация уникальной реферальной ссылки
generateReferralLinkButton.addEventListener('click', () => {
    `const referralLink = http://example.com?ref=${encodeURIComponent('user123')}`;
    referralLinkInput.value = referralLink; // Здесь можно использовать динамическую генерацию ссылки для пользователя
});

// Инициализация
loadProgress();
updateLeaderboard();
updateReferrals();