import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    console.log("No token provided");
    return res.status(401).send("Access denied. No token provided.");
  }
  console.log("Received token:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded token data to the request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const newToken = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // Send new token in response headers
      res.setHeader("Authorization", `Bearer ${newToken}`);
      req.user = jwt.verify(newToken, process.env.JWT_SECRET);
      next();
    } else {
      return res.status(401).send("Invalid token.");
    }
  }
};
