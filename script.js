const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = [];

// Открыть корзину
cartButton.addEventListener("click", () => {
  cartModal.removeAttribute("hidden");
});

// Закрыть корзину
closeCart.addEventListener("click", () => {
  cartModal.setAttribute("hidden", true);
});

// Дополнительно: закрытие по клику вне окна
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.setAttribute("hidden", true);
  }
});

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const id = productCard.dataset.id;
        const name = productCard.querySelector("h3").textContent;
        const price = parseInt(productCard.querySelector(".price").textContent);

        const existingProduct = cart.find((item) => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1})
        }

        updateCart();
    });
});

function updateCart() {
    cartItemsList.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const li = document.createElement("li");
        li.textContent = `${item.name} × ${item.quantity} = ${item.price * item.quantity} ₽`;

        cartItemsList.appendChild(li);
    });
    cartTotal.textContent = total;
    cartCount.textContent = count;
}