

const changeThemeBtn = document.querySelector('#change-theme');

//Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark');
}

//Carregar light ou dark mode
function loadTheme() {
    const darkMode = localStorage.getItem('dark');

    if(darkMode) {
        toggleDarkMode();
    }
}

loadTheme();

changeThemeBtn.addEventListener('change', function() {
    toggleDarkMode()

    //Salvar ou remover dark mode
    localStorage.removeItem('dark');

    if(document.body.classList.contains('dark')) {
        localStorage.setItem('dark', 1);
    }    
});