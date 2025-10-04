document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * @description Uma lista de palavras iniciais para popular o glossário na primeira vez.
     * @type {Array<Object>}
     */
    const palavrasIniciais = [
        {
            titulo: 'Python',
            descricao: 'É uma linguagem de programação amplamente usada em aplicações da Web, desenvolvimento de software, ciência de dados e machine learning (ML)',
            icone: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
            descSinal: 'Dedo médio, dedo indicador e dedo polegar flexionados. Encostar o dedo indicador da mão direita no polegar da mão esquerda.',
            video: 'https://via.placeholder.com/400x300.png?text=Vídeo+LIBRAS',
            disciplina: 'Programação Orientada a Objetos',
            semestre: '2º Semestre'
        },
        // ... (outras palavras)
    ];

    // Tenta carregar as palavras do localStorage. Se não houver, usa a lista inicial.
    let todasAsPalavras = JSON.parse(localStorage.getItem('glossarioPalavras'));
    if (!todasAsPalavras || todasAsPalavras.length === 0) {
        todasAsPalavras = palavrasIniciais;
        localStorage.setItem('glossarioPalavras', JSON.stringify(todasAsPalavras));
    }

    const searchInput = document.getElementById('search-input');
    const wordListContainer = document.getElementById('word-list');
    const notFoundMessage = document.getElementById('not-found-message');

    /**
     * @description Renderiza uma lista de palavras na tela.
     * @param {Array<Object>} palavras - A lista de palavras a ser exibida.
     */
    function renderizarPalavras(palavras) {
        wordListContainer.innerHTML = '';
        if (palavras.length === 0) { return; }

        palavras.forEach(palavra => {
            const wordItemHTML = `
                <div class="word-item">
                    <div class="word-info">
                        <h3>Palavra: ${palavra.titulo}</h3>
                        <p><strong>Descrição da Palavra:</strong> ${palavra.descricao}</p>
                    </div>
                    <div class="word-action">
                        <a href="palavra.html?palavra=${encodeURIComponent(palavra.titulo)}" class="btn-ver-mais">Ver Mais</a>
                    </div>
                </div>
            `;
            wordListContainer.innerHTML += wordItemHTML;
        });
    }

    /**
     * Adiciona um listener ao campo de busca que filtra as palavras em tempo real.
     */
    searchInput.addEventListener('keyup', function(event) {
        const termoPesquisado = event.target.value.toLowerCase();
        
        // Filtra o array de palavras com base no termo pesquisado.
        const palavrasFiltradas = todasAsPalavras.filter(palavra => {
            return palavra.titulo.toLowerCase().includes(termoPesquisado) ||
                   palavra.descricao.toLowerCase().includes(termoPesquisado);
        });

        renderizarPalavras(palavrasFiltradas);

        // Mostra a mensagem "Palavra não encontrada!" se o resultado da busca for vazio.
        notFoundMessage.style.display = (palavrasFiltradas.length === 0 && termoPesquisado !== '') ? 'block' : 'none';
    });

    // Renderiza todas as palavras quando a página é carregada pela primeira vez.
    renderizarPalavras(todasAsPalavras);
});