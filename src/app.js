import express from "express";
import { ProductManager } from "./productManager.js";

const productManagerService = new ProductManager("./products.json");
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log("Servidor funcionando");
});

// Inicio
app.get("/", (req, res) => {
  res.send(`¡Te doy la bienvenida al servidor!<br>
    <br><a href="http://localhost:8080/products">http://localhost:8080/products</a> => para ver todos los productos
    <br><a href="http://localhost:8080/products?limit=5">http://localhost:8080/products?limit=5</a> => para ver los primeros 5 productos
    <br><a href="http://localhost:8080/products/2">http://localhost:8080/products/2</a> => para buscar el producto con id "2"
    <br><a href="http://localhost:8080/products/34123123">http://localhost:8080/products/34123123</a> => para buscar un producto inexistente`);
});

// Obtener lista de productos
app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManagerService.getProducts();

    if (limit) {
      const productsLimit = products.slice(0, parseInt(limit));
      res.send(productsLimit);
    } else {
      res.send(products);
    }
  } catch (error) {
    res.send("Ocurrió un error al cargar los productos");
    console.log(error.message);
  }
});

// Obtener un producto por su id
app.get("/products/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManagerService.getProductById(pid);

    if (product) {
      res.send(product);
    } else {
      res.send("El producto no existe :(");
    }
  } catch (error) {
    res.send("Ocurrió un error al cargar el producto");
    console.log(error.message);
  }
});

// Crear productos
const operations = async () => {
  try {
    await productManagerService.addProduct({
      title: "Remera Oversize Abstract",
      description: ["Negra"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689165599/stvmpaxt627xr6qx7qla.jpg",
      code: "REME01",
      stock: 15,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize Full Dominion",
      description: ["Negra"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689166527/zwr9mfqcbmfazgeywwmk.jpg",
      code: "REME02",
      stock: 20,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize Revolution",
      description: ["Negra"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689166163/zf25zvunabspnelqj7bj.jpg",
      code: "REME03",
      stock: 20,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize Stubborn",
      description: ["Negra"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689167013/r3s90ahmhfyssnhgje1b.jpg",
      code: "REME04",
      stock: 10,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize Metal Gun",
      description: ["Negra"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689165973/bt96shzc4hgrdpqvagvw.jpg",
      code: "REME05",
      stock: 20,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize Do Your Own Thing",
      description: ["Negra"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689166902/dwtxezxdxsimd0jxafzl.jpg",
      code: "REME06",
      stock: 18,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize Pounding Heart",
      description: ["Blanca"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689167337/bvnl2bcipgsa4fjyzplc.jpg",
      code: "REME07",
      stock: 15,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize The Rose",
      description: ["Blanca"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1689167338/hr38owfqdmugljsm9vet.jpg",
      code: "REME08",
      stock: 20,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize Armando (S)",
      description: ["Negra"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1693626528/gpdr0dgcyzkfhydzeeht.png",
      code: "REME09",
      stock: 20,
    });

    await productManagerService.addProduct({
      title: "Remera Oversize Angel Shit",
      description: ["Negra"],
      price: 8900,
      thumbnail:
        "https://res.cloudinary.com/dfcnmxndf/image/upload/v1693626528/e9ga1r22ttz97bvgtyoe.png",
      code: "REME10",
      stock: 15,
    });
  } catch (error) {
    console.log(error.message);
  }
};

operations();
