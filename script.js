const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");


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