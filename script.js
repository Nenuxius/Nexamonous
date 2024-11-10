
function showGame(game) {
    document.getElementById('game-container-2048').style.display = 'none';
    document.getElementById('game-container-ludo').style.display = 'none';
    
    if (game === '2048') {
        document.getElementById('game-container-2048').style.display = 'block';
    } else if (game === 'ludo') {
        document.getElementById('game-container-ludo').style.display = 'block';
    }
}

function openSignup() {
    alert('Sign Up - Feature Under Development');
}

function openLogin() {
    alert('Login - Feature Under Development');
}
