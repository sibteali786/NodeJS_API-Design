import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middlewares";
import {
  createProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

// Product

router.get("/product", getProducts);
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct,
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct,
);
router.delete("/product/:id", () => {});

// Update
router.get("/update/:id", getOneUpdate);
router.get("/update", getUpdates);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("asset").optional(),
  handleInputErrors,
  updateUpdate,
);
router.post(
  "/update",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("productId").exists().isString(),
  createUpdate,
);
router.delete("/update/:id", deleteUpdate);

// UpdatePoints
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  () => {},
);
router.post(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  () => {},
);
router.delete("/updatepoint/:id", () => {});

router.use((err, req, res, next) => {
  console.log(err);
  res.json({message: 'in a route handler'})
});

export default router;
