document.addEventListener("DOMContentLoaded", function() {
    const disciplinasData = {
        'todas': {
            titulo: 'Listar Todas as Palavras',
            icone: 'https://img.icons8.com/plasticine/100/checklist.png',
            descricao: 'Veja a lista completa de todos os termos técnicos disponíveis no nosso glossário, sem filtros por disciplina.'
        },
        'banco-de-dados': {
            titulo: 'Banco de Dados',
            icone: 'https://img.icons8.com/plasticine/100/database.png',
            descricao: 'Bancos de dados ou bases de dados são conjuntos de arquivos relacionados entre si, podendo conter registros sobre pessoas, lugares ou informações em geral.'
        },
        'programacao': {
            titulo: 'Programação',
            icone: 'https://img.icons8.com/plasticine/100/source-code.png',
            descricao: 'A programação é o processo de escrita, teste e manutenção de um programa de computador.'
        },
        'desenvolvimento-web': {
            titulo: 'Desenvolvimento Web',
            icone: 'https://img.icons8.com/plasticine/100/monitor.png',
            descricao: 'Refere-se à codificação e programação que permite a funcionalidade de um site, de acordo com os requisitos do proprietário.'
        },
        'poo': {
            titulo: 'Programação Orientada a Objetos',
            icone: 'https://img.icons8.com/plasticine/100/code-fork.png',
            descricao: 'É um paradigma de programação baseado no conceito de "objetos", que podem conter dados e código.'
        }
    };

    const disciplinaCards = document.querySelectorAll('.disciplina-card');
    const modal = document.getElementById('disciplina-modal');
    if (!modal) return; // Se não estiver na página do glossário, para o script

    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalDescription = document.getElementById('modal-description');
    
    disciplinaCards.forEach(card => {
        card.addEventListener('click', function(event) {
            event.preventDefault(); 
            const disciplinaKey = this.dataset.disciplina;
            const data = disciplinasData[disciplinaKey];

            modalTitle.textContent = data.titulo;
            modalIcon.src = data.icone;
            modalDescription.textContent = data.descricao;
            
            modal.style.display = 'flex';
        });
    });

    const mainModalButton = document.querySelector('.btn-ver-palavras');
    const xCloseButton = document.querySelector('.close-button');

    mainModalButton.addEventListener('click', function() {
        window.location.href = 'listagem.html';
    });

    xCloseButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});