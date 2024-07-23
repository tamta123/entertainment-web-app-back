import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Ensure you have the correct way to access the cookie
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Store the user ID in the request object for use in other routes
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(500).json({ error: "Failed to authenticate token" });
  }
};

export default checkToken;
