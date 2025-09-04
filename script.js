const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const checkoutButton = document.getElementById("checkout-button");
const orderModal = document.getElementById("order-modal");
const closeOrder = document.getElementById("close-order");
const orderForm = document.getElementById("order-form");

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

checkoutButton.addEventListener("click", () => {
    orderModal.removeAttribute("hidden");
});

closeOrder.addEventListener("click", () => {
    orderModal.setAttribute("hidden", true);
});

orderModal.addEventListener("click", (event) => {
    if (event.target === orderModal) {
        orderModal.setAttribute("hidden", true);
    }
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  alert("Заказ создан!");

  cart = [];
  updateCart();

  orderModal.setAttribute("hidden", true);

  orderForm.reset();
});

menuToggle.addEventListener("click", () => {
  if (mobileMenu.hasAttribute("hidden")) {
    mobileMenu.removeAttribute("hidden");
  } else {
    mobileMenu.setAttribute("hidden", true);
  }
});

document.addEventListener("click", (event) => {
  if (!mobileMenu.hasAttribute("hidden") &&
      !mobileMenu.contains(event.target) &&
      event.target !== menuToggle) {
    mobileMenu.setAttribute("hidden", true);
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

  localStorage.setItem("cart", JSON.stringify(cart));
}

updateCart();
