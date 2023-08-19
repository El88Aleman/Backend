class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(productData) {
    // Validar que todos los campos obligatorios estén presentes
    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.thumbnail ||
      !productData.code ||
      !productData.stock
    ) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    // Validar que el campo "code" no se repita
    const codeExists = this.products.some(
      (product) => product.code === productData.code
    );
    if (codeExists) {
      console.log("Error: El código ya existe.");
      return;
    }

    const newProduct = {
      id: this.productIdCounter,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      thumbnail: productData.thumbnail,
      code: productData.code,
      stock: productData.stock,
    };

    this.products.push(newProduct);
    this.productIdCounter++;

    console.log("Producto agregado con éxito.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager();

productManager.addProduct({
  title: "Remera Negra",
  description: "Oversize",
  price: 8900,
  thumbnail:
    "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689166163/zf25zvunabspnelqj7bj.jpg",
  code: "REME01",
  stock: 10,
});

productManager.addProduct({
  title: "Remera Blanca",
  description: "Oversize",
  price: 8900,
  thumbnail:
    "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689167338/hr38owfqdmugljsm9vet.jpg",
  code: "REME02",
  stock: 5,
});

console.log(productManager.getProducts());

const foundProduct = productManager.getProductById(1);
console.log(foundProduct);

const notFoundProduct = productManager.getProductById(3);
