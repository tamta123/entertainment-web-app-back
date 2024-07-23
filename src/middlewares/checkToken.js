import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Token missing in authorization header");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if token is close to expiration (e.g., within 5 minutes)
    const now = Date.now() / 1000; // Current time in seconds
    const timeLeft = decoded.exp - now;

    if (timeLeft < 300) {
      // Less than 5 minutes
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.setHeader("x-new-token", newToken);
      console.log("New token issued:", newToken);
    }

    req.user = decoded;
    next();
  });
};
