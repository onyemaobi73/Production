import express, { Router } from "express";
import {
  createAccount,
  deleteOneUser,
  readOneUser,
  readUser,
  signInAccount,
  updateUser,
} from "../controller/authController";

const router = Router();

router.route("/all-users").get(readUser);
router.route("/register").post(createAccount);
router.route("/sign-in").post(signInAccount);

router.route("/:id/user-info").get(readOneUser);
router.route("/:id/update-user-info").patch(updateUser);
router.route("/:id/delete-user").delete(deleteOneUser);

export default router;
