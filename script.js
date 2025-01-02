document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 },
    ];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Initialize cart from localStorage if available, or as an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Dynamically generate the product list
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("Product");
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(productDiv);
    });

    // Event listener for adding products to the cart
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    // Add product to the cart array and render the updated cart
    function addToCart(product) {
        cart.push(product);
        saveCart();
        renderCart();
    }

    // Render the cart items and update total price
    function renderCart() {
        cartItems.innerHTML = ""; // Clear the previous cart items

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");

            let total = 0;

            cart.forEach((item, index) => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                cartItemDiv.innerHTML = `
                    <div class="cart-item-details">
                        ${item.name} - $${item.price.toFixed(2)}
                    </div>
                    <div class="cart-item-remove">
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItems.appendChild(cartItemDiv);
                total += item.price;
            });

            totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = "$0.00";
            cartItems.textContent = "Cart kyu clear kiya!!!";
        }
    }

    // Event listener for removing items from the cart
    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const itemIndex = parseInt(e.target.getAttribute("data-index"));
            removeFromCart(itemIndex);
        }
    });

    // Remove product from the cart array and update localStorage
    function removeFromCart(index) {
        cart.splice(index, 1); // Remove the item at the specified index
        saveCart();
        renderCart();
    }

    // Save the cart to localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart)); // Convert the cart array to a string
    }

    // Load the cart from localStorage and render it on page load
    function loadCart() {
        renderCart(); // Render the cart on page load based on localStorage
    }

    // Event listener for Checkout button
    checkoutBtn.addEventListener("click", () => {
        cart.length = 0;
        saveCart(); // Clear cart from localStorage as well
        alert("Checkout Successful");
        renderCart();
    });

    // Load cart on page load
    loadCart();
});
