const urlParams = new URLSearchParams(window.location.search);
const bag = JSON.parse(urlParams.get('bag'));
const winnigs = document.getElementById('winnings');
winnigs.textContent = `You won $${bag.value}!`;

const button = document.getElementById('goBack');
button.addEventListener('click', function(e) {
    window.location.href = 'game.html';
    });
