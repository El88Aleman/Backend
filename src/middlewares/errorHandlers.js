import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EError.DATABASE_ERROR:
      res.json({ status: "error", error: error.cause });
      break;

    case EError.INVALID_PARAM_ERROR:
      res.json({ status: "error", error: error.cause });
      break;

    case EError.INVALID_BODY_ERROR:
      res.json({ status: "error", error: error.cause });
      break;

    case EError.AUTH_ERROR:
      const viewRender = "";
      res.render(viewRender, { status: "error", error: error.cause });
      break;

    case EError.AUTH_JSON_ERROR:
      res.json({ status: "error", error: error.cause });
      break;

    default:
      break;
  }
};
