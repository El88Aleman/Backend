import { ProductsService } from "../services/products.service.js";
import { generateProductMock } from "../helpers/mock.js";
import { CustomError } from "../services/customErrors/customError.service.js";
import { EError } from "../enums/EError.js";
import {
  getProductsError,
  getProductByIdError,
  addProductError,
  updateProductParamError,
  updateProductError,
  deleteProductError,
  mockingProductsError,
} from "../services/customErrors/dictionaryErrors/productsErrors.service.js";

export class ProductsController {
  static getProducts = async (req, res) => {
    try {
      const { limit = 8, page = 1, sort, category, stock } = req.query;

      const query = {};

      const options = {
        limit,
        page,
        sort,
        lean: true,
      };

      // Filtrar por categoría (http://localhost:8080/api/products?category=vegano)
      if (category) {
        query.category = category;
      }

      // Filtrar por stock (http://localhost:8080/api/products?stock=0 || http://localhost:8080/api/products?stock=20)
      if (stock) {
        if (stock === "false" || stock == 0) {
          query.stock = 0;
        } else {
          query.stock = stock;
        }
      }

      // Ordenar por precio (http://localhost:8080/api/products?sort=desc || http://localhost:8080/api/products?sort=asc)
      if (sort) {
        if (sort === "asc") {
          options.sort = { price: 1 };
        } else if (sort === "desc") {
          options.sort = { price: -1 };
        }
      }

      const products = await ProductsService.getProducts(query, options);

      const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

      const dataProducts = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `${baseUrl.replace(
              `page=${products.page}`,
              `page=${products.prevPage}`
            )}`
          : null,
        nextLink: products.hasNextPage
          ? baseUrl.includes("page")
            ? baseUrl.replace(
                `page=${products.page}`,
                `page=${products.nextPage}`
              )
            : baseUrl.concat(`?page=${products.nextPage}`)
          : null,
      };

      res.status(201).json({ data: dataProducts });
    } catch (error) {
      next(error);
    }
  };

  static getProductById = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = await ProductsService.getProductById(pid);

      if (!product) {
        CustomError.createError({
          name: "get product by id error",
          cause: getProductByIdError(pid),
          message: "El parmámetro es inválido",
          errorCode: EError.INVALID_PARAM_ERROR,
        });
      }

      res.status(201).json({ data: product });
    } catch (error) {
      next(error);
    }
  };

  static addProduct = async (req, res, next) => {
    try {
      const productInfo = req.body;
      const thumbnailFile = req.file ? req.file.filename : undefined;

      productInfo.thumbnail = thumbnailFile;

      const addedProduct = await ProductsService.addProduct(productInfo);
      res.json({
        status: "success",
        message: "Producto creado",
        data: addedProduct,
      });
    } catch (error) {
      next(error);
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const updateFields = req.body;
      const thumbnailFile = req.file ? req.file.filename : undefined;

      updateFields.thumbnail = thumbnailFile;

      const updatedProduct = await ProductsService.updateProduct(
        pid,
        updateFields
      );
      res.status(201).json({ data: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const deletedProduct = await ProductsService.deleteProduct(pid);
      res.status(200).json({ data: deletedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static mockingProducts = async (req, res) => {
    try {
      const quantity = parseInt(req.query.quantity) || 100;
      let products = [];

      for (let i = 0; i < quantity; i++) {
        const newProduct = generateProductMock();
        products.push(newProduct);
      }

      res.status(201).json({ data: { payload: products } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
