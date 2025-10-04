document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-word-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const novaPalavra = {
            titulo: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            icone: document.getElementById('icone').value,
            descSinal: document.getElementById('desc-sinal').value,
            movimentacao: document.getElementById('movimentacao').value,
            video: document.getElementById('video').value,
            disciplina: document.getElementById('disciplina').value,
            semestre: document.getElementById('semestre').value
        };

        let palavras = JSON.parse(localStorage.getItem('glossarioPalavras')) || [];
        palavras.push(novaPalavra);
        localStorage.setItem('glossarioPalavras', JSON.stringify(palavras));

        alert('Palavra adicionada com sucesso!');
        form.reset();
    });
});