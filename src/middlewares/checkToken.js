import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded token data to the request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const newToken = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("jwt", newToken, {
        maxAge: 604800000, // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      });
      req.user = jwt.verify(newToken, process.env.JWT_SECRET);
      next();
    } else {
      return res.status(401).send("Invalid token.");
    }
  }
};
