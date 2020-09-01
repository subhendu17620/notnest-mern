const router = require("express").Router();
import userCtrl from "../controllers/userCtrl";
// import auth from "../middleware/auth";

//Register User
router.post("/register", userCtrl.registerUser);

//Login User
router.post("/login", userCtrl.loginUser);

//verify Token
router.get("/verify", userCtrl.verifiedToken);

export default router;
