const router = require("express").Router();
import auth from "../middleware/auth";
import {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/noteCtrl";

router.route("/").get(auth, getNotes).post(auth, createNote);

router
  .route("/:id")
  .get(auth, getNote)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

export default router;
