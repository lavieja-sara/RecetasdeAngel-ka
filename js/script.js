

    
    let carrito = [];

   //elementos del DOM para el carrito de compras
    const selectorProducto = document.getElementById('producto');
    const botonAniadirCarrito = document.getElementById('agregar-carrito');
    const contenedorArticulosCarrito = document.getElementById('contenedor-carrito');
    
   //evento para agregar al carrito
    botonAniadirCarrito.addEventListener('click', () => {
        const productoSeleccionado = selectorProducto.options[selectorProducto.selectedIndex]
        const valorseleccionado = productoSeleccionado.value

        if(!valorseleccionado){
            alert(`selecciona un producto valido`)
            return
        }
        const [nombre, precioProducto] = valorseleccionado.split(':')
        const precio = parseFloat(precioProducto)

// Agregar el producto al carrito

        carrito.push({ nombre: nombre, precio })

       actualizarCarrito()

    })

   //actualizar el carrito
        function actualizarCarrito(){
            //limpiarcontenido previo
        contenedorArticulosCarrito.innerHTML = ''

        let totalCarrito = 0

        //mostrar productos
        carrito.forEach((producto, index) => {
            totalCarrito += producto.precio


            const articulosCarrito = document.createElement('div')
            articulosCarrito.classList.add('articulos-carrito')
            articulosCarrito.innerHTML = `
                ${producto.nombre} - ${producto.precio.toFixed(2)}
                <button>Eliminar</button>
                `


           contenedorArticulosCarrito.appendChild(articulosCarrito) 
        })

    }

    //calcuar y mostrar el total del carrito



    




    