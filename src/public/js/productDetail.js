// Agregar producto al carrito
const addToCartBtn = document.querySelectorAll(".btn-add-to-cart");

addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productId = e.target.getAttribute("data-product-id");
    console.log("Agregar al carrito: ", productId);
  });
});
