// Carrito en localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Añadir productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const product = {
            id: productCard.getAttribute('data-id'),
            name: productCard.querySelector('h3').textContent,
            price: productCard.querySelector('.price').textContent,
            image: productCard.querySelector('img').src
        };
        cart.push(product);
        updateCart();
    });
});

// Función para eliminar productos
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Actualizar carrito (modifica esta función)
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').textContent = cart.length;

    if (document.getElementById('cart-items')) {
        let total = 0;
        let cartHTML = '';

        cart.forEach(item => {
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">🗑️ Eliminar</button>
                </div>
            `;
            total += parseFloat(item.price.replace('$', ''));
        });

        document.getElementById('cart-items').innerHTML = cartHTML || '<p class="empty-cart">Tu carrito está vacío</p>';
        document.getElementById('total-price').textContent = `$${total.toFixed(2)} MXN`;

        // Agregar event listeners a los nuevos botones
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                removeItem(e.target.getAttribute('data-id'));
            });
        });
    }
}

// Inicializar
updateCart();