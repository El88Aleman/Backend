import { ProductsService } from "../services/products.service.js";
import { CartsService } from "../services/carts.service.js";
import { GetUserInfoDto } from "../dao/dto/getUserInfo.dto.js";
import { CustomError } from "../services/customErrors/customError.service.js";
import { EError } from "../enums/EError.js";
import {
  getProductsError,
  getProductByIdError,
} from "../services/customErrors/dictionaryErrors/productsErrors.service.js";
import { getCartByIdError } from "../services/customErrors/dictionaryErrors/cartsErrors.service.js";
import {
  failSignupError,
  failLoginError,
  profileError,
} from "../services/customErrors/dictionaryErrors/usersErrors.service.js";

export class ViewsController {
  static renderHome = async (req, res) => {
    try {
      const productsNoFilter = await ProductsService.getProductsNoFilter();

      const userInfoDto = new GetUserInfoDto(req.user);
      res.render("home", { productsNoFilter, userInfoDto, title: "Juicy Boy" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static renderRealTimeProducts = async (req, res) => {
    try {
      res.render("realTimeProducts", { title: "Menú - Juicy Boy" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static renderProducts = async (req, res) => {
    try {
      const { limit = 8, page = 1, sort, category, stock } = req.query;

      const query = {};

      const options = {
        limit,
        page,
        sort,
        lean: true,
      };

      // Filtrar por categoría
      if (category) {
        query.category = category;
      }

      // Filtrar por stock
      if (stock) {
        if (stock === "false" || stock == 0) {
          query.stock = 0;
        } else {
          query.stock = stock;
        }
      }

      // Ordenar por precio
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
        title: "Menú - Juicy Boy",
      };

      const userInfoDto = new GetUserInfoDto(req.user);
      res.render("productsPaginate", { dataProducts, userInfoDto });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static renderProductDetail = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await ProductsService.getProductById(pid);

      product.title = product.title.toUpperCase();

      const userInfoDto = new GetUserInfoDto(req.user);
      res.render("productDetail", {
        product,
        userInfoDto,
        title: `${product.title} - Juicy Boy`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static renderCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await CartsService.getCartById(cid);

      // Precio total
      const totalPrice = cart.products.reduce(
        (acc, prod) => acc + prod.quantity * prod.product.price,
        0
      );

      // Subtotal (cada producto)
      cart.products.forEach((prod) => {
        prod.subtotalPrice = prod.quantity * prod.product.price;
      });

      const userInfoDto = new GetUserInfoDto(req.user);
      res.render("cart", {
        cart,
        totalPrice,
        userInfoDto,
        title: "Carrito - Juicy Boy",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static renderSignup = async (req, res) => {
    try {
      res.render("signup", { title: "Registrarse - Juicy Boy" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static renderLogin = async (req, res) => {
    try {
      res.render("login", { title: "Iniciar sesión - Juicy Boy" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static renderProfile = async (req, res) => {
    try {
      const userInfoDto = new GetUserInfoDto(req.user);
      res.render("profile", { userInfoDto, title: "Perfil - Juicy Boy" });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el perfil" });
    }
  };
}