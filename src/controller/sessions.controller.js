import { CustomError } from "../services/customErrors/customError.service.js";
import { EError } from "../enums/EError.js";
import {
  failSignupError,
  failLoginError,
  logoutError,
  profileError,
  getUserByIdError,
} from "../services/customErrors/dictionaryErrors/usersErrors.service.js";

export class SessionsController {
  static redirectLogin = async (req, res) => {
    res.render("login", { message: "Usuario registrado :)" });
  };

  static failSignup = async (req, res) => {
    viewRender = "signup";

    CustomError.createError({
      name: "fail signup error",
      cause: failSignupError(req.body),
      message: "Los datos ingresados son inválidos",
      errorCode: EError.AUTH_ERROR,
    });
  };

  static redirectProducts = async (req, res) => {
    res.redirect("/products");
  };

  static failLogin = async (req, res) => {
    viewRender = "login";

    CustomError.createError({
      name: "fail login error",
      cause: failLoginError(req.body),
      message: "Los datos ingresados son inválidos",
      errorCode: EError.AUTH_ERROR,
    });
  };

  static logout = async (req, res) => {
    viewRender = "logout";

    try {
      req.session.destroy((err) => {
        if (err) {
          return CustomError.createError({
            name: "logout error",
            cause: logoutError(),
            message: "Error al cerrar la sesión",
            errorCode: EError.AUTH_ERROR,
          });
        } else {
          return res.redirect("/login");
        }
      });
    } catch (error) {
      CustomError.createError({
        name: "logout error",
        cause: logoutError(),
        message: "Error al cerrar la sesión",
        errorCode: EError.AUTH_ERROR,
      });
    }
  };
}
