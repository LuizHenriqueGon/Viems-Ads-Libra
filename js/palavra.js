document.addEventListener('DOMContentLoaded', function() {
    
    const params = new URLSearchParams(window.location.search);
    const palavraTitulo = params.get('palavra');

    const todasAsPalavras = JSON.parse(localStorage.getItem('glossarioPalavras')) || [];

    const palavra = todasAsPalavras.find(p => p.titulo === palavraTitulo);

    if (palavra) {
        document.getElementById('palavra-titulo').textContent = palavra.titulo.toUpperCase();
        document.getElementById('palavra-icone').src = palavra.icone;
        document.getElementById('palavra-descricao').textContent = palavra.descricao;
        document.getElementById('palavra-video').src = palavra.video;
        document.getElementById('palavra-desc-sinal').textContent = palavra.descSinal;
        document.getElementById('palavra-disciplina').textContent = palavra.disciplina;
        document.getElementById('palavra-semestre').textContent = palavra.semestre;
    } else {
        document.querySelector('.word-detail-page').innerHTML = '<h1>Palavra não encontrada.</h1>';
    }

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const targetContent = document.querySelector(button.dataset.target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});