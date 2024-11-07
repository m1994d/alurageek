document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.getElementById("product-cards");
    const noProductsMessage = document.querySelector(".no-products-message");
    const addProductForm = document.getElementById("addProductForm");

    // Función para obtener productos de json-server
    async function loadProducts() {
        try {
            const response = await fetch("http://localhost:3000/productos");
            const productos = await response.json();

            // Si hay productos, genera las tarjetas
            if (productos.length > 0) {
                noProductsMessage.style.display = "none"; // Oculta el mensaje
                productCards.innerHTML = ''; // Limpiar las tarjetas anteriores
                productos.forEach(producto => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("card");
                    productCard.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
                        <div class="card-info">
                            <h2 class="product-name">${producto.nombre}</h2>
                            <div class="card-footer">
                                <span class="product-price">$${producto.precio.toFixed(2)}</span>
                                <button class="delete-btn" data-id="${producto.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    productCards.appendChild(productCard);
                });
            } else {
                noProductsMessage.style.display = "block"; // Muestra el mensaje si no hay productos
            }
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    }

    // Función para agregar un nuevo producto
    async function addProduct(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const name = document.getElementById("productName").value;
        const price = parseFloat(document.getElementById("productPrice").value);
        const image = document.getElementById("productImage").value;

        const newProduct = {
            nombre: name,
            precio: price,
            imagen: image,
        };

        // Enviar el nuevo producto al servidor
        try {
            const response = await fetch("http://localhost:3000/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });

            // Esperar respuesta y actualizar la lista de productos
            if (response.ok) {
                loadProducts(); // Recargar productos para mostrar el nuevo
            }
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }

        // Limpiar el formulario
        addProductForm.reset();
    }

    // Función para eliminar un producto
    async function deleteProduct(productId) {
        try {
            const response = await fetch(`http://localhost:3000/productos/${productId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                loadProducts(); // Recargar los productos después de eliminar
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

    // Llamar a la función para cargar los productos al inicio
    loadProducts();

    // Agregar evento para enviar el formulario de agregar producto
    addProductForm.addEventListener("submit", addProduct);

    // Delegar el evento de eliminar producto
    productCards.addEventListener("click", function (event) {
        if (event.target.closest(".delete-btn")) {
            const productId = event.target.closest(".delete-btn").dataset.id;
            deleteProduct(productId);
        }
    });
});
