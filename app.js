const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...product,
    };
    products.push(newProduct);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProducts(products);
      return true;
    } else {
      return false;
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    this.saveProducts(updatedProducts);
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), "utf-8");
  }
}

// Crear una instancia de ProductManager, pasando la ruta del archivo
const productManager = new ProductManager("products.json"); // Asegúrate de tener un archivo llamado "products.json"

productManager.addProduct({
  title: "Remera Oversize",
  description: "Negra",
  price: 8900,
  thumbnail:
    "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689166527/zwr9mfqcbmfazgeywwmk.jpg",
  code: "REME01",
  stock: 10,
});

productManager.addProduct({
  title: "Remera Oversize",
  description: "Blanca",
  price: 8900,
  thumbnail:
    "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689167338/hr38owfqdmugljsm9vet.jpg",
  code: "REME02",
  stock: 5,
});

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const productById = productManager.getProductById(1);
console.log("Producto con ID 1:", productById);

const updatedFields = {
  title: "Remera Oversize Actualizada",
  price: 10900,
  stock: 15,
};
const isUpdated = productManager.updateProduct(1, updatedFields);
console.log("Producto actualizado:", isUpdated);

productManager.deleteProduct(2);
console.log("Producto con ID 2 eliminado");

const updatedProducts = productManager.getProducts();
console.log("Productos actualizados:", updatedProducts);
