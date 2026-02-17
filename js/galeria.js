 // Array de imágenes de la galería
        const imagenesGaleria = [
            'Cestas de patacon con pimientos amore mio.jpeg',
            'Finicchi in salsa d´arancia.jpeg',
            'Gambas con guacamole.jpeg',
            'Linguine con le vongole.jpeg',
            'Pera en vino con chocolate blanco.jpeg',
            'Portada Chef.jpeg',
            'Ragú a lla napoletana.jpeg',
            'Risotto pomodoro con mozzarella.jpeg',
            'Teja de chocolate.jpeg'
        ];

        // Función para cargar la galería dinámicamente
        function cargarGaleria() {
            const galeríaDiv = document.getElementById('galeria');
            galeríaDiv.innerHTML = '';

            imagenesGaleria.forEach((imagen, index) => {
                const rutaImagen = '../imagenescocina/' + imagen;
                
                const item = document.createElement('a');
                item.href = rutaImagen;
                item.className = 'galeria-item glightbox';
                item.title = imagen.replace('.jpeg', '').replace(/([A-Z])/g, ' $1');
                item.setAttribute('data-gallery', 'galeria');
                
                const img = document.createElement('img');
                img.src = rutaImagen;
                img.alt = imagen.replace('.jpeg', '');
                img.loading = 'lazy';
                
                const overlay = document.createElement('div');
                overlay.className = 'galeria-overlay';
                overlay.innerHTML = '<div class="galeria-icon">🔍</div>';
                
                item.appendChild(img);
                item.appendChild(overlay);
                galeríaDiv.appendChild(item);
            });

            // Inicializar GLightBox
            const lightbox = GLightbox({
                selector: '.glightbox',
                autoplayVideos: false,
                touchNavigation: true,
                zoomable: true,
                draggable: true
            });
        }

        // Cargar la galería cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', cargarGaleria);