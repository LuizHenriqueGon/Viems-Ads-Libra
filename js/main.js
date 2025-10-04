/**
 * Adiciona os event listeners principais assim que o conteúdo do HTML é carregado.
 */
document.addEventListener("DOMContentLoaded", function() {
    // --- Lógica do menu hamburger para dispositivos móveis ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');

    /**
     * Alterna a classe 'active' no menu de navegação quando o botão hamburger é clicado,
     * mostrando ou escondendo o menu em telas pequenas.
     */
    hamburgerBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // --- Funções de inicialização ---
    updateHeader(); // Atualiza o cabeçalho para refletir o status de login.
    setActiveNavLink(); // Marca o link da página atual como ativo.
});

/**
 * @description Verifica se o usuário está logado (usando sessionStorage) e atualiza o cabeçalho.
 * Mostra o ícone de perfil e o link de admin (se aplicável) para usuários logados.
 * Mostra o link de "Login" para usuários não logados.
 */
function updateHeader() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const isAdmin = sessionStorage.getItem('isAdmin');
    
    const loginLink = document.getElementById('login-link');
    const userIconLink = document.getElementById('user-icon-link');
    const adminLink = document.getElementById('admin-link');

    if (loggedInUser) {
        // --- Cenário: Usuário está logado ---
        loginLink.style.display = 'none';
        userIconLink.style.display = 'flex';

        // Mostra o link "Admin" se o usuário for administrador.
        if (isAdmin) {
            adminLink.style.display = 'block';
        }

        // Adiciona a funcionalidade de logout ao ícone do usuário.
        userIconLink.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o link navegue.
            sessionStorage.removeItem('loggedInUser'); // Limpa o usuário da sessão.
            sessionStorage.removeItem('isAdmin'); // Limpa o status de admin.
            alert('Você foi desconectado.');
            window.location.href = 'login.html'; // Redireciona para a página de login.
        });

    } else {
        // --- Cenário: Usuário não está logado ---
        loginLink.style.display = 'block';
        userIconLink.style.display = 'none';
        if(adminLink) adminLink.style.display = 'none'; // Garante que o link de admin esteja escondido.
    }
}

/**
 * @description Destaca o link de navegação correspondente à página atual.
 * Adiciona a classe '.active' ao link da página visitada para aplicar o estilo (negrito e linha).
 */
function setActiveNavLink() {
    // Pega o nome do arquivo da URL atual (ex: "home.html").
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === '') return; // Sai da função se estiver na raiz do site para evitar erros.

    const navLinks = document.querySelectorAll('.main-nav ul li a');

    // Itera sobre todos os links do menu.
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();
        link.classList.remove('active'); // Remove a classe de todos para limpar.
        if (linkPage === currentPage) {
            link.classList.add('active'); // Adiciona a classe apenas ao link da página atual.
        }
    });
}