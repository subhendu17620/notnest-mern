import Users, { findOne, findById } from "../models/userModel";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

const useCtrl = {
  // register a new user
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existUser = await findOne({ email: email });
      if (existUser)
        return res
          .status(400)
          .json({ message: "Account with this email already exist." });

      const passwordHash = await hash(password, 10);
      const newUser = new Users({
        username: username,
        email: email,
        password: passwordHash,
      });
      await newUser.save();

      // res.json(newUser)
      res.json({ message: "Signup success. " });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  // login user and save token in tokenStorage
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await findOne({ email: email });
      if (!user)
        return res.status(400).json({ message: "User does not exist." });

      const isMatch = await compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect password." });

      // If login is succesfull , create token
      const payload = { id: user._id, name: user.username };
      const token = sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      res.json({ token });
      // res.json({ message: "OK for Login" })
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: "Login a user" });
  },
  // verify token
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default useCtrl;
