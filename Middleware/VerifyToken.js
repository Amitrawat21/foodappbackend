import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.auth;
  if (!token) {
    res.status(401).send({ error: "please autheticaztion using valid token" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ msg: "Wrong or expired token." });
    }
  }
};


export const verifyTokenAdmin = (req, res, next) => {
  const token = req.headers.auth;
  if (!token) {
    res.status(401).send({ error: "please autheticaztion using valid token" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded , "jjjjj")
      if (decoded.isAdmin === false) {
        return res.status(403).json({ msg: "You are not an admin" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ msg: "Wrong or expired token." });
    }
  }
};
