import { Router } from "express";
import { uploadProducts } from "../utils.js";
import {
  noSessionMiddleware,
  checkRoleMiddleware,
} from "../middlewares/auth.js";
import { ProductsController } from "../controllers/products.controller.js";

const router = Router();

// Mocking products (GET: http://localhost:8080/api/products/mockingproducts)
router.get("/mockingproducts", ProductsController.mockingProducts);

// Obtener todos los productos (GET: http://localhost:8080/api/products?limit=8&page=1)
router.get("/", noSessionMiddleware, ProductsController.getProducts);

// Obtener un producto por ID (GET: http://localhost:8080/api/products/pid)
router.get("/:pid", noSessionMiddleware, ProductsController.getProductById);

// Agregar un producto (POST: http://localhost:8080/api/products)
router.post(
  "/",
  noSessionMiddleware,
  checkRoleMiddleware(["admin", "premium"]),
  uploadProducts.single("thumbnail"),
  ProductsController.addProduct
);

// Actualizar un producto (PUT: http://localhost:8080/api/products/pid)
router.put(
  "/:pid",
  noSessionMiddleware,
  checkRoleMiddleware(["admin", "premium"]),
  uploadProducts.single("thumbnail"),
  ProductsController.updateProduct
);

// Eliminar un producto (DELETE: http://localhost:8080/api/products/pid)
router.delete(
  "/:pid",
  noSessionMiddleware,
  checkRoleMiddleware(["admin", "premium"]),
  ProductsController.deleteProduct
);

export { router as productsRouter };
