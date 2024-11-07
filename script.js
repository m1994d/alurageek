// Importe las funciones que necesite de los SDK que necesite
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.getElementById("product-cards");
    const noProductsMessage = document.querySelector(".no-products-message");
    const addProductForm = document.getElementById("addProductForm");


    // https://firebase.google.com/docs/web/setup#available-libraries

    // Configuración Firebase de su aplicación web
    // Para Firebase JS SDK v7.20.0 y posteriores, measurementId es opcional
    const firebaseConfig = {
        apiKey: "AIzaSyA6qhpKX8ekqJNtwzOJhrVv1daglBSQA-E",
        authDomain: "alurageek-aaf6d.firebaseapp.com",
        projectId: "alurageek-aaf6d",
        storageBucket: "alurageek-aaf6d.firebasestorage.app",
        messagingSenderId: "337392668228",
        appId: "1:337392668228:web:712bbd17d205e07779b611",
        measurementId: "G-0D0Q9VVHS9"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // Función para obtener productos de json-server
    async function loadProducts() {
        try {
            const response = await fetch("https://alurageek-aaf6d-default-rtdb.firebaseio.com");
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
    const addProduct = (product) => {
        db.ref('productos').push(product);
    };
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
            const response = await fetch("https://alurageek-aaf6d-default-rtdb.firebaseio.com", {
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

    db.ref('productos').on('value', (snapshot) => {
        const products = snapshot.val();
        // Actualiza la interfaz aquí
    });

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

    const deleteProduct = (id) => {
        db.ref('productos/' + id).remove();
    };


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
