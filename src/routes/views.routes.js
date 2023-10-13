import { Router } from "express";
import { productManagerService } from "../dao/index.js";

const router = Router();

// Productos en home
router.get("/", async (req, res) => {
  try {
    const productsNoFilter = await productManagerService.getProductsNoFilter();
    res.render("home", { productsNoFilter, title: "Juicy Boy" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Productos en real time products
router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts", { title: "Juicy Boy" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as viewsRouter };
