import { ProductsService } from "../services/products.service.js";
import { CartsService } from "../services/carts.service.js";
import { UsersService } from "../services/users.service.js";
import { GetUserInfoDto } from "../dao/dto/getUserInfo.dto.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/customErrors/customError.service.js";
import {
  databaseGetError,
  paramError,
} from "../services/customErrors/errors/generalErrors.service.js";
import { logger } from "../helpers/logger.js";

export class ViewsController {
  static renderRealTimeProducts = async (req, res) => {
    try {
      const productInfo = req.body;
      productInfo.thumbnail = req.file?.filename;

      const userInfoDto = new GetUserInfoDto(req.user);
      const products = await ProductsService.getProductsNoFilter(
        userInfoDto.role,
        userInfoDto._id
      );

      res.render("realTimeProducts", {
        products,
        userInfoDto,
        title: "Mis productos - Juicy Boy",
      });
    } catch (error) {
      logger.error(
        `real time products: Error al renderizar la página: ${error}`
      );
      res.json({ status: "error", error: error });
    }
  };

  static renderProducts = async (req, res, next) => {
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

      // Error customizado
      if (!products) {
        CustomError.createError({
          name: "get products error",
          cause: databaseGetError(),
          message: "Error al obtener los productos: ",
          errorCode: EError.DATABASE_ERROR,
        });
      }

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
      res.render("productsPaginate", {
        dataProducts,
        userInfoDto,
        title: "Menú - Juicy Boy",
      });
    } catch (error) {
      next(error);
    }
  };

  static renderProductDetail = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = await ProductsService.getProductById(pid);

      // Error customizado
      if (!product) {
        CustomError.createError({
          name: "get product by id error",
          cause: paramError(pid),
          message: "Error al obtener el producto: ",
          errorCode: EError.INVALID_PARAM_ERROR,
        });
      }

      product.title = product.title.toUpperCase();

      const userInfoDto = new GetUserInfoDto(req.user);
      res.render("productDetail", {
        product,
        userInfoDto,
        title: `${product.title} - Juicy Boy`,
      });
    } catch (error) {
      next(error);
    }
  };

  static renderCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cart = await CartsService.getCartById(cid);

      // Error customizado
      if (!cart) {
        CustomError.createError({
          name: "get cart by id error",
          cause: paramError(cid),
          message: "Error al obtener el carrito: ",
          errorCode: EError.INVALID_PARAM_ERROR,
        });
      }

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
      next(error);
    }
  };

  static renderSignup = async (req, res) => {
    try {
      res.render("signup", { title: "Registrarse - Juicy Boy" });
    } catch (error) {
      res.json({ status: "error", error: error });
    }
  };

  static renderLogin = async (req, res) => {
    try {
      res.render("login", { title: "Iniciar sesión - Juicy Boy" });
    } catch (error) {
      res.json({ status: "error", error: error });
    }
  };

  static renderForgotPassword = async (req, res) => {
    try {
      res.render("forgotPassword", {
        title: "Restablecer contraseña - Juicy Boy",
      });
    } catch (error) {
      res.json({ status: "error", error: error });
    }
  };

  static renderResetPassword = async (req, res) => {
    try {
      const token = req.query.token;
      res.render("resetPassword", {
        token,
        title: "Nueva contraseña - Juicy Boy",
      });
    } catch (error) {
      res.json({ status: "error", error: error });
    }
  };

  static renderProfile = async (req, res) => {
    try {
      const userInfoDto = new GetUserInfoDto(req.user);
      const userFirstName = req.user.first_name;
      const userLastName = req.user.last_name;

      res.render("profile", {
        userInfoDto,
        userFirstName,
        userLastName,
        title: "Perfil - Juicy Boy",
      });
    } catch (error) {
      res.json({ status: "error", error: "Error al obtener el perfil" });
    }
  };

  static renderUsersInfo = async (req, res) => {
    try {
      const usersData = await UsersService.getUsers();

      const users = usersData.map((user) => {
        const userInfo = new GetUserInfoDto(user);

        return {
          ...userInfo,
          last_connection: user.last_connection,
        };
      });

      const userInfoDto = new GetUserInfoDto(req.user);
      res.render("usersInfo", {
        users,
        userInfoDto,
        title: "Usuarios - Juicy Boy",
      });
    } catch (error) {
      res.json({
        status: "error",
        error: "Error al obtener los datos de los usuarios",
      });
    }
  };

  static loggerTest = (req, res) => {
    logger.fatal("Log fatal test");
    logger.error("Log error test");
    logger.warning("Log warning test");
    logger.info("Log info test");
    logger.http("Log http test");
    logger.debug("Log debug test");

    res.send("Logger test recibido");
  };
}
