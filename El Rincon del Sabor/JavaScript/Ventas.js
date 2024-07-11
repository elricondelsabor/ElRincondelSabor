document.addEventListener('DOMContentLoaded', function() {
    const catalogo = document.getElementById('catalogo');
    const carrito = document.getElementById('carrito');
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
    const comprarBtn = document.getElementById('comprar');

    // Función para agregar un producto al carrito
    function agregarAlCarrito(e) {
        if (e.target.classList.contains('agregarCarrito')) {
            const productoSeleccionado = e.target.parentElement;
            obtenerInfoProducto(productoSeleccionado);
        }
    }

    // Función para obtener la información del producto seleccionado
    function obtenerInfoProducto(producto) {
        const infoProducto = {
            id: producto.dataset.id,
            nombre: producto.dataset.nombre,
            precio: producto.dataset.precio
        };
        agregarProductoAlCarrito(infoProducto);
    }

    // Función para agregar un producto al carrito de compras
    function agregarProductoAlCarrito(producto) {
        const elementoProducto = document.createElement('li');
        elementoProducto.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button class="eliminarProducto" data-id="${producto.id}">Eliminar</button>
        `;
        listaCarrito.appendChild(elementoProducto);
        actualizarTotalCarrito();
    }

    // Función para eliminar un producto del carrito de compras
    function eliminarProductoDelCarrito(e) {
        if (e.target.classList.contains('eliminarProducto')) {
            const productoId = e.target.dataset.id;
            const productoEliminar = document.querySelector(`[data-id="${productoId}"]`);
            productoEliminar.remove();
            actualizarTotalCarrito();
        }
    }

    // Función para actualizar el total del carrito de compras
    function actualizarTotalCarrito() {
        let total = 0;
        const productosCarrito = document.querySelectorAll('#listaCarrito p');
        productosCarrito.forEach(producto => {
            const precio = parseFloat(producto.textContent.split('$')[1]);
            total += precio;
        });
        totalCarrito.textContent = `$${total.toFixed(2)}`;
    }

    // Función para vaciar el carrito de compras
    function vaciarCarrito() {
        while (listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild);
        }
        actualizarTotalCarrito();
    }

    // Función para realizar la compra
    function comprar() {
        if (listaCarrito.children.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de comprar.');
        } else {
            // Aquí puedes agregar la lógica para procesar la compra, como enviar la información del pedido a un servidor, etc.
            alert('Gracias por tu compra.');
            vaciarCarrito();
        }
    }

    // Eventos
    catalogo.addEventListener('click', agregarAlCarrito);
    carrito.addEventListener('click', eliminarProductoDelCarrito);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    comprarBtn.addEventListener('click', comprar);
});
