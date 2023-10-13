// Condicional de clases según la categoría del producto (para estilos)
const categoryInfo = document.querySelectorAll("[data-category]");

categoryInfo.forEach((cat) => {
  const category = cat.getAttribute("data-category");

  if (category === "blanca") {
    cat.classList.add("blanca-category-card");
  } else if (category === "negra") {
    cat.classList.add("negra-category-card");
  }
});
