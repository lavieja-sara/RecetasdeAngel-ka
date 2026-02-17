// Script para cargar noticias desde JSON
document.addEventListener('DOMContentLoaded', function() {
    cargarNoticias();
});

function cargarNoticias() {
    fetch('./data/noticias.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las noticias');
            }
            return response.json();
        })
        .then(data => {
            mostrarNoticias(data.noticias);
        })
        .catch(error => {
            console.error('Error:', error);
            const contenedor = document.getElementById('news-container');
            contenedor.innerHTML = '<p class="error">No se pudieron cargar las noticias en este momento.</p>';
        });
}

function mostrarNoticias(noticias) {
    const contenedor = document.getElementById('news-container');
    contenedor.innerHTML = ''; 

    if (noticias.length === 0) {
        contenedor.innerHTML = '<p>No hay noticias disponibles.</p>';
        return;
    }

    noticias.forEach(noticia => {
        const articuloNoticia = document.createElement('article');
        articuloNoticia.classList.add('news-card');
        
      
        articuloNoticia.innerHTML = `
            <div class="news-header">
                <span class="news-category">${noticia.categoria}</span>
                <span class="news-date">${noticia.fecha}</span>
            </div>
            <div class="news-content">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
            </div>
            <div class="news-footer">
                <a href="#" class="read-more">Leer más →</a>
            </div>
        `;
        
        contenedor.appendChild(articuloNoticia);
    });
}
