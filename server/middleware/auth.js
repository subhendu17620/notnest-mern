import { verify } from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ message: "Invalid Authentication" });

    verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({ message: "Authorization not valid. " });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default auth;
