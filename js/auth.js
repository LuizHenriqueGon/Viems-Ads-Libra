/**
 * @description Função auto-executável para inicializar os usuários padrão.
 * Se nenhum usuário existir no localStorage, cria um 'admin' e um 'user'.
 * Isso garante que o sistema sempre tenha usuários para teste na primeira execução.
 */
(function initializeUsers() {
    if (localStorage.getItem('users') === null) {
        const defaultUsers = [
            { nome: 'admin', senha: 'admin' }, // Usuário Administrador
            { nome: 'user', senha: 'user' }    // Usuário Normal
        ];
        // Salva a lista de usuários no armazenamento local do navegador.
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
})();

/**
 * Adiciona os listeners aos formulários de login e cadastro.
 */
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

/**
 * @description Gerencia o evento de submit do formulário de login.
 * @param {Event} event - O evento de submit do formulário.
 */
function handleLogin(event) {
    event.preventDefault(); // Impede o recarregamento padrão da página.
    const nome = event.target.nome.value;
    const senha = event.target.senha.value;
    const errorMessage = document.getElementById('error-message');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.nome === nome); // Procura o usuário na lista.

    if (user && user.senha === senha) {
        // --- Login bem-sucedido ---
        sessionStorage.setItem('loggedInUser', user.nome); // Salva o nome do usuário na sessão.
        if (user.nome === 'admin') {
            sessionStorage.setItem('isAdmin', 'true'); // Marca a sessão como administrador.
        }
        alert('Login bem-sucedido!');
        window.location.href = 'home.html'; 
    } else {
        // --- Falha no login ---
        errorMessage.textContent = 'Nome de usuário ou senha incorreta.';
        errorMessage.style.display = 'block';
    }
}

/**
 * @description Gerencia o evento de submit do formulário de registro.
 * @param {Event} event - O evento de submit do formulário.
 */
function handleRegister(event) {
    event.preventDefault();
    const nome = event.target.nome.value;
    const senha = event.target.senha.value;
    const errorMessage = document.getElementById('error-message');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Impede que alguém se registre com o nome 'admin'.
    if (nome.toLowerCase() === 'admin') {
        errorMessage.textContent = 'O nome de usuário "admin" é reservado.';
        errorMessage.style.display = 'block';
        return;
    }

    const userExists = users.some(u => u.nome === nome); // Verifica se o usuário já existe.
    if (userExists) {
        errorMessage.textContent = 'Este nome de usuário já está cadastrado.';
        errorMessage.style.display = 'block';
    } else {
        users.push({ nome, senha }); // Adiciona o novo usuário.
        localStorage.setItem('users', JSON.stringify(users)); // Salva a lista atualizada.
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    }
}