const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let cart = [];

cartButton.addEventListener("click", () => {
  cartModal.removeAttribute("hidden");
});

closeCart.addEventListener("click", () => {
  cartModal.setAttribute("hidden", true);
});

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
      cart.push({ id, name, price, quantity: 1 });
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

    const text = document.createElement("span");
    text.textContent = `${item.name} = ${item.price * item.quantity} ₽`;

    const controls = document.createElement("div");

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "–";
    minusBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter((cartItem) => cartItem.id !== item.id);
      }
      updateCart();
    });

    const qty = document.createElement("span");
    qty.textContent = item.quantity;
    qty.style.margin = "0 8px";

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => {
      item.quantity += 1;
      updateCart();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Удалить";
    removeBtn.addEventListener("click", () => {
      cart = cart.filter((cartItem) => cartItem.id !== item.id);
      updateCart();
    });

    controls.appendChild(minusBtn);
    controls.appendChild(qty);
    controls.appendChild(plusBtn);
    controls.appendChild(removeBtn);

    li.appendChild(text);
    li.appendChild(controls);

    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginBottom = "10px";

    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = total;
  cartCount.textContent = count;
}
